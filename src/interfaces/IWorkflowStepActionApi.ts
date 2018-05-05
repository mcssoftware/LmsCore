import { IWorkflowDefinitionStepAction, IListApi } from "./index";

export interface IWorkflowStepActionApi extends IListApi<IWorkflowDefinitionStepAction> {
    getWorkflowStepActionIdForStep(stepId: number): Promise<number[]>;
}