import { IListApi, IList, IContentType } from "../../interfaces";
import * as pnp from "sp-pnp-js";
import { TypedHash, PagedItemCollection, Web, ODataBatch, ItemAddResult, ItemUpdateResult } from "sp-pnp-js";
import { McsUtil } from "../../libraries/util";
import { settings } from "../../configuration/configuration";

// tslint:disable:prefer-const
export class ListBaseApi<T> implements IListApi<T>  {
    public listTitle: string;
    public useCaching: boolean;

    public getWeb(): Web {
        return new Web(settings.getLmsUrl());
    }

    public getListItems(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<T[]> {
        if (this.useCaching) {
            return this._getRestDataUsingCaching(filter, select, expand, orderBy, ascending, skip, top);
        } else {
            return this._getRestData(filter, select, expand, orderBy, ascending, skip, top);
        }
    }

    public getListItemsCount(filter?: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let result: T[] = [];
            if (!McsUtil.isString(filter)) {
                filter = "";
            }
            let select: string[] = ["Id"];
            this.getWeb().lists.getByTitle(this.listTitle).items
                .filter(filter)
                .select(...select)
                .getPaged().then((value) => {
                    result = value.results as T[];
                    if (value.hasNext) {
                        this._getNextPages(value, []).then((pagedResult) => {
                            result = result.concat(pagedResult);
                            resolve(result.length);
                        });
                    } else {
                        resolve(result.length);
                    }
                }, (error) => {
                    reject(error);
                });
        });
    }

    public getListItemById(id: number): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let select: string[] = this.getSelects();
            // tslint:disable-next-line:prefer-const
            let expand: string[] = this.getExpands();
            if (McsUtil.isArray(select)) {
                if (!McsUtil.isArray(select)) {
                    select = [];
                }
                this.getWeb().lists.getByTitle(this.listTitle).items.getById(id)
                    .select(...select)
                    .expand(...expand)
                    .get()
                    .then((value) => {
                        resolve(value);
                    }, (error) => {
                        reject(error);
                    });
            } else {
                this.getWeb().lists.getByTitle(this.listTitle).items.getById(id)
                    .get()
                    .then((value) => {
                        resolve(value);
                    }, (error) => {
                        reject(error);
                    });
            }
        });
    }

    public addNewItem(properties: TypedHash<any>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.getWeb().lists.getByTitle(this.listTitle).items.add(properties).then((result) => {
                resolve(result.data);
            }, (error) => {
                reject(error);
            });
        });
    }

    public updateItem(id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getWeb().lists.getByTitle(this.listTitle).items.getById(id).update(properties, "*", listItemEntityTypeFullName).then((result) => {
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }

    public deleteItem(id: number): Promise<void> {
        return this.getWeb().lists.getByTitle(this.listTitle).items.getById(id).delete();
    }

    public addNewItemInBatch(batch: ODataBatch, properties: TypedHash<any>): Promise<ItemAddResult> {
        return this.getWeb().lists.getByTitle(this.listTitle).items.inBatch(batch).add(properties);
    }

    public updateItemInBatch(batch: ODataBatch, id: number, listItemEntityTypeFullName: string, properties: TypedHash<any>): Promise<ItemUpdateResult> {
        return this.getWeb().lists.getByTitle(this.listTitle).items.getById(id).inBatch(batch).update(properties);
    }

    public getBatch(): ODataBatch {
        return this.getWeb().createBatch();
    }

    public getSelects(): string[] {
        return ["Id", "Title"];
    }

    public getExpands(): string[] {
        return [];
    }

    public getUserSelectForExpand(field: string): string[] {
        return [field + "/Id", field + "/Title", field + "/EMail"];
    }

    private _getRestData(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            let result: T[] = [];
            if (!McsUtil.isString(filter)) {
                filter = "";
            }
            if (!McsUtil.isString(orderBy)) {
                orderBy = "Id";
            }
            ascending = ascending || true;
            let listSelect: string[] = select;
            if (!McsUtil.isArray(select)) {
                listSelect = this.getSelects();
            }
            let listExpand: string[] = expand;
            if (!McsUtil.isArray(expand)) {
                listExpand = this.getExpands();
            }
            top = top || 100;
            skip = skip || 0;
            // tslint:disable-next-line:typedef
            let listItems: any = this.getWeb().lists.getByTitle(this.listTitle).items
                .filter(filter)
                .select(...listSelect)
                .expand(...listExpand)
                .orderBy(orderBy, ascending);
            if (McsUtil.isArray(listSelect)) {
                if (listSelect.indexOf("Id") < 0) {
                    listSelect.push("Id");
                }
                if (!McsUtil.isArray(listExpand)) {
                    listExpand = [];
                }
                listItems.select(...listSelect)
                    .expand(...listExpand)
                    .skip(skip)
                    .top(top).getPaged().then((value) => {
                        result = value.results as T[];
                        if (value.hasNext) {
                            this._getNextPages(value, []).then((pagedResult) => {
                                result = result.concat(pagedResult);
                                resolve(result);
                            });
                        } else {
                            resolve(result);
                        }
                    }, (error) => {
                        reject(error);
                    });
            } else {
                listItems.select(...listSelect)
                    .expand(...listExpand)
                    .skip(skip)
                    .top(top).getPaged().then((value) => {
                        result = value.results as T[];
                        if (value.hasNext) {
                            this._getNextPages(value, []).then((pagedResult) => {
                                result = result.concat(pagedResult);
                                resolve(result);
                            });
                        } else {
                            resolve(result);
                        }
                    }, (error) => {
                        reject(error);
                    });
            }
        });
    }

    // tslint:disable-next-line:max-line-length
    private _getRestDataUsingCaching(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => {
            let result: T[] = [];
            if (!McsUtil.isString(filter)) {
                filter = "";
            }
            if (!McsUtil.isString(orderBy)) {
                orderBy = "Id";
            }
            ascending = ascending || true;
            let listSelect: string[] = select;
            if (!McsUtil.isArray(select)) {
                listSelect = this.getSelects();
            }
            let listExpand: string[] = expand;
            if (!McsUtil.isArray(expand)) {
                listExpand = this.getExpands();
            }
            top = top || 100;
            skip = skip || 0;
            // tslint:disable-next-line:typedef
            let listItems: any = this.getWeb().lists.getByTitle(this.listTitle).items
                .usingCaching()
                .filter(filter)
                .select(...listSelect)
                .expand(...listExpand)
                .orderBy(orderBy, ascending);
            if (McsUtil.isArray(listSelect)) {
                if (listSelect.indexOf("Id") < 0) {
                    listSelect.push("Id");
                }
                if (!McsUtil.isArray(listExpand)) {
                    listExpand = [];
                }
                listItems.select(...listSelect)
                    .expand(...listExpand)
                    .skip(skip)
                    .top(top).getPaged().then((value) => {
                        result = value.results as T[];
                        if (value.hasNext) {
                            this._getNextPages(value, []).then((pagedResult) => {
                                result = result.concat(pagedResult);
                                resolve(result);
                            });
                        } else {
                            resolve(result);
                        }
                    }, (error) => {
                        reject(error);
                    });
            } else {
                listItems.select(...listSelect)
                    .expand(...listExpand)
                    .skip(skip)
                    .top(top).getPaged().then((value) => {
                        result = value.results as T[];
                        if (value.hasNext) {
                            this._getNextPages(value, []).then((pagedResult) => {
                                result = result.concat(pagedResult);
                                resolve(result);
                            });
                        } else {
                            resolve(result);
                        }
                    }, (error) => {
                        reject(error);
                    });
            }
        });
    }

    private _getNextPages(paged: PagedItemCollection<any>, items: T[]): Promise<T[]> {
        if (paged.hasNext) {
            return paged.getNext().then((value) => {
                return this._getNextPages(value, items.concat(value.results));
            });
        }
        return Promise.resolve(items);
        // return new Promise<T[]>((resolve, reject) => {
        //     paged.getNext().then((value) => {
        //         let result: T[] = value.results;
        //         if (value.hasNext) {
        //             return
        //             this._getNextPages(value).then((nextPage) => {
        //                 result = result.concat(nextPage);
        //                 resolve(result);
        //             });
        //         } else {
        //             resolve(result);
        //         }
        //     }, (error) => {
        //         resolve([]);
        //     });
        // });
    }
}
