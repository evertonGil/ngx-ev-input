import { methodDeclaration } from "./method-declaration";

export class MethodsListBuilder {
    public static readonly list: methodDeclaration[] = [];

    public static setMethods(methods: { [key: string]: Function }) {
        for (let key in methods) {
            if (key) {
                const method = new methodDeclaration(key, methods[key]);
                MethodsListBuilder.list.push(method);
            }
        }
    }

    public static find(key: string): methodDeclaration {
        const method = MethodsListBuilder.list.find((m, i, arr) => {
            if (m.key === key) {
                return true;
            }
            return false;
        });

        return method;
    }
}