import { IListApi, ILmsConfiguration, ILmsItemConfiguration } from "../exports/interfaces";

export interface ILmsConfigurationApi extends IListApi<ILmsItemConfiguration> {
    getConfiguration(year?: number): Promise<ILmsConfiguration>;
}