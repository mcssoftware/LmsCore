import { IBillDraftRequest } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { ListBaseApi } from "./ListBaseApi";
import { Constants } from "../../configuration/constants";

export class BillDraftApi extends ListBaseApi<IBillDraftRequest> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.BillDraftRequest;
        this.useCaching = false;
    }

    public getBilldraft(billorLsonumber: string): Promise<IBillDraftRequest> {
        return new Promise<IBillDraftRequest>((resolve, reject) => {
            this.getListItems("LSONumber eq '" + billorLsonumber + "'")
                .then((results: IBillDraftRequest[]) => {
                    if (results.length < 1) {
                        reject("Unable to find bill for +" + billorLsonumber);
                    } else {
                        resolve(results[0]);
                    }
                },
                    (err) => {
                        reject(err);
                    });
        });
    }

    public getSelects(): string[] {
        return super.getSelects().concat([
            "BillDisclosed",
            "CatchTitle",
            "ContactPerson",
            "CoSponsor",
            "CoSponsorType",
            "DateReceived",
            "DrafterId",
            "DraftingInstructions",
            "DraftReceivedBy",
            "HasFiscalImpact",
            "HouseofOrigin",
            "InfoReceivedMethod",
            "LegislationType",
            "LSONumber",
            "LSOResearchRequestNumber",
            "PrimeSponsorshipClause",
            "ReleaseBill",
            "Requestor",
            "RequestorType",
            "ResurrectBillCatchTitle",
            "ResurrectBillVersion",
            "ResurrectBillYear",
            "ResurrectLsoNumber",
            "ResurrectRelatedAmendments",
            "ResurrectSponsor",
            "RevenueRaising",
            "RevenueRaisingDate",
            "Sponsor",
            "SponsorshipClause",
            "SponsorTitle",
            "SponsorType",
            "SelectTopic",
        ]).concat(this.getUserSelectForExpand("Drafter"));
    }

    public getExpands(): string[] {
        return ["Drafter"];
    }
}
