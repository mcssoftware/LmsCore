import { ILmsTaskApi, IElementsAffected, IElementsAffectedApi } from "../../interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { pnputil } from "../../libraries/util";

export class ElementsAffectedApi extends ListBaseApi<IElementsAffected> implements IElementsAffectedApi {

    constructor() {
        super();
        this.listTitle = Constants.Lists.ElementsAffected;
        this.useCaching = false;
    }

    public getWeb(): Web {
        return new Web(pnputil.getLmsUrl());
    }

    public getElementsAffectedForBill(billId: number): Promise<IElementsAffected[]> {
        return this.getListItems("BillLookupId eq " + billId);
    }

    public getDuplicates(elements: IElementsAffected[]): Promise<IElementsAffected[]> {
        return new Promise<IElementsAffected[]>((resolve, reject) => {
            if (elements.length < 1) {
                resolve([]);
            }
            const filter: string[][] = [[]];
            let index: number = 0;
            let filterLength: number = 0;
            elements.forEach((element) => {
                const value: string = "NewElementNumberDbFormat eq '" + element.NewElementNumberDbFormat + "'";
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
                resolve(result);
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