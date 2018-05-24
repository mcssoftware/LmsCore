import { ISessionLaws } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { ListBaseApi } from "./ListBaseApi";
import { Web, File, ItemUpdateResult, FileAddResult, Item, CheckinType } from "sp-pnp-js";
import { McsUtil } from "../../libraries/util";
import { ISessionLawsApi } from "../../interfaces/ISessionLawApi";

export class SessionLawsApi extends ListBaseApi<ISessionLaws> implements ISessionLawsApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.SessionLaws;
        this.useCaching = false;
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "Id",
            "Title",
            "BillLookupId",
            "BillNumber",
            "LSONumber",
        ]);
    }

    public createSessionLaw(sessionLawProperty: ISessionLaws, blob: Blob): Promise<ISessionLaws> {
        return new Promise<ISessionLaws>((resolve, reject) => {
            this.getWeb().lists.getByTitle(Constants.Lists.SessionLaws)
                .rootFolder.files.add(sessionLawProperty.Title + ".docx", blob, false)
                .then((fileAdded: FileAddResult) => {
                    fileAdded.file.getItem().then((item: Item) => {
                        item.update(sessionLawProperty).then((value: ItemUpdateResult) => {
                            fileAdded.file.checkin("session law created.", CheckinType.Minor)
                                .then(() => {
                                    value.item.select(...this.getSelects()).expand(...this.getExpands()).get().then((sessionLawItem: ISessionLaws) => {
                                        resolve(sessionLawItem);
                                    }, (err) => { reject(err); });
                                }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                    }, (err) => { reject(err); });
                }, (err) => {
                    reject(err);
                });
        });
    }

    public updateSessionLaw(sessionLaw: ISessionLaws, propertiesToUpdate: ISessionLaws, blob: Blob, checkInComments?: string): Promise<ISessionLaws> {
        return new Promise<ISessionLaws>((resolve, reject) => {
            if (sessionLaw.File.CheckOutType === 2) {
                const file: File = this.getWeb().getFileByServerRelativeUrl(sessionLaw.File.ServerRelativeUrl);
                file.checkout().then(() => {
                    file.setContentChunked(blob)
                        .then((fileAdded: FileAddResult) => {
                            fileAdded.file.getItem().then((item: Item) => {
                                if (McsUtil.isDefined(propertiesToUpdate)) {
                                    item.update(propertiesToUpdate).then((value) => {
                                        if (!McsUtil.isString(checkInComments)) {
                                            checkInComments = "";
                                        }
                                        fileAdded.file.checkin(checkInComments, CheckinType.Minor)
                                            .then(() => {
                                                value.item.select(...this.getSelects()).expand(...this.getExpands()).get().then((sessionLawItem: ISessionLaws) => {
                                                    resolve(sessionLawItem);
                                                }, (err) => { reject(err); });
                                            }, (err) => { reject(err); });
                                    }, (err) => { reject(err); });
                                } else {
                                    item.select(...this.getSelects()).expand(...this.getExpands()).get().then((sessionLawItem: ISessionLaws) => {
                                        resolve(sessionLawItem);
                                    }, (err) => { reject(err); });
                                }
                            }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                }, (err) => { reject(err); });
            } else {
                reject("SessionLaw is checked out.");
            }
        });
    }

    public getExpands(): string[] {
        return [];
    }
}