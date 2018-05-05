import { IListApi, ILegislator } from "./";

export interface ILegislatorsApi extends IListApi<ILegislator> {
    getLegislators(year?: number): Promise<ILegislator[]>;
}