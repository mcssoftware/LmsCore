import { AadTokenProvider } from "@microsoft/sp-http";
export interface IADTokenProvider {
  getToken: (resourceEndPoint: string) => Promise<string>;
}

class ADTokenProvider implements IADTokenProvider {
  private _tokenProvider: any;
  constructor() {
    this._tokenProvider = new AadTokenProvider({
      aadInstanceUrl: "https://login.windows.net",
      aadTenantId: "eea67137-5a50-47a4-9063-26249870b260",
      redirectUri: "https://mcssoftwaresolutions.sharepoint.com/_forms/spfxsinglesignon.aspx?redirect",
      servicePrincipalId: "7a9b8665-2852-4c10-8c5d-4235307ac65f",
    } as any);

    this._tokenProvider.oldGetToken = tokenProvider.getToken;
    this._tokenProvider.getToken = (resourceEndPoint: string) => {
      return this._tokenProvider._loginUser().then(() => {
        return this._tokenProvider._acquireTokenPromise(resourceEndPoint).then((token) => {
          return token.token;
        });
      });
    };
  }

  public getToken(resourceEndPoint: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this._tokenProvider._loginUser().then(() => {
        return this._tokenProvider._acquireTokenPromise(resourceEndPoint).then((token) => {
          resolve(token.token);
        }, (err) => { reject(err); });
      }, (err) => { reject(err); });
    });
  }
}

export const tokenProvider: IADTokenProvider = new ADTokenProvider();