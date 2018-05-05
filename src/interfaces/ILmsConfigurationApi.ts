import { IListApi, ILmsConfiguration, ILmsItemConfiguration } from "./index";

export interface ILmsConfigurationApi extends IListApi<ILmsItemConfiguration> {
    getConfiguration(year?: number): Promise<ILmsConfiguration>;
}