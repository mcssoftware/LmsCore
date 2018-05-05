import { HttpClient, FetchOptions } from "sp-pnp-js/lib/pnp";

// tslint:disable-next-line:no-empty-interface
export interface IHttpClientOptions extends RequestInit {
}

export class LmsHttpClient extends HttpClient {

    public getLmsData(url: string, options: IHttpClientOptions): Promise<Response> {
        const opts: FetchOptions = this._getOptions(options);
        opts.method = "GET";
        // const opts = Util.extend(options, { method: "GET" });
        return this.fetch(url, opts);
    }

    public postLmsData(url: string, options: IHttpClientOptions): Promise<Response> {
        const opts: FetchOptions = this._getOptions(options);
        opts.method = "POST";
        // const opts = Util.extend(options, { method: "POST" });
        return this.fetch(url, opts);
    }

    private _getOptions(options: IHttpClientOptions): FetchOptions {
        const opts: FetchOptions = {};
        if (options.headers) {
            opts.headers = options.headers as {
                [key: string]: string;
            };
        }
        if (options.mode) {
            opts.mode = options.mode;
        }
        if (options.credentials) {
            opts.credentials = options.credentials;
        }
        if (options.cache) {
            opts.cache = options.cache;
        }
        if (options.body) {
            opts.body = options.body;
        }
        return opts;
    }
}