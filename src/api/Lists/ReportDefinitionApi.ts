import { IReportDefinition } from "../../interfaces/ListDefinitions";
import { Web, File, ItemUpdateResult, FileAddResult, Item, CheckinType } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { settings } from "../../configuration/configuration";

export class ReportDefinitionApi extends ListBaseApi<IReportDefinition> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.ReportDefinition;
        this.useCaching = false;
    }

    public getWeb(): Web {
        return new Web(settings.getSiteUrl());
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "ReportDefinition",
            "Title",
            "Id",
            "Created",
            "Modified",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}
