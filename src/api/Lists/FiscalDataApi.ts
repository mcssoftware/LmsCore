import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { pnputil } from "../../libraries/util";
import { IAgencyContact, IFiscalFund, IFiscalSeries } from "../../interfaces";
// tslint:disable:max-classes-per-file

export class AgencyContactApi extends ListBaseApi<IAgencyContact> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.AgencyContact;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(pnputil.getSiteUrl());
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "AgencyContactName",
            "AgencyName",
            "EMail",
            "IsAgencyDirector",
            "LSOFunction",
            "WorkAddress",
            "WorkCity",
            "WorkFax",
            "WorkPhone",
            "WorkState",
            "WorkZip",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}

export class FiscalFundApi extends ListBaseApi<IFiscalFund> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.FiscalFund;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(pnputil.getSiteUrl());
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "FiscalFundDescription",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}

export class FiscalSeriesApi extends ListBaseApi<IFiscalSeries> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.FiscalSeries;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(pnputil.getSiteUrl());
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "FiscalSeriesDescription",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}
