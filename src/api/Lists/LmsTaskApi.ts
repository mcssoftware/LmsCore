import { ITasks, ILmsTaskApi } from "../../interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";

export class LmsTaskApi extends ListBaseApi<ITasks> implements ILmsTaskApi {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = false;
    }

    public getTaskForBill(billId: number, skip?: number, top?: number): Promise<ITasks[]> {
        return new Promise<ITasks[]>((resolve, reject) => {
            const filter: string = "BillLookupId eq " + billId;
            this.getListItems(filter, null, null, "Created", false, skip, top).then((result: ITasks[]) => {
                resolve(result);
            }, (err) => { reject(err); });
        });
    }

    public getChildrenOfParent(parentTaskId: number): Promise<ITasks[]> {
        return new Promise<ITasks[]>((resolve, reject) => {
            const filter: string = "ParentLookupId eq " + parentTaskId;
            this.getListItems(filter, null, null, "Created", false).then((result: ITasks[]) => {
                resolve(result);
            }, (err) => { reject(err); });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "AssignedToId",
            "BillLookupId",
            "Body",
            "Comments",
            "CommentsFromPreviousTask",
            "DueDate",
            "HasChildren",
            "IsChildren",
            "LmsTaskType",
            "ParentLookupId",
            "PercentComplete",
            "PredecessorsId",
            "PreviouslyAssignedToStringId",
            "Priority",
            "StartDate",
            "Status",
            "WorkflowStepNumber",
            "StepType",
            "TaskProperties",
        ]).concat(this.getUserSelectForExpand("AssignedTo"));
    }

    public getExpands(): string[] {
        return ["AssignedTo"];
    }

}