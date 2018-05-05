import { IBills, IBillApi, IFile } from "../../interfaces";
import { Web, File, ItemUpdateResult, FileAddResult, Item, CheckinType } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";

export class BillApi extends ListBaseApi<IBills> implements IBillApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Bills;
        this.useCaching = false;
    }

    public getBill(billorLsonumber: string): Promise<IBills> {
        return new Promise<IBills>((resolve, reject) => {
            this.getListItems("LSONumber eq '" + billorLsonumber + "' or BillNumber eq '" + billorLsonumber + "'")
                .then((results: IBills[]) => {
                    if (results.length < 1) {
                        reject("Unable to find bill for +" + billorLsonumber);
                    } else {
                        resolve(results[0]);
                    }
                },
                    (err) => {
                        reject(err);
                    });
        });
    }

    public createBill(billProperty: IBills, blob: Blob): Promise<IBills> {
        return new Promise<IBills>((resolve, reject) => {
            this.getWeb().lists.getByTitle(Constants.Lists.Bills)
                .rootFolder.files.add(billProperty.LSONumber + ".docx", blob, false)
                .then((fileAdded: FileAddResult) => {
                    fileAdded.file.getItem().then((item: Item) => {
                        item.update(billProperty).then((value: ItemUpdateResult) => {
                            fileAdded.file.checkin("Bill created.", CheckinType.Minor)
                                .then(() => {
                                    value.item.select(...this.getSelects()).expand(...this.getExpands()).get().then((billItem: IBills) => {
                                        resolve(billItem);
                                    }, (err) => { reject(err); });
                                }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                    }, (err) => { reject(err); });
                }, (err) => {
                    reject(err);
                });
        });
    }

    public updateBill(bill: IBills, propertiesToUpdate: IBills, blob: Blob, checkInComments: string, publish: boolean): Promise<IBills> {
        return new Promise<IBills>((resolve, reject) => {
            this.checkoutBill(bill).then(() => {
                const file: File = this.getWeb().getFileByServerRelativeUrl(bill.File.ServerRelativeUrl);
                file.setContentChunked(blob)
                    .then((fileAdded: FileAddResult) => {
                        this.getListItemById(bill.Id).then((uploadedBill: IBills) => {
                            bill = uploadedBill;
                            if (McsUtil.isDefined(propertiesToUpdate)) {
                                this.updateItem(bill.Id, bill["odata.type"], propertiesToUpdate)
                                    .then((value) => {
                                        this.checkInBill(bill, checkInComments, publish)
                                            .then((newBill: IBills) => {
                                                resolve(newBill);
                                            }, (err) => { reject(err); });
                                    }, (err) => { reject(err); });
                            } else {
                                this.checkInBill(bill, checkInComments, publish)
                                    .then((newBill: IBills) => {
                                        resolve(newBill);
                                    }, (err) => { reject(err); });
                            }
                        });
                    }, (err) => { reject(err); });
            });
        });
    }

    public updateBillNoBlob(bill: IBills, propertiesToUpdate: IBills, checkInComments: string, publish: boolean): Promise<IBills> {
        return new Promise<IBills>((resolve, reject) => {
            if (McsUtil.isDefined(propertiesToUpdate)) {
                this.checkoutBill(bill).then(() => {
                    this.updateItem(bill.Id, bill["odata.type"], propertiesToUpdate)
                        .then(() => {
                            if (McsUtil.isDefined(bill.File)) {
                                if (bill.File.CheckOutType === 2) {
                                    bill.File.CheckOutType = 1;
                                }
                            }
                            this.checkInBill(bill, checkInComments, publish)
                                .then((newBill: IBills) => {
                                    resolve(newBill);
                                }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                });
            } else {
                resolve(bill);
            }
        });
    }

    public checkoutBill(bill: IBills): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (McsUtil.isDefined(bill.File)) {
                if (bill.File.CheckOutType === 2) {
                    this.getWeb().getFileByServerRelativeUrl(bill.File.ServerRelativeUrl).checkout()
                        .then(() => {
                            resolve();
                        });
                } else {
                    resolve();
                }
            } else {
                this.getListItemById(bill.Id).then((newBill: IBills) => {
                    bill = newBill;
                    if (bill.File.CheckOutType === 2) {
                        this.getWeb().getFileByServerRelativeUrl(bill.File.ServerRelativeUrl).checkout()
                            .then(() => {
                                resolve();
                            });
                    } else {
                        resolve();
                    }
                });
            }
        });
    }

    public checkInBill(bill: IBills, comment: string, publish: boolean): Promise<IBills> {
        return new Promise<IBills>((resolve, reject) => {
            if (McsUtil.isDefined(bill)) {
                if (!McsUtil.isString(comment)) {
                    comment = "";
                }
                if (!McsUtil.isDefined(bill.File)) {
                    this.getListItemById(bill.Id).then((newBill: IBills) => {
                        bill = newBill;
                        this._checkInFile(bill.File, comment, publish).then(() => {
                            this.getListItemById(bill.Id).then(() => {
                                resolve(bill);
                            }, (err) => { reject(err); });
                        });
                    });
                } else {
                    this._checkInFile(bill.File, comment, publish).then(() => {
                        this.getListItemById(bill.Id).then(() => {
                            resolve(bill);
                        }, (err) => { reject(err); });
                    });
                }
            } else {
                reject("Bill is not defined.");
            }
        });
    }

    public getDocumentVersion(documentVersion: number, publishedVersion: boolean): number {
        if (McsUtil.isNumeric(documentVersion)) {
            const decimalPart: number = parseFloat((documentVersion % 1).toFixed(2));
            const integerPart: number = Math.floor(documentVersion);
            if (publishedVersion) {
                return parseFloat((integerPart + 1).toString() + ".0");
            } else {
                let precision: number = 0;
                let evaluator: number = 1;
                while (Math.round(decimalPart * evaluator) / evaluator !== decimalPart) {
                    evaluator = evaluator * 10;
                    precision++;
                }
                if (precision === 0) {
                    return parseFloat(`${integerPart}.1`);
                } else {
                    let decimalsValue: number = decimalPart * evaluator;
                    if ((decimalsValue + 1) % 10 === 0) {
                        decimalsValue++;
                    }
                    decimalsValue++;
                    return parseFloat(`${integerPart}.${decimalsValue}`);
                }
            }
        } else {
            return .1;
        }
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "BillDisclosed",
            "BillEffectiveDate",
            "BillNumber",
            "BillStatus",
            "BillTitle",
            "BillType",
            "BillYear",
            "CatchTitle",
            "ChapterNumber",
            "ChapterSignedOn",
            "ContactPerson",
            "CoSponsor",
            "DateReceived",
            "DocumentStatus",
            "DocumentVersion",
            "DrafterId",
            "EnrolledNumber",
            "FiscalAnalystUserId",
            "HasFiscalImpact",
            "HouseAmendments",
            "HouseofOrigin",
            "LegislationType",
            "LSONumber",
            "ReleaseBill",
            "Requestor",
            "RevenueRaising",
            "RevenueRaisingDate",
            "SenateAmendments",
            "Sponsor",
            "SponsorshipClause",
            "SponsorTitle",
            "SubstituteNumber",
            "File",
        ]).concat(this.getUserSelectForExpand("Drafter"))
            .concat(this.getUserSelectForExpand("FiscalAnalystUser"))
            .concat(this.getUserSelectForExpand("CheckoutUser"));
    }

    public getExpands(): string[] {
        return ["File", "Drafter", "FiscalAnalystUser", "CheckoutUser"];
    }

    private _checkInFile(file: IFile, comment: string, publish: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (file.CheckOutType !== 2) {
                this.getWeb().getFileByServerRelativeUrl(file.ServerRelativeUrl).checkin(comment, publish ? CheckinType.Major : CheckinType.Minor)
                    .then(() => {
                        resolve(true);
                    }, (err) => { reject(err); });
            } else {
                // file is in checked-in status
                resolve(true);
            }
        });
    }

}
