import { IListApi, IAmendments } from "../exports/interfaces";

export interface IAmendmentApi extends IListApi<IAmendments> {
    getAmendmentsForBill(billId: number): Promise<IAmendments[]>;
    updateAmendmentStatus(amendment: IAmendments, status: string, action: string): Promise<boolean>;
    updateAmendment(fileName: string, propertiesToUpdate: IAmendments, blob: Blob): Promise<IAmendments>;
}