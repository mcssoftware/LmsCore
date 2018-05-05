import { IListApi, IActionDefinition } from "./index";

export interface IActionDefinitionApi extends IListApi<IActionDefinition> {
    getActions(stepId: number[]): Promise<IActionDefinition[]>;
}