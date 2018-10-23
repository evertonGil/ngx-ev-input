import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MethodsListBuilder } from './method-list-builder';
import * as _ from 'underscore';

@Directive({
  selector: '[ngxevShortcutInput]'
})
export class ShortcutInputDirective {

  @Input() shortcutKeys: any[];
  @Input() method: Function;
  @Input() shortCutvalue: any;
  @Input() methodRegistered: string;

  private _keyPressedList = [];

  constructor(
    private el: ElementRef,
    private formControl: NgControl
  ) {

  }

  @HostListener('keydown', ['$event']) onkeydown(event: KeyboardEvent) {
    event.preventDefault();
    this._keyPressedList.push(event.key);
    // console.log(event.key);
    if (this.shortCutHaveBeenPressed()) {
      if (this.method) {
        this.handleMethod();
      } else if (this.shortCutvalue) {
        this.handleShortCutValue();
      } else if (this.methodRegistered) {
        this.handleMethodRestered();
      }
    }
  }

  @HostListener('keyup', ['$event']) onkeyup(event: KeyboardEvent) {
    console.log('keyUp event');
    console.log(event);
    console.log('key');
    console.log(event.key);
  }

  private shortCutHaveBeenPressed(): boolean {
    if (_.isEqual(this.lastKeyPressed, this.shortcutKeys)) {
      return true;
    }
    return false;
  }

  private handleMethod(): any {
    this.method(Input);
    this.clearKeyPressedList();
  }

  private handleShortCutValue(): any {
    console.log(this.formControl.control);
    this.formControl.control.setValue(this.shortCutvalue, { eventEmit: false });
  }

  private handleMethodRestered() {
    const methodSelected = MethodsListBuilder.find(this.methodRegistered);
    if (methodSelected) {
      methodSelected.Method(this.formControl.control);
    }
    this.clearKeyPressedList();
  }

  get lastKeyPressed() {
    const lastKeys = this._keyPressedList.slice(-this.shortcutKeys.length);
    return lastKeys;
  }

  clearKeyPressedList() {
    this._keyPressedList = [];
  }
}


