import { ISequenceNumbers } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";

export class SequenceNumbersApi extends ListBaseApi<ISequenceNumbers> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.SequenceNumbers;
        this.useCaching = false;
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "SequenceNextNumber",
            "SequenceNumberDescription",
        ]);
    }

    public getExpands(): string[] {
        return [];
    }

}