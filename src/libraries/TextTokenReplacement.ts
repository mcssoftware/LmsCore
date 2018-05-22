import { McsUtil } from "./util";
import KeyValueStorage from "./KeyValueStorage";
import { TypedHash } from "sp-pnp-js";
import { escapeRegExp } from "lodash";

export interface ITokenReplacementOptions {
    prefix?: string;
    suffix?: string;
    delimiter?: string;
    preserveUnknownTokens?: boolean;
}

export class TextTokenReplacement {
    // private _tokenExpression: RegExp = new RegExp("{\S+}", "gi");
    private _tokens: KeyValueStorage;
    private _tokenCount: number;

    /**
     *
     */
    constructor() {
        this._tokens = new KeyValueStorage();
        this._tokenCount = 0;
    }

    public addToken(key: string, value: string): void {
        if (McsUtil.isString(key) && McsUtil.isDefined(value) && !this._tokens.hasOwnProperty(key)) {
            if (key[0] !== "{") {
                key = "{" + key + "}";
            }
            this._tokens.setItem(key.toUpperCase().toString(), value);
            this._tokenCount++;
        }
    }

    public addObjectPropertyToTokenList(objectToAdd: TypedHash<any>): void {
        if (McsUtil.isDefined(objectToAdd)) {
            // tslint:disable-next-line:forin
            for (const key in objectToAdd) {
                if (McsUtil.isDefined(objectToAdd[key])) {
                    const value: string = objectToAdd[key].toString();
                    this.addToken(key, value);
                }
            }
        }
    }

    public performTokenReplacement(text: string): string {
        const options: ITokenReplacementOptions = this._injectDefaultOptions();
        const includeRegExp: RegExp = new RegExp(escapeRegExp(options.prefix) + "(.+?)" + escapeRegExp(options.suffix), "g");

        let retVal: string = text;
        let regExpResult: RegExpExecArray | null;
        // tslint:disable-next-line:no-conditional-assignment
        while (regExpResult = includeRegExp.exec(text)) {
            const arrayDetected: boolean = false;
            const arrayItemId: number = -1;
            const fullMatch: string = regExpResult[0];
            const tokenName: string = regExpResult[1];

            let tokenValue: string = this._tokens.getItem(`{${tokenName.toUpperCase()}}`);
            if (tokenValue === null && !options.preserveUnknownTokens) {
                tokenValue = "";
            }
            if (tokenValue !== null) {
                retVal = retVal.replace(fullMatch, tokenValue);
            }
        }
        return retVal;
    }

    private _injectDefaultOptions(options?: ITokenReplacementOptions): ITokenReplacementOptions {
        options = options || {};
        options.prefix = options.prefix || "{";
        options.suffix = options.suffix || "}";
        options.delimiter = options.delimiter || ".";
        if (!McsUtil.isDefined(options.preserveUnknownTokens)) {
            options.preserveUnknownTokens = true;
        }
        return options;
    }
}