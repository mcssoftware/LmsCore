import LmsLogger from "../libraries/LmsLogger";

export { EventEmitter } from "../libraries/EventEmitter";
export * from "../libraries/Cookie";
export { fileIcons } from "../libraries/fileIcon";
export * from "../libraries/KeyValueStorage";
export * from "../libraries/LmsHttpClient";
export * from "../libraries/LmsNumberFormatters";
export * from "../libraries/TextTokenReplacement";
export * from "../libraries/util";

export { IADTokenProvider, tokenProvider } from "../aad/adTokenProvider";
export const lmsLogger: LmsLogger = new LmsLogger();