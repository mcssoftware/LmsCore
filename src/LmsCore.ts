import { Settings } from "./configuration/configuration";
import { Constants } from "./configuration/constants";
import { McsUtil } from "./libraries/util";

export const config: Settings = new Settings();
// tslint:disable-next-line:typedef
export const constants = Constants;

export * from "./exports/interfaces";
export * from "./exports/api";