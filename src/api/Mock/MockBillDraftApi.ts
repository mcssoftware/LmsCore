import { IBillDraftRequest } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockBillDraftApi extends MockBaseApi<IBillDraftRequest> {
    constructor() {
        super();
        this.listTitle = Constants.Lists.Bills;
        this.useCaching = false;
    }

    public getItems(): IBillDraftRequest[] {
        return [
            {
              "Id": 10,
              "Title": "18LSO-0010",
              "CatchTitle": "Custody in the best interest of the children.",
              "DrafterId": 44,
              "BillDisclosed": "Unknown",
              "HouseofOrigin": "House",
              "CoSponsorType": "Legislator",
              "CoSponsor": null,
              "ContactPerson": null,
              "DateReceived": null,
              "DraftReceivedBy": "Torey Racines",
              "DraftingInstructions": "Draft a bill to reinforce existing statutory language that all forms of parental custody share equal footing in determination of custody in divorce proceedings.   ",
              "HasFiscalImpact": "Unknown",
              "InfoReceivedMethod": "In Person",
              "LegislationType": "Bill",
              "LSONumber": "18LSO-0010",
              "LSOResearchRequestNumber": null,
              "SponsorType": "Committee",
              "RequestorType": "Committee",
              "Requestor": "Joint Judiciary Interim Committee",
              "ResurrectBillCatchTitle": null,
              "ResurrectLsoNumber": null,
              "RevenueRaising": false,
              "RevenueRaisingDate": null,
              "SponsorTitle": null,
              "Sponsor": "Joint Judiciary Interim Committee",
              "ResurrectBillYear": null,
              "ResurrectBillVersion": null,
              "SponsorshipClause": "Joint Judiciary Interim Committee",
              "PrimeSponsorshipClause": "Joint Judiciary Interim Committee",
              "ResurrectSponsor": null,
              "ReleaseBill": "None",
            },
          ];
    }

    public getBill(billorLsonumber: string): Promise<IBillDraftRequest> {
        return new Promise<IBillDraftRequest>((resolve, reject) => {
            this.getListItems("LSONumber eq '" + billorLsonumber + "' or BillNumber eq '" + billorLsonumber + "'")
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

}