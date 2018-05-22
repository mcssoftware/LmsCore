import { IRollCall, IWorkflowStepActionApi } from "../../exports/interfaces";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

export class MockRollCallApi extends MockBaseApi<IRollCall> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = false;
    }
}