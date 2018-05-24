import { IListApi, ILegislator } from "../exports/interfaces";

export interface ILegislatorsApi extends IListApi<ILegislator> {
    getLegislators(year?: number): Promise<ILegislator[]>;
}