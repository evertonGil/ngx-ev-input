import { Directive, ElementRef, Input, HostListener, OnChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MethodEnum } from './core/MethodEnum.enum';
import * as _ from 'underscore';
import { Hotkey } from './core/hotkey.model';
import { NgxHotkeyInputService } from './ngx-hotkey-input.service';
import { _SPECIAL_ALIASES } from './core/mappers';

@Directive({
  selector: '[ngx-hotkeyinput]'
})
export class NgxHotkeyInputDirective implements OnChanges {

  @Input() hotkeys: Hotkey[];

  private _keyPressedList = [];

  constructor(
    private el: ElementRef,
    private formControl: NgControl
  ) {

  }

  ngOnChanges() {

    if (!this.hotkeys) {

      this.hotkeys = [];

    } else if (typeof this.hotkeys === 'string') {

      this.hotkeys = [];
      console.log(`Hotkeys can\'t be a string in formControlName: ${this.formControl.name}`);

    } else if (!Array.isArray(this.hotkeys)) {

      this.hotkeys = [this.hotkeys];

    }
  }

  @HostListener('keydown', ['$event']) onkeydown(event: KeyboardEvent) {
    if (Array.isArray(this.hotkeys) && this.hotkeys.length) {

      this._keyPressedList.push(event.key);
      const hotkeyTriggered = this.hotKeyHaveBeenPressed(this.hotkeys);
      switch (hotkeyTriggered.method) {

        case MethodEnum.function:

          const action = hotkeyTriggered.callback;
          if (typeof action === 'function') {

            this.handleFunction(event, action);
          }
          break;
        case MethodEnum.value:

          const val = hotkeyTriggered.callback;
          this.handleValue(event, val);
          break;
        case MethodEnum.registered:

          const registered = hotkeyTriggered.callback;
          if (typeof registered === 'string') {
            this.handleRegistered(event, registered);
          }
          break;
        default:
          console.log('nada');
          break;
      }
    }
  }

  lastKeyPressed(keys: string[]) {
    const lastKeys = this._keyPressedList.slice(-keys.length);
    return lastKeys;
  }

  private hotKeyHaveBeenPressed(hotkeys: Hotkey[] | Hotkey): Hotkey {

    hotkeys = Array.isArray(hotkeys) ? hotkeys : [hotkeys];
    const hotkeyUnic = new Hotkey();
    const findHotkey = hotkeys.find(keys => {
      if (Array.isArray(keys.keys)) {

        keys.keys = this.translateKeys(keys.keys);

        if (_.isEqual(this.lastKeyPressed(keys.keys), keys.keys)) {
          return true;
        }
      }
    });

    return findHotkey ? findHotkey : hotkeyUnic;
  }

  private translateKeys(keys: string[]) {
    return keys.map(key => {
      return _SPECIAL_ALIASES[key] || key;
    });
  }

  private handleFunction(event: KeyboardEvent, callback: Function): any {

    event.preventDefault();
    callback(Input);
    this.clearKeyPressedList();
  }

  private handleValue(event: KeyboardEvent, value: any): any {

    event.preventDefault();
    this.formControl.control.setValue(value, { eventEmit: false });
    this.clearKeyPressedList();
  }

  private handleRegistered(event: KeyboardEvent, nameAction: string) {

    event.preventDefault();

    if (typeof nameAction === 'string') {

      const methodSelected = NgxHotkeyInputService.find(nameAction);
      if (methodSelected) {

        methodSelected.Method(this.formControl);
      }

      this.clearKeyPressedList();
    }
  }

  clearKeyPressedList() {
    this._keyPressedList = [];
  }
}


