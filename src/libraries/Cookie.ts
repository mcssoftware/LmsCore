export interface ICookieAttributes {
    path?: string;
    domain?: string;
    maxAge?: number;
    expires?: Date;
    secure?: boolean;
}

export default class Cookie {
    private _cookie: string;
    constructor() {
        this._cookie = document.cookie;
    }

    // public tryGetCookie(cookieId: string): string | undefined {
    //     return new Cookie().tryGetCookie(cookieId);
    // }

    public setCookie(id: string, value: string, attributes?: ICookieAttributes): void {
        document.cookie = this.buildCookie(id, value, attributes);
    }

    public buildCookie(id: string, value: string, attributes?: ICookieAttributes): string {
        const cookieData: string[] = [];
        if (value.indexOf(" ") !== -1 || value.indexOf(",") !== -1 || value.indexOf(";") !== -1) {
            value = encodeURIComponent(value);
        }
        cookieData.push(id + "=" + value);
        if (attributes) {
            if (attributes.path) {
                cookieData.push("path=" + attributes.path);
            }
            if (attributes.domain) {
                cookieData.push("domain=" + attributes.domain);
            }
            if (attributes.maxAge) {
                cookieData.push("max-age=" + attributes.maxAge);
            }
            if (attributes.expires) {
                cookieData.push("expires=" + attributes.expires.toUTCString());
            }
            if (attributes.secure) {
                cookieData.push("secure");
            }
        }
        return cookieData.join("; ");
    }

    public tryGetCookie(cookieId: string): string | undefined {
        const prefix: string = cookieId + "=";
        const keyValuePair: string = this._cookie
            .split(";")
            .map((str) => {
                return str.trim();
            })
            .filter((str) => {
                return str.indexOf(prefix) === 0;
            })[0];
        return keyValuePair ? decodeURIComponent(keyValuePair.substr(prefix.length)) : undefined;
    }
}