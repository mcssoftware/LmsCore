import { IListApi, IElementsAffected } from "../exports/interfaces";

export interface IElementsAffectedApi extends IListApi<IElementsAffected> {
    getElementsAffectedForBill(billId: number): Promise<IElementsAffected[]>;
    getDuplicates(elements: IElementsAffected[]): Promise<IElementsAffected[]>;
}