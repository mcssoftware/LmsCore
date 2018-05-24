import { ISequenceNumbers } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";
import { McsUtil } from "../../libraries/util";

// tslint:disable
export class MockSequenceNumbersApi extends MockBaseApi<ISequenceNumbers> {
  constructor() {
    super();
    this.listTitle = Constants.Lists.SequenceNumbers;
    this.useCaching = false;
  }

  public getItems(): ISequenceNumbers[] {
    return [
      {
        "Id": 2,
        "Title": "Bill Message Number",
        "SequenceNextNumber": 1,
        "SequenceNumberDescription": "Sequential numbers assigned to generated bill messages."
      },
      {
        "Id": 3,
        "Title": "House Bill Message",
        "SequenceNextNumber": 100,
        "SequenceNumberDescription": "Sequential numbers assigned to generated house bill messages."
      },
      {
        "Id": 4,
        "Title": "Senate Bill Message",
        "SequenceNextNumber": 100,
        "SequenceNumberDescription": "Sequential numbers assigned to generated senate bill messages."
      },
      {
        "Id": 5,
        "Title": "Lso Number",
        "SequenceNextNumber": 136,
        "SequenceNumberDescription": "Sequential numbers assigned to lso number."
      },
      {
        "Id": 6,
        "Title": "House Bill Number",
        "SequenceNextNumber": 3,
        "SequenceNumberDescription": "Sequential numbers assigned to house bill number."
      },
      {
        "Id": 7,
        "Title": "Senate Bill Number",
        "SequenceNextNumber": 3,
        "SequenceNumberDescription": "Sequential numbers assigned to senate bill number."
      },
      {
        "Id": 8,
        "Title": "House Resolution Number",
        "SequenceNextNumber": 1,
        "SequenceNumberDescription": "Sequential numbers assigned to house resolution bill number."
      },
      {
        "Id": 9,
        "Title": "Senate Resolution Number",
        "SequenceNextNumber": 1,
        "SequenceNumberDescription": "Sequential numbers assigned to senate resolution bill number."
      },
      {
        "Id": 10,
        "Title": "House Enrolled Number",
        "SequenceNextNumber": 1,
        "SequenceNumberDescription": "Sequential numbers assigned to house enrolled bill number."
      },
      {
        "Id": 11,
        "Title": "Senate Enrolled Number",
        "SequenceNextNumber": 1,
        "SequenceNumberDescription": "Sequential numbers assigned to senate enrolled bill number."
      }
    ];
  }

  public getListItems(filter?: string, select?: string[], expand?: string[], orderBy?: string, ascending?: boolean, skip?: number, top?: number): Promise<ISequenceNumbers[]> {
    return new Promise<ISequenceNumbers[]>(resolve => {
      setTimeout(() => {
        if (McsUtil.isString(filter)) {
          let item: ISequenceNumbers = null;
          for (let i: number = 0; i < this.items.length; i++) {
            let elem: ISequenceNumbers = this.items[i];
            if (filter === "Title eq '" + elem.Title + "'") {
              item = elem;
              break;
            }
          }
          if (item != null) {
            resolve([item]);
          }
        } else {
          resolve(this.items);
        }
      }, 1000);
    });
  }
}