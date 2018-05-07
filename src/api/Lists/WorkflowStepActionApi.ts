import { ListBaseApi } from "./ListBaseApi";
import { IWorkflowDefinitionStepAction, IWorkflowStepActionApi } from "../../interfaces/index";
import { Constants } from "../../configuration/constants";
import { Web } from "sp-pnp-js";
import { settings } from "../../configuration/configuration";

export class WorkflowStepActionApi extends ListBaseApi<IWorkflowDefinitionStepAction> implements IWorkflowStepActionApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.BillWorkflowDefinitionStepAction;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(settings.getSiteUrl());
    }

    public getWorkflowStepActionIdForStep(stepId: number): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            this.getListItems("LookupBillWorkflowDefinitionStepId eq " + stepId)
                .then((stepActions: IWorkflowDefinitionStepAction[]) => {
                    resolve(stepActions.map((value) => {
                        return value.LookupActionDefinitionActionNameId;
                    }));
                }, (err) => { reject(err); });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "LookupActionDefinitionActionNameId",
            "LookupBillWorkflowDefinitionStepId",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

}