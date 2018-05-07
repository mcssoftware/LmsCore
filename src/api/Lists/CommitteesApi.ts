import { ICommittee } from "../../interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { settings } from "../../configuration/configuration";
import { LmsConfigurationApi } from "./LmsConfigurationApi";
import { EventEmitter } from "../../libraries/EventEmitter";

export class CommitteesApi extends ListBaseApi<ICommittee> {
    private _committeeHashed: pnp.TypedHash<ICommittee[]> = {};
    private _committeeStatus: pnp.TypedHash<string> = {};
    private readonly _eventEmitter: EventEmitter = EventEmitter.getInstance();

    constructor() {
        super();
        this.listTitle = Constants.Lists.AllCommittee;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(settings.getSiteUrl());
    }

    public getCommittees(year?: number): Promise<ICommittee[]> {
        return new Promise<ICommittee[]>((resolve, reject) => {
            LmsConfigurationApi.getInstance().getYear(year)
                .then((result) => {
                    this._getListItems(result.toString())
                        .then((data: ICommittee[]) => {
                            resolve(data);
                        }, (err) => { reject(err); });
                });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "BillYear",
            "CanCoSponsor",
            "CanCreateAmendments",
            "CanSponsor",
            "CommitteeDisplayTitle",
            "CommitteeShortName",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

    private _getListItems(year: string): Promise<ICommittee[]> {
        return new Promise<ICommittee[]>((resolve, reject) => {
            if (this._committeeStatus[year] === "Loaded") {
                resolve(this._committeeHashed[year]);
            }
            else {
                this._eventEmitter.on("Committee" + year, (data: any) => {
                    resolve(this._committeeHashed[year]);
                });
                if (!McsUtil.isDefined(this._committeeStatus[year])) {
                    this._committeeStatus[year] = "Loading";
                    this.getListItems("BillYear eq " + year)
                        .then((data) => {
                            this._committeeHashed[year] = data;
                            this._committeeStatus[year] = "Loaded";
                            this._eventEmitter.emit("Committee" + year, { Items: data });
                        }, (err) => {
                            reject(err);
                        });
                }
            }
        });
    }
}

export let committeeApiInstance: CommitteesApi = new CommitteesApi();