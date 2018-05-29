import { ListBaseApi } from "./ListBaseApi";
import { McsUtil } from "../../libraries/util";
import { Constants } from "../../configuration/constants";
import { Web } from "sp-pnp-js";
import { IActionDefinition, IActionDefinitionApi } from "../../exports/interfaces";
import { config } from "../../LmsCore";

export class ActionDefinitionApi extends ListBaseApi<IActionDefinition> implements IActionDefinitionApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.ActionDefinition;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(config.getSiteUrl());
    }

    public getActions(idList: number[]): Promise<IActionDefinition[]> {
        return new Promise<IActionDefinition[]>((resolve, reject) => {
            if (McsUtil.isArray(idList) && idList.length > 0) {
                const filter: string[] = idList.map((ele: number) => {
                    return "Id eq " + ele.toString();
                });
                this.getListItems(filter.join(" or "))
                    .then((result: IActionDefinition[]) => {
                        resolve(result);
                    }, (err) => { reject(err); });
            } else {
                resolve([]);
            }
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "ActionDescription",
            "ActionDisposition",
            "ActionName",
            "ActionShortDescription",
            "AmendmentRequired",
            "BillDigestReportable",
            "BillStatusReportable",
            "CommitteeVoteIDRequired",
            "VoteIdRequired",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

}
