import { IListApi, IWorkflowDefinition } from "../exports/interfaces";

export interface IWorkflowDefinitionApi extends IListApi<IWorkflowDefinition> {
    getSteps(...stepNumbers: number[]): Promise<IWorkflowDefinition[]>;
}