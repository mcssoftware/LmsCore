import { ILmsTaskApi, ISubjectIndices } from "../../interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";
import { pnputil } from "../../libraries/util";

export class SubjectIndexApi extends ListBaseApi<ISubjectIndices> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Tasks;
        this.useCaching = true;
    }

    public getWeb(): Web {
        return new Web(pnputil.getSiteUrl());
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