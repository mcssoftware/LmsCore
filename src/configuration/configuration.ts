export class Settings {
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