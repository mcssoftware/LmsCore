import { IListApi, IList, IContentType, IBatchCreationData, IBatchUpdateData, IBatchDeleteData } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import {
    TypedHash, PagedItemCollection, Web, ODataBatch,
    ItemAddResult, ItemUpdateResult, List,
} from "sp-pnp-js";
import { McsUtil } from "../../libraries/util";
import { config } from "../../LmsCore";

// tslint:disable:prefer-const
// tslint:disable:space-before-function-paren
export class ListBaseApi<T> implements IListApi<T>  {
    public listTitle: string;
    public useCaching: boolean;

    public getWeb(): Web {
        return new Web(config.getLmsUrl());
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

    public ensureListItemEntityTypeName(listItemEntityTypeFullName?: string): Promise<string> {
        return listItemEntityTypeFullName ?
            Promise.resolve(listItemEntityTypeFullName) :
            this.getWeb().lists.getByTitle(this.listTitle).getListItemEntityTypeFullName();
    }

    public addNewItemInBatch(data: IBatchCreationData[], itemEntityType?: string): Promise<IBatchCreationData[]> {
        if (McsUtil.isString(itemEntityType)) {
            return this._addNewItemInBatchInternal(this.getWeb().lists.getByTitle(this.listTitle), itemEntityType, data, 0);
        } else {
            return this.ensureListItemEntityTypeName().then((entityType) => {
                return this._addNewItemInBatchInternal(this.getWeb().lists.getByTitle(this.listTitle), entityType, data, 0);
            });
        }
    }

    public updateItemInBatch(data: IBatchUpdateData[]): Promise<IBatchUpdateData[]> {
        return this._updateItemInBatchInternal(this.getWeb().lists.getByTitle(this.listTitle), data, 0);
    }

    public deleteItemInBatch(data: IBatchDeleteData[]): Promise<void> {
        return this._deleteItemInBatchInternal(this.getWeb().lists.getByTitle(this.listTitle), data, 0);
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

    private _getRestData(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, itemCount?: number): Promise<T[]> {
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
            const getAllItems: boolean = typeof itemCount === "undefined" || itemCount === null;
            itemCount = itemCount || 100;
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
                    .top(itemCount).getPaged().then((value) => {
                        result = value.results as T[];
                        if (getAllItems && value.hasNext) {
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
                    .top(itemCount).getPaged().then((value) => {
                        result = value.results as T[];
                        if (getAllItems && value.hasNext) {
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

    private _addNewItemInBatchInternal(list: List, itemEntityType: string, data: IBatchCreationData[], index: number = 0): Promise<IBatchCreationData[]> {
        const batchSize: number = 50;
        return new Promise((resolve, reject) => {
            if (data.length > index) {
                const batch: ODataBatch = this.getWeb().createBatch();
                for (let len: number = index + batchSize; index < len && index < data.length; index += 1) {
                    const dataItems: IBatchCreationData = data[index];
                    // tslint:disable-next-line:typedef
                    let success = (function (res: ItemAddResult) {
                        this.result = res.data;
                    }).bind(dataItems);
                    // tslint:disable-next-line:typedef
                    let error = (function (err) {
                        this.error = err;
                    }).bind(dataItems);
                    list.items.inBatch(batch).add(dataItems.item, itemEntityType).then(success).catch(error);
                }
                batch.execute().then(() => {
                    this._addNewItemInBatchInternal(list, itemEntityType, data, index);
                }).catch(() => {
                    this._addNewItemInBatchInternal(list, itemEntityType, data, index);
                });
            } else {
                resolve(data);
            }
        });
    }

    private _updateItemInBatchInternal(list: List, data: IBatchUpdateData[], index: number = 0): Promise<IBatchUpdateData[]> {
        const batchSize: number = 50;
        return new Promise((resolve, reject) => {
            if (data.length > index) {
                const batch: ODataBatch = this.getWeb().createBatch();
                for (let len: number = index + batchSize; index < len && index < data.length; index += 1) {
                    const dataItems: IBatchUpdateData = data[index];
                    // tslint:disable-next-line:typedef
                    let success = (function (res: ItemUpdateResult) {
                        this.result = res.data;
                    }).bind(dataItems);
                    // tslint:disable-next-line:typedef
                    let error = (function (err) {
                        this.error = err;
                    }).bind(dataItems);
                    list.items.getById(dataItems.Id).inBatch(batch).update(dataItems.item, "*", dataItems.itemEntityType).then(success).catch(error);
                }
                batch.execute().then(() => {
                    this._updateItemInBatchInternal(list, data, index);
                }).catch(() => {
                    this._updateItemInBatchInternal(list, data, index);
                });
            } else {
                resolve(data);
            }
        });
    }

    private _deleteItemInBatchInternal(list: List, data: IBatchDeleteData[], index: number = 0): Promise<void> {
        const batchSize: number = 50;
        return new Promise((resolve, reject) => {
            if (data.length > index) {
                const batch: ODataBatch = this.getWeb().createBatch();
                for (let len: number = index + batchSize; index < len && index < data.length; index += 1) {
                    const dataItems: IBatchDeleteData = data[index];
                    // tslint:disable-next-line:typedef
                    let success = (function () {
                        this.result = true;
                    }).bind(dataItems);
                    // tslint:disable-next-line:typedef
                    let error = (function (err) {
                        this.error = err;
                    }).bind(dataItems);
                    list.items.getById(dataItems.Id).inBatch(batch).delete("*").then(success).catch(error);
                }
                batch.execute().then(() => {
                    this._deleteItemInBatchInternal(list, data, index);
                }).catch(() => {
                    this._deleteItemInBatchInternal(list, data, index);
                });
            } else {
                resolve();
            }
        });
    }
}
