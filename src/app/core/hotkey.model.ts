import { MethodEnum } from "./methodEnum.enum";

export class Hotkey {
    keys: string[] | '';
    callback: [''] | '' | Function;
    method: MethodEnum;
  }