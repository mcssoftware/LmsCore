import { HttpClient } from "@microsoft/sp-http";

export interface IRollCallApi {
    getItems(httpClient: HttpClient, token: string, filter?: string, select?: string[], expand?: string[],
        orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<any[]>;
    getItemById(httpClient: HttpClient, id: number, token: string): Promise<any>;
    addNewItem(httpClient: HttpClient, properties: any, token: string): Promise<any>;
    updateItem(httpClient: HttpClient, properties: any, token: string): Promise<boolean>;
}