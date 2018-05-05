import { IListApi, IWorkflowDefinition } from "./";

export interface IWorkflowDefinitionApi extends IListApi<IWorkflowDefinition> {
    getSteps(...stepNumbers: number[]): Promise<IWorkflowDefinition[]>;
}