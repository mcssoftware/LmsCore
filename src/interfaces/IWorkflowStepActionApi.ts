import { IWorkflowDefinitionStepAction, IListApi } from "../exports/interfaces";

export interface IWorkflowStepActionApi extends IListApi<IWorkflowDefinitionStepAction> {
    getWorkflowStepActionIdForStep(stepId: number): Promise<number[]>;
}