import { ILmsConfiguration, ILmsItemConfiguration, ILmsConfigurationApi } from "../../exports/interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockLmsConfigurationApi extends MockBaseApi<ILmsItemConfiguration> implements ILmsConfigurationApi {
    private _currentConfiguration: ILmsConfiguration;
    private constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = true;
    }

    public getItems(): ILmsItemConfiguration[] {
        return [
            {
                "Id": 1,
                "Title": "BillYear",
                "Value": "2018"
            },
            {
                "Id": 2,
                "Title": "LegislatureName",
                "Value": "WYOMING STATE LEGISLATURE"
            },
            {
                "Id": 3,
                "Title": "HouseChiefClerkName",
                "Value": "Wendy Harding"
            },
            {
                "Id": 4,
                "Title": "SenateChiefClerkName",
                "Value": "Ellen Thompson"
            },
            {
                "Id": 5,
                "Title": "HouseSalutation",
                "Value": "Mr. Speaker"
            },
            {
                "Id": 6,
                "Title": "SenateSalutation",
                "Value": "Mr. President"
            },
            {
                "Id": 7,
                "Title": "HouseChamberName",
                "Value": "HOUSE OF REPRESENTATIVES"
            },
            {
                "Id": 8,
                "Title": "SenateChamberName",
                "Value": "SENATE"
            },
            {
                "Id": 9,
                "Title": "HouseLeaderTitle",
                "Value": "Speaker"
            },
            {
                "Id": 10,
                "Title": "SenateLeaderTitle",
                "Value": "President"
            }
        ];
    }

    /**
     * Singleton for the page so we can get Lms Configuration
     */
    public static getInstance(): MockLmsConfigurationApi {
        if (!window["LmsConfigurationApi"]) {
            window["LmsConfigurationApi"] = new MockLmsConfigurationApi();
        }
        return window["LmsConfigurationApi"];
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "Value",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

    public getConfiguration(year?: number): Promise<ILmsConfiguration> {
        return new Promise((resolve, reject) => {
            if (McsUtil.isDefined(year)) {
                reject("not implemented");
            } else {
                if (McsUtil.isDefined(this._currentConfiguration)) {
                    resolve(this._currentConfiguration);
                } else {
                    this.setonfiguration().then((configdata) => {
                        this._currentConfiguration = configdata;
                        resolve(this._currentConfiguration);
                    });
                }
            }
        });
    }

    private setonfiguration(): Promise<ILmsConfiguration> {
        return new Promise((resolve, reject) => {
            this.getListItems().then((result) => {
                let config: ILmsConfiguration = {} as ILmsConfiguration;
                result.forEach((item) => {
                    if (typeof item.Title === "string" && typeof item.Value === "string") {
                        let title: string = item.Title;
                        config[title] = item.Value as string;
                    }
                });
                resolve(config);
            }, (err) => {
                reject(err);
            });
        });
    }

}
