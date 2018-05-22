import { IWorkflowDefinition, IWorkflowDefinitionApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";
import { findIndex } from "lodash";

// tslint:disable
export class MockWorkflowDefinitionApi extends MockBaseApi<IWorkflowDefinition> implements IWorkflowDefinitionApi {
  constructor() {
    super();
    this.listTitle = Constants.Lists.Tasks;
    this.useCaching = false;
  }
  public getItems(): IWorkflowDefinition[] {
    return [];
  }

  public getSteps(...stepNumbers: number[]): Promise<IWorkflowDefinition[]> {
    return new Promise<IWorkflowDefinition[]>((resolve, reject) => {
      let items: IWorkflowDefinition[] = [];
      this.getListItems().then((result: IWorkflowDefinition[]) => {
        result.forEach((item: IWorkflowDefinition) => {
          if (findIndex(stepNumbers, (value: number): boolean => {
            return item.Step === value;
          }) >= 0) {
            items.push(item);
          }
        });
        if (items.length > 0) {
          resolve(items);
        } else {
          reject("no items found");
        }
      });
    });
  }

}