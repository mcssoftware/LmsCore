import { IBillDigest, ITasks, IBillDigestApi, ITaskAction } from "../../interfaces/index";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { ListBaseApi } from "./ListBaseApi";

export class BillDigestApi extends ListBaseApi<IBillDigest> implements IBillDigestApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.BillDigest;
        this.useCaching = false;
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
            let filter: string = "TaskLookupId eq " + task.Id;
            if (McsUtil.isUnsignedInt(task.WorkflowStep.CommitteeID)) {
                filter = "TaskLookupId eq " + task.Id + " and AmendmentLookupId ne null ";
            }
            this.getListItems(filter, null, null, "StatusDate", false).then((result) => {
                resolve(result);
            }, (err) => { reject(err); });
        });
    }

    public getBillDigetForTaskAction(taskAction: ITaskAction): Promise<IBillDigest[]> {
        return new Promise<IBillDigest[]>((resolve, reject) => {
            const filter: string = "TaskActionLookupId eq " + taskAction.Id;
            this.getListItems(filter, null, null, "StatusDate", false).then((result) => {
                resolve(result);
            }, (err) => { resolve([]); });
        });
    }

    public setDuplicate(digest: IBillDigest): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const propertyToUpdate: any = {
                Duplicate: true,
            };
            this.updateItem(digest.Id, digest["odata.type"], propertyToUpdate)
                .then(() => {
                    resolve();
                }, (err) => { reject(err); });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "AmendmentLookupId",
            "BillDigestReportable",
            "BillLookupId",
            "BillStatusReportable",
            "Duplicate",
            "Message",
            "StatusDate",
            "TaskActionLookupId",
            "TaskLookupId",
            "VoteID",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}