import { TestBed } from '@angular/core/testing';

import { NgxHotkeyInputService } from './ngx-hotkey-input.service';

describe('NgxHotkeyInputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxHotkeyInputService = TestBed.get(NgxHotkeyInputService);
    expect(service).toBeTruthy();
  });
});
