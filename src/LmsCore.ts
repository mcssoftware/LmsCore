import { Settings } from "./configuration/configuration";
import { Constants } from "./configuration/constants";
import { McsUtil } from "./libraries/util";

export const config: Settings = new Settings();

export * from "./exports/interfaces";
export * from "./exports/api";
export * from "./exports/libraries";
export { WorkflowLogic } from "./services/WorkflowLogic";
export { Constants } from "./configuration/constants";
export { tokenProvider} from "./aad/adTokenProvider";