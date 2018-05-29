import { ILmsTaskApi, IElementsAffected, IElementsAffectedApi } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { config } from "../../LmsCore";

export class ElementsAffectedApi extends ListBaseApi<IElementsAffected> implements IElementsAffectedApi {

    constructor() {
        super();
        this.listTitle = Constants.Lists.ElementsAffected;
        this.useCaching = false;
    }

    public getWeb(): Web {
        return new Web(config.getLmsUrl());
    }

    public getElementsAffectedForBill(billId: number): Promise<IElementsAffected[]> {
        return this.getListItems("BillLookupId eq " + billId, this.getSelects(), this.getExpands(), "NewElementNumberDbFormat");
    }

    public getDuplicates(elements: IElementsAffected[]): Promise<IElementsAffected[]> {
        return new Promise<IElementsAffected[]>((resolve, reject) => {
            if (elements.length < 1) {
                resolve([]);
            }
            const filter: string[][] = [[]];
            let index: number = 0;
            let filterLength: number = 0;
            const uniqueValues: string[] = elements.map((e) => e.NewElementNumberDbFormat).sort().filter((value, idx, self) => {
                return self.indexOf(value) === idx;
            });
            uniqueValues.forEach((element) => {
                const value: string = "NewElementNumberDbFormat eq '" + element + "'";
                filter[index].push(value);
                filterLength += value.length;
                if (filterLength > 500) {
                    index++;
                    filterLength = 0;
                }
            });
            const promises: Array<Promise<IElementsAffected[]>> = filter.map((value) => {
                return this.getListItems(value.join(" or "));
            });
            Promise.all(promises).then((values) => {
                let result: IElementsAffected[] = [];
                values.forEach((value) => {
                    result = result.concat(value);
                });
                resolve(result.sort((a, b) => {
                    if (a.NewElementNumberDbFormat < b.NewElementNumberDbFormat) {
                        return -1;
                    }
                    if (a.NewElementNumberDbFormat > b.NewElementNumberDbFormat) {
                        return 1;
                    }
                    return 0;
                }));
            }, (err) => { reject(err); });
        });
        // return this.getListItems("BillLookupId eq " + billId);
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "BillLookupId",
            "DuplicateElement",
            "ElementApplied",
            "ElementType",
            "Intro",
            "NewElementNumber",
            "NewElementNumberDbFormat",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}