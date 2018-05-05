import { IBillDigest, IListApi, ITasks, ITaskAction } from ".";

export interface IBillDigestApi extends IListApi<IBillDigest> {
    getBillDigestForTask(task: ITasks): Promise<IBillDigest[]>;
    getBillDigetForTaskAction(taskAction: ITaskAction): Promise<IBillDigest[]>;
    setDuplicate(digest: IBillDigest): Promise<void>;
}