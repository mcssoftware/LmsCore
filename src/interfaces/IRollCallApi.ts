// import { HttpClient } from "@microsoft/sp-http";

export interface IRollCallApi {
    getItems(httpClient: any, token: string, filter?: string, select?: string[], expand?: string[],
        orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<any[]>;
    getItemById(httpClient: any, id: number, token: string): Promise<any>;
    addNewItem(httpClient: any, properties: any, token: string): Promise<any>;
    updateItem(httpClient: any, properties: any, token: string): Promise<boolean>;
}