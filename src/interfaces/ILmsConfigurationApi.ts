import { IListApi, ILmsConfiguration, ILmsItemConfiguration } from "../exports/interfaces";

export interface ILmsConfigurationApi {
    getConfiguration(year?: number): Promise<ILmsConfiguration>;
    getYear(year?: number): Promise<number>;
}