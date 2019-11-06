import { NgModule } from '@angular/core';
import { NgxHotkeyInputDirective } from './ngx-hotkey-input.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NgxHotkeyInputDirective],
  imports: [
      FormsModule,
      ReactiveFormsModule
  ],
  exports: [NgxHotkeyInputDirective]
})
export class NgxHotkeyInputModule { }
