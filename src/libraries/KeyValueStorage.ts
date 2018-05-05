import { Dictionary } from "sp-pnp-js";

export default class KeyValueStorage implements Storage {
    private _store: Dictionary<string>;
    private _length: number;
    constructor() {
        this._store = new Dictionary<string>();
        this._length = 0;
    }

    public get length(): number {
        return this._store.count();
    }

    public set length(i: number) {
        this._length = i;
    }

    public clear(): void {
        this._store.clear();
    }

    public getItem(key: string): string {
        return this._store.get(key);
    }

    public key(index: number): string {
        return this._store.getKeys()[index];
    }

    public removeItem(key: string): void {
        this._store.remove(key);
    }

    public setItem(key: string, data: string): void {
        this._store.add(key, data);
    }

    [key: string]: any;
    [index: number]: string;
}