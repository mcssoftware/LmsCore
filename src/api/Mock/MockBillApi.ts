import { IBills, IBillApi } from "../../exports/interfaces";
import { Web, TypedHash } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockBillApi extends MockBaseApi<IBills> implements IBillApi {
  constructor() {
    super();
    this.listTitle = Constants.Lists.Bills;
    this.useCaching = false;
  }

  public getItems(): IBills[] {
    return [
      {
        "Id": 6,
        "Title": null,
        "BillTitle": "AN ACT relating to child support enforcement; allowing the interception of pari-mutuel gambling winnings to pay unpaid child support; providing for rules; and providing for an effective date.",
        "BillNumber": null,
        "ChapterNumber": null,
        "DocumentStatus": "Working Draft",
        "BillEffectiveDate": null,
        "EnrolledNumber": null,
        "BillType": "HOUSE BILL",
        "BillYear": "2018",
        "CatchTitle": "Child support pari-mutuel winnings intercept.",
        "CoSponsor": null,
        "DrafterId": 44,
        "BillDisclosed": "Unknown",
        "HouseofOrigin": "House",
        "ContactPerson": null,
        "DateReceived": null,
        "HasFiscalImpact": "Unknown",
        "LegislationType": "Bill",
        "LSONumber": "18LSO-0001",
        "Requestor": "Joint Judiciary Interim Committee",
        "RevenueRaising": false,
        "RevenueRaisingDate": null,
        "SponsorTitle": null,
        "Sponsor": "Joint Judiciary Interim Committee",
        "SponsorshipClause": "Joint Judiciary Interim Committee",
        "FiscalAnalystUserId": 36,
        "BillStatus": "Drafting",
        "HouseAmendments": false,
        "SenateAmendments": false,
        "ChapterSignedOn": null,
        "SubstituteNumber": 0,
        "ReleaseBill": "None",
        "DocumentVersion": 0.1,
        "File": null,
      },
    ];
  }

  public getBill(billorLsonumber: string): Promise<IBills> {
    return new Promise<IBills>((resolve, reject) => {
      this.getListItems().then((result: IBills[]) => {
        const item: IBills = null;
        for (let i: number = 0; i < result.length; i++) {
          if (result[i].LSONumber === billorLsonumber || result[i].BillNumber === billorLsonumber) {
            resolve(result[i]);
            break;
          }
        }
        if (item === null) {
          reject("Unable to find bill for +" + billorLsonumber);
        }
      });
    });
  }

  public checkoutBill(bill: IBills): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }

  public checkInBill(bill: IBills, comment: string, publish: boolean): Promise<IBills> {
    return new Promise<IBills>((resolve, reject) => {
      resolve(bill);
    });
  }

  public createBill(billProperty: IBills): Promise<IBills> {
    return this.addNewItem(billProperty);
  }

  public updateBill(bill: IBills, propertiesToUpdate: IBills, blob: Blob, checkInComments: string, publish: boolean): Promise<IBills> {
    return new Promise<IBills>((resolve, reject) => {
      reject("Mock does not allow bill update");
    });
  }

  public updateBillNoBlob(bill: IBills, propertiesToUpdate: IBills, checkInComments: string, publish: boolean): Promise<IBills> {
    return new Promise<IBills>((resolve, reject) => {
      reject("Mock does not allow bill update");
    });
  }

  public getDocumentVersion(documentVersion: number, publishedVersion: boolean): number {
    const decimalPart: number = parseFloat((documentVersion % 1).toFixed(2));
    const integerPart: number = Math.floor(documentVersion);
    if (publishedVersion) {
      return parseFloat((integerPart + 1).toString() + ".0");
    } else {
      let precision: number = 0;
      let evaluator: number = 1;
      while (Math.round(decimalPart * evaluator) / evaluator !== decimalPart) {
        evaluator = evaluator * 10;
        precision++;
      }
      if (precision === 0) {
        return parseFloat(`${integerPart}.1`);
      } else {
        let decimalsValue: number = decimalPart * evaluator;
        if ((decimalsValue + 1) % 10 === 0) {
          decimalsValue++;
        }
        decimalsValue++;
        return parseFloat(`${integerPart}.${decimalsValue}`);
      }
    }
  }

}