import * as pnp from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { McsUtil } from "../../libraries/util";
// import { IHttpClientOptions, HttpClient } from "@microsoft/sp-http";
import { ListBaseApi } from "./ListBaseApi";
import { IRollCall } from "../../LmsCore";
import { IRollCallApi } from "../../interfaces/IRollCallApi";

declare var HttpClient: any;

export class RollCallApi implements IRollCallApi {
    private readonly _url: string = Constants.ServiceUrl.RollCall;

    public getItems(httpClient: any, token: string, filter?: string, select?: string[], expand?: string[],
        orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<any[]> {
        const option: any = this._getHttpOption(token);
        return new Promise<any[]>((resolve, reject) => {
            const url: string = this._getWebUrl(0, filter);
            httpClient.get(url, HttpClient.configurations.v1, this._getHttpOption(token)).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        resolve(data);
                    });
                } else {
                    reject(response.statusText);
                }
            }, (err) => { reject(err); });
        });
    }

    public getItemById(httpClient: any, id: number, token: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // let select: string[] = this.getSelects();
            // tslint:disable-next-line:prefer-const
            httpClient.get(this._getWebUrl(), HttpClient.configurations.v1, this._getHttpOption(token))
                .then((odataResponse) => {
                    resolve(odataResponse);
                }, (err) => { reject(err); });
        });
    }

    public addNewItem(httpClient: any, properties: any, token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            httpClient.post(this._getWebUrl(properties.Id), HttpClient.configurations.v1, this._getHttpOption(token, properties))
                .then((result) => {
                    resolve(result);
                }, (error) => { reject(error); });
        });
    }

    public updateItem(httpClient: any, properties: any, token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const option: any = this._getHttpOption(token, properties);
            option.method = "Put";
            httpClient.fetch(this._getWebUrl(properties.Id), HttpClient.configurations.v1, option).then((response) => {
                response.json().then((result) => {
                    resolve();
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    private _getWebUrl(id?: number, filter?: string): string {
        const url: string = McsUtil.isDefined(id) && id > 0 ? `${this._url}(${id})` : `${this._url}`;
        return `${url}${McsUtil.isString(filter) ? `?$filter=${filter}` : ""}`;
    }

    private _getHttpOption(token: string, content?: any): any {
        const requestHeader: any = {
            "Content-type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token,
        };
        const httpClientOption: any = { headers: requestHeader };
        if (McsUtil.isDefined(content)) {
            httpClientOption.body = JSON.stringify(content);
        }
        return httpClientOption;
    }
}
