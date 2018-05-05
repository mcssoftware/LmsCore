import { IWorkflowDefinition, IWorkflowDefinitionApi } from "../../interfaces";
import * as pnp from "sp-pnp-js";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { pnputil } from "../../libraries/util";

export class WorkflowDefinitionApi extends ListBaseApi<IWorkflowDefinition> implements IWorkflowDefinitionApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.WorkflowDefinition;
        this.useCaching = false;
    }

    public getWeb(): Web {
        return new Web(pnputil.getSiteUrl());
    }

    public getSteps(...stepNumbers: number[]): Promise<IWorkflowDefinition[]> {
        return new Promise<IWorkflowDefinition[]>((resolve, reject) => {
            const filter: string = stepNumbers.map((value: number): string => {
                return "Step eq " + value;
            }).join(" or ");
            this.getListItems(filter, null, null, "Step", true).then((result: IWorkflowDefinition[]) => {
                resolve(result);
            }, (err) => { reject(err); });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "ActionRequired",
            "AllowBatchCompletion",
            "AllowInCalendar",
            "AssignedToId",
            "AssignmentFilterId",
            "AutoComplete",
            "BillDigestReportable",
            "BillStatusReportable",
            "Chamber",
            "ChildSteps",
            "CommitteeID",
            "CutoffDate",
            "Instructions",
            "LmsTaskType",
            "LookupBillMessageDefaultId",
            "LookupBillMessageFailedId",
            "LookupBillMessagePassedId",
            "LookupBillMessagePassedAltAmendeId",
            "LookupBillMessagePassedSameAmendId",
            "LookupBillStateTitle/Title",
            "OnApproveNext",
            "OppositeChamberCutOffDate",
            "ReminderTasks",
            "Step",
            "StepShortTitle",
            "StepTitle",
            "StepType",
            "WorkflowBillStatus",
        ]).concat(this.getUserSelectForExpand("AssignedTo"))
            .concat(this.getUserSelectForExpand("AssignmentFilter"));
    }

    public getExpands(): string[] {
        return ["AssignedTo", "AssignmentFilter", "LookupBillStateTitle"];
    }

}