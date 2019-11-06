import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHotkeyInputComponent } from './ngx-hotkey-input.component';

describe('NgxHotkeyInputComponent', () => {
  let component: NgxHotkeyInputComponent;
  let fixture: ComponentFixture<NgxHotkeyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxHotkeyInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxHotkeyInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
