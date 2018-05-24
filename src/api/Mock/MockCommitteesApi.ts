import { ICommittee } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { MockBaseApi } from "./MockBaseApi";
import { MockLmsConfigurationApi } from "./MockLmsConfigurationApi";

// tslint:disable
export class MockCommitteesApi extends MockBaseApi<ICommittee> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.AllLegislators;
        this.useCaching = true;
    }

    public getItems(): ICommittee[] {
        return [
            {
                "Id": 1,
                "Title": "Air Transportation Liaison Committee",
                "CommitteeShortName": "SAT",
                "CanSponsor": false,
                "CanCoSponsor": false,
                "CommitteeDisplayTitle": null,
                "CanCreateAmendments": false,
                "BillYear": "2018"
            },
        ];
    }

    public getWeb(): Web {
        return pnp.sp.site.rootWeb;
    }

    public getCommittees(year?: number): Promise<ICommittee[]> {
        return new Promise<ICommittee[]>((resolve, reject) => {
            if (McsUtil.isDefined(year)) {
                this.getListItems("BillYear eq " + year)
                    .then((data) => {
                        resolve(data);
                    }, (err) => {
                        reject(err);
                    });
            } else {
                MockLmsConfigurationApi.getInstance().getConfiguration()
                    .then((config) => {
                        this.getListItems("BillYear eq " + config.BillYear)
                            .then((data) => {
                                resolve(data);
                            }, (err) => {
                                reject(err);
                            });
                    });
            }
        });
    }
}

export let mockCommitteeApiInstance: MockCommitteesApi = new MockCommitteesApi();