import { IListApi, IBills } from "../exports/interfaces";

export interface IBillApi extends IListApi<IBills> {
    getBill(billorLsonumber: string): Promise<IBills>;
    createBill(billProperty: IBills, blob: Blob): Promise<IBills>;
    updateBill(bill: IBills, propertiesToUpdate: IBills, blob: Blob, checkInComments: string, publish: boolean): Promise<IBills>;
    updateBillNoBlob(bill: IBills, propertiesToUpdate: IBills, checkInComments: string, publish: boolean): Promise<IBills>;
    // checkoutBill(bill: IBills): Promise<void>;
    checkInBill(bill: IBills, comment: string, publish: boolean): Promise<IBills>;
    getDocumentVersion(documentVersion: number, publishedVersion: boolean): number;
}