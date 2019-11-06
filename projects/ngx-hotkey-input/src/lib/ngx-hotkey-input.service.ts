import { Injectable } from '@angular/core';
import { methodDeclaration } from './core/method-declaration';

@Injectable({
  providedIn: 'root'
})
export class NgxHotkeyInputService {

  constructor() { }

  public static readonly list: methodDeclaration[] = [];

    public static setMethods(methods: { [key: string]: Function }) {
        for (let key in methods) {
            if (key) {
                const method = new methodDeclaration(key, methods[key]);
                NgxHotkeyInputService.list.push(method);
            }
        }
    }

    public static find(key: string): methodDeclaration {
        const method = NgxHotkeyInputService.list.find((m, i, arr) => {
            if (m.key === key) {
                return true;
            }
            return false;
        });

        return method;
    }
}
