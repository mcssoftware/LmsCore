// tslint:disable-next-line:no-reference
/// <reference path="./../../node_modules/@types/sharepoint/index.d.ts" />
import { IDictionary, ISpDependency, IBills, IWorkflowDefinition, IUser } from "./../interfaces";
import * as pnp from "sp-pnp-js";

// tslint:disable-next-line:typedef
const toString = Object.prototype.toString;
declare let _v_dictSod: any;
declare let Sods: any;
// tslint:disable-next-line:no-unnecessary-class
export class McsUtil {
    public static isDefined(n: any): boolean {
        return typeof n !== "undefined" && n !== null;
    }
    public static isArray(n: any): boolean {
        return typeof n !== "undefined" && n !== null && Array.isArray(n);
    }

    public static isString(n: any): boolean {
        return typeof n === "string" && n.length > 0;
    }

    public static isNumeric(n: any): boolean {
        return typeof n !== "undefined" && n !== null && !isNaN(parseFloat(n)) && isFinite(n);
    }

    public static isUnsignedInt(n: any): boolean {
        return typeof n !== "undefined" && n !== null && !isNaN(parseInt(n, 10)) && isFinite(n) && n > -1;
    }

    public static toNumber(n: any): number {
        return McsUtil.isUnsignedInt(n) ? parseInt(n, 10) : 0;
    }

    public static isFunction(o: any): boolean {
        return toString.call(o) === "[object Function]";
    }

    public static padNumber(n: number, length: number): string {
        let s: string = n.toString();
        while (s.length < (length || 2)) { s = "0" + s; }
        return s;
    }

    public static getString(value: number, length: number): string {
        let stringValue: string = value.toString();
        for (let i: number = stringValue.length; i < length; i++) {
            stringValue = "0" + stringValue;
        }
        return stringValue;
    }

    public static isNumberString(value: string): boolean {
        return /^\d+$/.test(value);
    }

    public static isGuid(stringToTest: string): boolean {
        if (McsUtil.isString(stringToTest)) {
            if (stringToTest[0] === "{") {
                stringToTest = stringToTest.substring(1, stringToTest.length - 1);
            }
            const regexGuid: RegExp = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
            return regexGuid.test(stringToTest);
        }
        return false;
    }

    public static getApiErrorMessage(err: any): string {
        if (McsUtil.isDefined(err)) {
            try {
                return err.data.responseBody["odata.error"].message.value;
            } catch (e) {
                return err.toString();
            }
        }
        return "";
    }

    public static combinePaths(...paths: string[]): string {
        return pnp.util.combinePaths(...paths);
    }

    public static dateAdd(date: Date, interval: string, units: number): Date {
        return pnp.util.dateAdd(date, interval, units);
    }

    public static makeAbsUrl(url: string): string {
        if (url.length > 0 && "/" === url.substr(0, 1)) {
            url = window.location.protocol + "//" + window.location.host + url;
        }
        return url;
    }

    public static getRelativeUrl(url: string): string {
        let relativeUrl: string;
        const protocolIndex: number = url.indexOf("//");
        if (-1 !== protocolIndex) {
            const hostIndex: number = url.indexOf("/", protocolIndex + 2);
            if (-1 !== hostIndex) {
                relativeUrl = url.substr(hostIndex);
            } else {
                relativeUrl = "/";
            }
        } else {
            relativeUrl = url;
        }
        return relativeUrl;
    }

    public static parseHtmlEntities(value: string): string {
        if (McsUtil.isString(value)) {
            const includeRegExp: RegExp = new RegExp("&#([0-9]{1,3});", "gi");
            while (true) {
                // tslint:disable-next-line:prefer-const
                let regExpResult: RegExpExecArray | null = includeRegExp.exec(value);
                if (regExpResult) {
                    const fullMatch: string = regExpResult[0];
                    const tokenName: string = regExpResult[1];
                    const num: number = parseInt(tokenName, 10); // read num as normal number
                    value = value.replace(new RegExp(fullMatch, "gi"), String.fromCharCode(num));
                } else {
                    break;
                }
            }
        }
        return value;
    }

    public static getNextDocumentVersion(documentVersion: number, publish: boolean): number {
        let integerPart: number = Math.floor(documentVersion);
        let decimalPart: number = 0;
        if (!publish) {
            decimalPart = 0;
            integerPart = integerPart + 1;
        } else {
            const countDecimals: number = documentVersion.toString().split(".")[1].length || 0;
            if (countDecimals === 1) {
                decimalPart = Math.floor(documentVersion * 10) % 10;
                if (decimalPart === 9) {
                    decimalPart = decimalPart + 1;
                }
            }
            if (countDecimals === 2) {
                decimalPart = Math.floor(documentVersion * 100) % 100;
                if ((decimalPart + 1) % 10 === 0) {
                    decimalPart = decimalPart + 1;
                }
            }
            decimalPart = decimalPart + 1;
        }
        return parseFloat(`${integerPart}.${decimalPart}`);
    }

    public static getFileExtension(fileName: string): string {
        const tempFileName: string = McsUtil.isString(fileName) ? fileName : "";
        const fileExtensionRegex: RegExp = /^.*\.([^\.]*)$/;
        return tempFileName.replace(fileExtensionRegex, "$1").toLowerCase();
    }

    public static isWordDocument(fileName: string): boolean {
        const fileExtension: string = McsUtil.getFileExtension(fileName);
        return (/(doc|docx)$/i).test(fileExtension);
    }

    public static getAssignedUser(bill: IBills, step: IWorkflowDefinition): IUser {
        if (McsUtil.isDefined(step.AssignedTo)) {
            const regExp: RegExp = new RegExp("{(.+?)}", "g");
            const matches: RegExpExecArray | null = regExp.exec(step.AssignedTo.Title);
            if (McsUtil.isDefined(matches) && matches.length > 1) {
                const token: string = matches[1];
                if (McsUtil.isString(token)) {
                    if (bill.hasOwnProperty(token)) {
                        return bill[token];
                    } else {
                        if (/FiscalAnalyst/gi.test(token)) {
                            return bill.FiscalAnalystUser;
                        }
                    }
                }
                return null;
            }
        }
        return step.AssignedTo;
    }

}

// tslint:disable-next-line:max-classes-per-file
export class PnpUtil {
    private lmsUrl: string;
    private rootUrl: string;
    public setupUrl(siteUrl: string, webUrl: string): void {
        this.lmsUrl = webUrl;
        this.rootUrl = siteUrl;
    }
    public getLmsUrl(): string {
        return this.lmsUrl;
    }
    public getSiteUrl(): string {
        return this.rootUrl;
    }
}

// tslint:disable:no-empty
(window as any)._warningCallback = (): void => { };
// tslint:disable-next-line:typedef
export const pnputil = new PnpUtil();
