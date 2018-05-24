import { IListApi, IListItem, IList, IContentType } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import { TypedHash, PagedItemCollection, Web, ODataBatch, ItemUpdateResult, ItemAddResult } from "sp-pnp-js";
import { McsUtil } from "../../libraries/util";

// tslint:disable
export class MockBaseApi<T> implements IListApi<T>  {
    public listTitle: string;
    public useCaching: boolean;
    public items: T[];

    constructor() {
        this.items = this.getItems();
    }

    public getItems(): T[] {
        return [];
    }

    public getWeb(): Web {
        return pnp.sp.web;
    }

    public getListItems(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<T[]> {
        return new Promise<T[]>((resolve) => {
            setTimeout(() => {
                resolve(this.items);
            }, 1000);
        });
    }

    public getListItemsCount(filter?: string): Promise<number> {
        return new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(this.items.length);
            }, 1000);
        });
    }

    public ensureListItemEntityTypeName(listItemEntityTypeFullName?: string): Promise<string> {
        return listItemEntityTypeFullName ?
            Promise.resolve(listItemEntityTypeFullName) :
            Promise.resolve("EntityFullName");
    }

    public getListItemById(id: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let item: T = null;
            for (let i: number = 0; i < this.items.length; i++) {
                const element: T = this.items[i];
                if ((element as any).Id === id) {
                    item = element;
                    break;
                }
            }
            setTimeout(() => {
                resolve(item);
            }, 1000);
        });
    }

    public addNewItem<T>(properties: TypedHash<any>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                properties.Id = (this.items[this.items.length - 1] as any).Id + 1;
                const item: any = {};
                item.Id = (this.items[this.items.length - 1] as any).Id + 1;
                for (const name in properties) {
                    item[name] = properties[name];
                }
                this.items.push(item);
                resolve(item);
            }, 1000);
        });
    }

    public updateItem(id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let item: T = null;
            for (let i: number = 0; i < this.items.length; i++) {
                const element: T = this.items[i];
                if ((element as any).Id === id) {
                    item = element;
                    break;
                }
            }
            setTimeout(() => {
                if (item == null) {
                    reject("unable to find element");
                }
                else {
                    for (const name in properties) {
                        item[name] = properties[name];
                    }
                    resolve(true);
                }
            }, 1000);
        });
    }

    public deleteItem(id): Promise<void> {
        return new Promise((resolve, reject) => {
            let index: number = -1;
            for (let i: number = 0; i < this.items.length; i++) {
                const element: T = this.items[i];
                if ((element as any).Id === id) {
                    index = i;
                    break;
                }
            }
            setTimeout(() => {
                if (index < 0) {
                    reject("unable to find element");
                }
                else {
                    this.items.splice(index, 1);
                }
            }, 1000);
        });
    }

    public addNewItemInBatch(batch: ODataBatch, properties: TypedHash<any>): Promise<ItemAddResult> {
        return new Promise<ItemAddResult>((resolve, reject) => {            
        });
    }

    public updateItemInBatch(batch: ODataBatch, id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<ItemUpdateResult> {
        return new Promise((resolve, reject) => {
        });
    }

    public getBatch(): ODataBatch {
        return null; // batch does not work in MOCK
    }

    public getSelects(): string[] {
        return ["Id", "Title"];
    }

    public getExpands(): string[] {
        return [];
    }
}