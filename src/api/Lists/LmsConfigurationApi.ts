import { ListBaseApi } from "./ListBaseApi";
import { ILmsConfiguration, ILmsItemConfiguration, ILmsConfigurationApi } from "../../interfaces";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import * as pnp from "sp-pnp-js";
import { McsUtil } from "../../libraries/util";
import { EventEmitter } from "../../libraries/EventEmitter";

export class LmsConfigurationApi extends ListBaseApi<ILmsItemConfiguration> implements ILmsConfigurationApi {
    private _currentConfiguration: ILmsConfiguration;
    private readonly _eventEmitter: EventEmitter = EventEmitter.getInstance();

    private constructor() {
        super();
        this.listTitle = Constants.Lists.LmsConfiguration;
        this.useCaching = true;
        this.setConfiguration().then((configData: ILmsConfiguration) => {
            this._currentConfiguration = configData;
            this._eventEmitter.emit("LmsConfiguration", { Items: configData });
        });
    }

    // tslint:disable:no-string-literal
    /**
     * Singleton for the page so we can get Lms Configuration
     */
    public static getInstance(): LmsConfigurationApi {
        if (!window["LmsConfigurationApi"]) {
            window["LmsConfigurationApi"] = new LmsConfigurationApi();
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

    public getYear(year?: number): Promise<number> {
        return new Promise((resolve, reject) => {
            if (McsUtil.isDefined(year) && McsUtil.isNumberString(year.toString())) {
                resolve(year);
            } else {
                if (McsUtil.isDefined(this._currentConfiguration)) {
                    resolve(parseInt(this._currentConfiguration.BillYear, 10));
                } else {
                    this.getConfiguration(year).then((config) => {
                        resolve(parseInt(config.BillYear, 10));
                    });
                }
            }
        });
    }

    public getConfiguration(year?: number): Promise<ILmsConfiguration> {
        return new Promise((resolve, reject) => {
            if (McsUtil.isDefined(year)) {
                reject("not implemented");
            } else {
                if (McsUtil.isDefined(this._currentConfiguration)) {
                    // this._eventEmitter.emit(Constants.LmsEventType.Bill, { Items: billValue });
                    resolve(this._currentConfiguration);
                } else {
                    this._eventEmitter.on("LmsConfiguration", (data: any) => {
                        resolve(this._currentConfiguration);
                    });
                }
            }
        });
    }

    private setConfiguration(): Promise<ILmsConfiguration> {
        return new Promise((resolve, reject) => {
            this.getListItems().then((result) => {
                // tslint:disable-next-line:prefer-const
                let config: ILmsConfiguration = {} as ILmsConfiguration;
                result.forEach((item) => {
                    if (typeof item.Title === "string" && typeof item.Value === "string") {
                        const title: string = item.Title;
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
