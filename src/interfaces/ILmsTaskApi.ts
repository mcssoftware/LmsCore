import { IListApi, ITasks } from "./";

export interface ILmsTaskApi extends IListApi<ITasks> {
    getTaskForBill(billId: number, skip?: number, top?: number): Promise<ITasks[]>;
    getChildrenOfParent(parentTaskId: number): Promise<ITasks[]>;
}