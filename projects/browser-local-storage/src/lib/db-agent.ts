export class DbAgent implements IKeyValueDB{
    get(key: string): string|null {
        return localStorage.getItem(key);
    }
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}

export interface IKeyValueDB {
    get(key: string): string|null;
    set(key: string, value: string): void;
    remove(key: string): void;
}
