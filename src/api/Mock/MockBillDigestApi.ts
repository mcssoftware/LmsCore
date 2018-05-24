import { MockBaseApi } from "./MockBaseApi";
import { IBillDigest, ITasks, IBillDigestApi, ITaskAction, IBills } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";

export class MockBillDigestApi extends MockBaseApi<IBillDigest> implements IBillDigestApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.BillDigest;
        this.useCaching = false;
    }

    public setDuplicate(digest: IBillDigest): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const propertyToUpdate: any = {
                Duplicate: true,
            };
            digest.Duplicate = true;
        });
    }

    public getBillDigestForBill(bill: IBills): Promise<IBillDigest[]> {
        return new Promise<IBillDigest[]>((resolve, reject) => {
            resolve([]);
        });
    }

    /**
     * Get bill digest for task.
     * this function uses task.Step to create an filter.
     * @param {ITasks} task
     * @returns {Promise<IBillDigest[]>}
     * @memberof BillDigestApi
     */
    public getBillDigestForTask(task: ITasks): Promise<IBillDigest[]> {
        return new Promise<IBillDigest[]>((resolve, reject) => {
            // TODO
            resolve([]);
        });
    }

    public getBillDigetForTaskAction(taskAction: ITaskAction): Promise<IBillDigest[]> {
        return new Promise<IBillDigest[]>((resolve, reject) => {
            // TODO
            resolve([]);
        });
    }

}