import { McsUtil } from "../libraries/util";
import * as pnp from "sp-pnp-js";
import { ILmsConfigurationApi } from "../interfaces/ILmsConfigurationApi";
import { ILmsConfiguration } from "../interfaces/ListDefinitions";
import { Constants } from "../configuration/constants";

export class LmsFormatters {
    // private static _lsonumberExpression: RegExp = /^((\d{2})LSO?-(\d{1,4}))|^(\d{1,4})/gi;
    // private static _billNumberExpression: RegExp = new RegExp("^(H|S)([a-zA-Z])(\d){1,3}", "gi");

    public static LsoOrBillNumber(value: string, configurationApi: ILmsConfigurationApi): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (!McsUtil.isString(value)) {
                resolve("");
            }
            value = value.toUpperCase();
            const match1: RegExpExecArray = /^((\d{2})LSO?-(\d{1,4}))|^(\d{1,4})/gi.exec(value);

            if (McsUtil.isDefined(match1)) {
                LmsFormatters._lsonumber(match1, configurationApi).then((result) => {
                    resolve(result);
                });
            }
            const match2: RegExpExecArray = /^(H|S)([a-zA-Z])(\d){1,4}/gi.exec(value);
            if (McsUtil.isDefined(match2)) {
                const billNumber: string = LmsFormatters._billNumber(match2);
                resolve(billNumber);
            }
        });
    }

    public static BillNumber(value: number, type: Constants.SequenceNumberType): string {
        switch (type) {
            case Constants.SequenceNumberType.SenateBillNumber:
                return "SF" + McsUtil.padNumber(value, 4);
            case Constants.SequenceNumberType.SenateResolutionNumber:
                return "SJ" + McsUtil.padNumber(value, 4);
            case Constants.SequenceNumberType.HouseResolutionNumber:
                return "HJ" + McsUtil.padNumber(value, 4);
            default:
                return "HB" + McsUtil.padNumber(value, 4);
        }
    }

    public static ChapterNumber(value: number): string {
        return value.toString();
    }

    private static _lsonumber(match: RegExpExecArray, configurationApi: ILmsConfigurationApi): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (McsUtil.isDefined(match)) {
                const yearValue: string = match[2];
                let numberValue: number;
                if (McsUtil.isString(yearValue)) {
                    numberValue = parseInt(match[3], 10);
                } else {
                    numberValue = parseInt(match[4], 10);
                }

                let numberString: string = numberValue.toString();
                if (numberValue < 10) {
                    numberString = "000" + numberString;
                } else {
                    if (numberValue < 100) {
                        numberString = "00" + numberString;
                    } else {
                        if (numberValue < 1000) {
                            numberString = "0" + numberString;
                        }
                    }
                }
                if (McsUtil.isString(yearValue)) {
                    resolve(yearValue + "LSO-" + numberString);
                } else {
                    configurationApi.getConfiguration()
                        .then((config: ILmsConfiguration) => {
                            if (McsUtil.isDefined(config.BillYear)) {
                                resolve((parseInt(config.BillYear, 10) % 100).toString() + "LSO-" + numberString);
                            } else {
                                reject("Error getting year configuration value.");
                            }
                        }, () => {
                            reject("Error getting configuration.");
                        });
                }
            } else {
                resolve("");
            }
        });
    }

    private static _billNumber(match: RegExpExecArray): string {
        const numberValue: number = parseInt(match[3], 10);
        return `${match[1]}${match[2]}${McsUtil.padNumber(numberValue, 4)}`.toUpperCase();
    }
}
