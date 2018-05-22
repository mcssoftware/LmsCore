import { IBillDigest, IListApi, ITasks, ITaskAction, IBills } from "../exports/interfaces";

export interface IBillDigestApi extends IListApi<IBillDigest> {
    getBillDigestForBill(bill: IBills): Promise<IBillDigest[]>;
    getBillDigestForTask(task: ITasks): Promise<IBillDigest[]>;
    getBillDigetForTaskAction(taskAction: ITaskAction): Promise<IBillDigest[]>;
    setDuplicate(digest: IBillDigest): Promise<void>;
}