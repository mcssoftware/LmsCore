import { IElementsAffected, IElementsAffectedApi } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockElementsAffectedApi extends MockBaseApi<IElementsAffected> implements IElementsAffectedApi {
  constructor() {
    super();
    this.listTitle = Constants.Lists.SubjectIndices;
    this.useCaching = false;
  }

  public getItems(): IElementsAffected[] {
    return [];
  }

  public getElementsAffectedForBill(billId: number): Promise<IElementsAffected[]> {
    return new Promise<IElementsAffected[]>((resolve, reject) => {
      this.getListItems().then((elements) => {
        resolve(elements.filter(value => value.BillLookupId === billId));
      });
    });
  }

  public getDuplicates(elements: IElementsAffected[]): Promise<IElementsAffected[]> {
    return new Promise<IElementsAffected[]>((resolve, reject) => {
      resolve([]);
    });
  }
}