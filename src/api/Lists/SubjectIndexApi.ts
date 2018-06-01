import { ILmsTaskApi, ISubjectIndices } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { config } from "../../LmsCore";

export class SubjectIndexApi extends ListBaseApi<ISubjectIndices> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.SubjectIndices;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(config.getSiteUrl());
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "SubjectChapter",
            "SubjectChapterNumber",
            "SubjectTitle",
            "SubjectTitleNumber",
            "SubjectTopic",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }
}