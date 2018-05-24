import { ITaskAction, IWorkflowStepActionApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

export class MockLmsTaskActionApi extends MockBaseApi<ITaskAction> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = false;
    }
}