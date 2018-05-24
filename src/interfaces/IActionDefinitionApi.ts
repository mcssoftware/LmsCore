import { IActionDefinition } from "./ListDefinitions";
import { IListApi } from "./IListApi";

export interface IActionDefinitionApi extends IListApi<IActionDefinition> {
    getActions(stepId: number[]): Promise<IActionDefinition[]>;
}