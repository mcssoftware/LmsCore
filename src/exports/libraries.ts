import LmsLogger from "../libraries/LmsLogger";
import Cookie from "../libraries/Cookie";

export { EventEmitter } from "../libraries/EventEmitter";
export { fileIcons } from "../libraries/fileIcon";
export * from "../libraries/KeyValueStorage";
export * from "../libraries/LmsHttpClient";
export * from "../libraries/LmsNumberFormatters";
export * from "../libraries/TextTokenReplacement";
export * from "../libraries/util";

export const lmsLogger: LmsLogger = new LmsLogger();
export const lmsCookie: Cookie = new Cookie();