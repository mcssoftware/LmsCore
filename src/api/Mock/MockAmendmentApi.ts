import { IAmendments, IAmendmentApi } from "../../exports/interfaces";
import { MockBaseApi } from "./MockBaseApi";
import { Constants } from "../../configuration/constants";

export class MockAmendmentApi extends MockBaseApi<IAmendments> implements IAmendmentApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Amendments;
        this.useCaching = true;
    }

    public getAmendmentsForBill(billId: number): Promise<IAmendments[]> {
        return null;
    }

    public updateAmendmentStatus(amendment: IAmendments, status: string): Promise<boolean> {
        const propertyToUpdate: any = {
            AmendmentStatus: status,
        };
        return this.updateItem(amendment.Id, amendment["odata.type"], propertyToUpdate);
    }

    public updateAmendment(fileName: string, propertiesToUpdate: IAmendments, blob: Blob): Promise<IAmendments> {
        return new Promise<IAmendments>((resolve, reject) => {
            reject("Not implemented");
        });
    }

}