import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { IAmendments, IAmendmentApi } from "../../exports/interfaces";
import { McsUtil } from "../../libraries/util";
import { FileAddResult, Item, ItemUpdateResult } from "sp-pnp-js";

export class AmendmentApi extends ListBaseApi<IAmendments> implements IAmendmentApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Amendments;
        this.useCaching = false;
    }

    public getAmendmentsForBill(billId: number): Promise<IAmendments[]> {
        return new Promise<IAmendments[]>((resolve, reject) => {
            if (McsUtil.isNumeric(billId)) {
                this.getListItems("BillLookupId eq " + billId)
                    .then((result) => {
                        resolve(result);
                    }, (err) => { reject(err); });
            } else {
                reject("Invalid bill number.");
            }
        });
    }

    public updateAmendmentStatus(amendment: IAmendments, status: string): Promise<boolean> {
        const propertyToUpdate: any = {
            AmendmentStatus: status,
        };
        return this.updateItem(amendment.Id, amendment["odata.type"], propertyToUpdate);
    }

    public updateAmendment(fileName: string, propertiesToUpdate: IAmendments, blob: Blob): Promise<IAmendments> {
        return new Promise<IAmendments>((resolve, reject) => {
            this.getWeb().lists.getByTitle(Constants.Lists.Amendments)
                .rootFolder.files.add(fileName, blob, true)
                .then((fileAdded: FileAddResult) => {
                    fileAdded.file.getItem().then((item: Item) => {
                        item.update(propertiesToUpdate).then((value: ItemUpdateResult) => {
                            value.item.select(...this.getSelects()).expand(...this.getExpands()).get().then((amendmentItem: IAmendments) => {
                                resolve(amendmentItem);
                            }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                    }, (err) => { reject(err); });
                }, (err) => {
                    reject(err);
                });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "AmendmentNumber",
            "AmendmentStatus",
            "DrafterId",
            "Requestor",
            "RequestorType",
            "ResurrectRelatedAmendments",
            "Sponsor",
            "SponsorType",
            "CoSponsor",
            "PostedAction",
            "AppliedToEngrossed",
            "IsCorrectedCopy",
            "IsCorrectedToCorrectedCopy",
            "IsDividedAmendment",
            "BillLookupId",
        ]).concat(this.getUserSelectForExpand("Drafter"));
    }

    public getExpands(): string[] {
        return ["File", "Drafter"];
    }

}
