import { Settings } from "./configuration/configuration";
import { Constants } from "./configuration/constants";

export const config: Settings = new Settings();
// tslint:disable-next-line:typedef
export const constants = Constants;

export * from "./interfaces";
export * from "./api";