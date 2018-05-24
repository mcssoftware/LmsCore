import { ILegislator } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { MockLmsConfigurationApi } from "./MockLmsConfigurationApi";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockLegislatorsApi extends MockBaseApi<ILegislator> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.AllLegislators;
        this.useCaching = true;
    }

    public getItems(): ILegislator[] {
        return [
            {
                "Id": 2,
                "Title": "Senator",
                "LegislatureName": "Jim Anderson",
                "LegislatureDisplayName": "Anderson",
                "Party": "R",
                "LegislatorID": "28",
                "County": "Natrona",
                "Chamber": "Senate",
                "NotificationPreference": "Electronic",
                "EMail": "Jim.Anderson@wyoleg.gov",
                "SponsorAddressLine1": "5941 S. Cedar Street",
                "SponsorAddressLine2": null,
                "WorkCity": "Casper",
                "WorkState": "WY",
                "WorkZip": "82601",
                "LegislatureLoginId": "lsowa\\janderson28",
                "CanSponsor": true,
                "BillYear": "2018"
            },
        ];
    }

    public getWeb(): Web {
        return pnp.sp.site.rootWeb;
    }

    public getLegislators(year?: number): Promise<ILegislator[]> {
        return new Promise<ILegislator[]>((resolve, reject) => {
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
                    }, (err) => {
                        reject(err);
                    });
            }
        });
    }

    public getSelectedLegislator(selectedLegislator: string, year?: number): Promise<ILegislator> {
        return new Promise<ILegislator>((resolve, reject) => {
            this.getLegislators(year).then((legislators: ILegislator[]) => {
                const filterResult: ILegislator[] = legislators.filter((l) => l.LegislatureDisplayName === selectedLegislator);
                if (filterResult.length < 1) {
                    resolve(null);
                } else {
                    resolve(filterResult[0]);
                }
            }, (err) => { reject(err); });
        });
    }
}

export const mockLegislatorApiInstance: MockLegislatorsApi = new MockLegislatorsApi();