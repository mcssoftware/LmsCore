import * as pnp from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { McsUtil, pnputil } from "../../libraries/util";
import { IHttpClientOptions, LmsHttpClient } from "../../libraries/LmsHttpClient";

export class RollCallApi {
    private readonly _url: string = Constants.ServiceUrl.RollCall;

    public getItems(token: string, filter?: string, select?: string[], expand?: string[],
        orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<any[]> {
        const option: IHttpClientOptions = this._getHttpOption(token);
        return new Promise<any[]>((resolve, reject) => {
            const url: string = this._getWebUrl(0, filter);
            const httpClient: LmsHttpClient = new LmsHttpClient();
            httpClient.getLmsData(url, this._getHttpOption(token)).then((response) => {
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

    public getItemById(id: number, token: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            // let select: string[] = this.getSelects();
            // tslint:disable-next-line:prefer-const
            const httpClient: LmsHttpClient = new LmsHttpClient();
            httpClient.getLmsData(this._getWebUrl(), this._getHttpOption(token)).then((response) => {
                if (response.ok) {
                    response.json().then((odataResponse) => {
                        resolve(odataResponse);
                    });
                } else {
                    reject(response.statusText);
                }
            }, (err) => { reject(err); });
        });
    }

    public addNewItem(properties: any, token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const httpClient: LmsHttpClient = new LmsHttpClient();
            httpClient.postLmsData(this._getWebUrl(properties.Id), this._getHttpOption(token, properties)).then((response) => {
                response.json().then((result) => {
                    if (result.error) {
                        reject(result.error);
                    }
                    resolve(result.value);
                }, (error) => {
                    reject(error);
                });
            }, (error) => { reject(error); });
        });
    }

    // public updateItem(httpClient: HttpClient, properties: any, token: string): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         const option: IHttpClientOptions = this._getHttpOption(token, properties);
    //         option.method = "Put";
    //         httpClient.fetch(this._getWebUrl(properties.Id), HttpClient.configurations.v1, option).then((response: HttpClientResponse) => {
    //             response.json().then((result) => {
    //                 resolve();
    //             });
    //         }, (error) => {
    //             reject(error);
    //         });
    //     });
    // }

    private _getWebUrl(id?: number, filter?: string): string {
        const url: string = McsUtil.isDefined(id) && id > 0 ? `${this._url}(${id})` : `${this._url}`;
        return `${url}${McsUtil.isString(filter) ? `?$filter=${filter}` : ""}`;
    }

    private _getHttpOption(token: string, content?: any): IHttpClientOptions {
        const requestHeader: any = {
            "Content-type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token,
        };
        const httpClientOption: IHttpClientOptions = { headers: requestHeader };
        if (McsUtil.isDefined(content)) {
            httpClientOption.body = JSON.stringify(content);
        }
        return httpClientOption;
    }
}
