import { MockBaseApi } from "./MockBaseApi";
import { IWorkflowDefinitionStepAction, IWorkflowStepActionApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";

export class MockWorkflowStepActionApi extends MockBaseApi<IWorkflowDefinitionStepAction> implements IWorkflowStepActionApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.ActionDefinition;
        this.useCaching = true;
    }

    public getWorkflowStepActionIdForStep(stepId: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            this.getListItems("LookupBillWorkflowDefinitionStepId eq '" + stepId + "'")
                .then((value: IWorkflowDefinitionStepAction[]) => {
                    resolve([]);
                }, (err) => { reject(err); });
        });
    }
}