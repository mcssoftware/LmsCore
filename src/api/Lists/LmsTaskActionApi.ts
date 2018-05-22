import { ITaskAction, IWorkflowStepActionApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { ListBaseApi } from "./ListBaseApi";

export class LmsTaskActionApi extends ListBaseApi<ITaskAction> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.TaskAction;
        this.useCaching = false;
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "ActionDate",
            "BillLookupId",
            "ActionLookupId",
            "BillStatusMessage",
            "TaskLookupId",
            "AmendmentLookupId",
            "VoteID",
            "ActionDisposition",
            "BillLookup/BillNumber",
            "AmendmentLookup/AmendmentNumber",
        ]);
    }

    public getExpands(): string[] {
        return ["BillLookup", "AmendmentLookup"];
    }
}