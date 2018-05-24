import { Web, TypedHash, ODataBatch, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import { IContentType, IList } from "../exports/interfaces";
// import pnp from "sp-pnp-js";

// tslint:disable:no-shadowed-variable
export interface IListApi<T> {
    listTitle: string;
    useCaching: boolean;
    getWeb(): Web;
    getBatch(): ODataBatch;
    getListItems(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<T[]>;
    getListItemsCount(filter?: string): Promise<number>;
    getListItemById(id: number): Promise<T>;
    getSelects(): string[];
    getExpands(): string[];
    addNewItem(properties: TypedHash<any>): Promise<T>;
    updateItem(id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<any>;
    deleteItem(id: number): Promise<void>;
    ensureListItemEntityTypeName(listItemEntityTypeFullName: string): Promise<string>;
    updateItemInBatch(batch: ODataBatch, id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<ItemUpdateResult>;
    addNewItemInBatch(batch: ODataBatch, properties: TypedHash<any>): Promise<ItemAddResult>;
}