import { ITasks, ILmsTaskApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockLmsTaskApi extends MockBaseApi<ITasks> implements ILmsTaskApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = false;
    }

    public getTaskForBill(billId: number, skip?: number, top?: number): Promise<ITasks[]> {
        return new Promise<ITasks[]>((resolve, reject) => {
            // let filter: string = "BillLookupId eq " + billId;
            this.getListItems().then((result: ITasks[]) => {
                let items: ITasks[] = [];
                result.forEach((element) => {
                    if (element.Id === billId) {
                        items.push(element);
                    }
                });
                resolve(items);
            }, (err) => { reject(err); });
        });
    }

    public getChildrenOfParent(parentTaskId: number): Promise<ITasks[]> {
        return new Promise<ITasks[]>((resolve, reject) => {
            this.getListItems().then((result: ITasks[]) => {
                let items: ITasks[] = [];
                result.forEach((element) => {
                    if (element.ParentLookupId === parentTaskId) {
                        items.push(element);
                    }
                });
                resolve(items);
            }, (err) => { reject(err); });
        });
    }
}