import { ILegislator } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { LmsConfigurationApi } from "./LmsConfigurationApi";
import { EventEmitter } from "../../libraries/EventEmitter";
import { settings } from "../../configuration/configuration";

export class LegislatorsApi extends ListBaseApi<ILegislator> {
    private _legislatorHashed: pnp.TypedHash<ILegislator[]> = {};
    private _legislatorStatus: pnp.TypedHash<string> = {};
    private readonly _eventEmitter: EventEmitter = EventEmitter.getInstance();

    constructor() {
        super();
        this.listTitle = Constants.Lists.AllLegislators;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(settings.getSiteUrl());
    }

    public getLegislators(year?: number): Promise<ILegislator[]> {
        return new Promise<ILegislator[]>((resolve, reject) => {
            LmsConfigurationApi.getInstance().getYear(year)
                .then((result: number) => {
                    this._getListItems(result.toString())
                        .then((data) => {
                            resolve(data);
                        }, (err) => {
                            reject(err);
                        });
                }, (err) => {
                    reject(err);
                });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "BillYear",
            "CanSponsor",
            "Chamber",
            "County",
            "EMail",
            "LegislatorID",
            "LegislatureDisplayName",
            "LegislatureLoginId",
            "LegislatureName",
            "NotificationPreference",
            "Party",
            "SponsorAddressLine1",
            "SponsorAddressLine2",
            "WorkCity",
            "WorkState",
            "WorkZip",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

    private _getListItems(year: string): Promise<ILegislator[]> {
        return new Promise<ILegislator[]>((resolve, reject) => {
            if (this._legislatorStatus[year] === "Loaded") {
                resolve(this._legislatorHashed[year]);
            } else {
                this._eventEmitter.on("Legislator" + year, (data: any) => {
                    resolve(this._legislatorHashed[year]);
                });
                if (!McsUtil.isDefined(this._legislatorStatus[year])) {
                    this._legislatorStatus[year] = "Loading";
                    this.getListItems("BillYear eq " + year)
                        .then((data: ILegislator[]) => {
                            this._legislatorHashed[year] = data;
                            this._legislatorStatus[year] = "Loaded";
                            this._eventEmitter.emit("Legislator" + year, { Items: data });
                            resolve(data);
                        }, (err) => { reject(err); });
                }
            }
        });
    }

}

export const legislatorApiInstance: LegislatorsApi = new LegislatorsApi();
