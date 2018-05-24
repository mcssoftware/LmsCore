import { ISubjectIndices } from "../../exports/interfaces";
import { Web } from "sp-pnp-js";
import { Constants } from "../../configuration/constants";
import { MockBaseApi } from "./MockBaseApi";

// tslint:disable
export class MockSubjectIndexApi extends MockBaseApi<ISubjectIndices> {
  constructor() {
    super();
    this.listTitle = Constants.Lists.SubjectIndices;
    this.useCaching = false;
  }

  public getItems(): ISubjectIndices[] {
      return [
        {
          "Id": 1,
          "Title": "001  Civil Procedure",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": null,
          "SubjectChapter": null,
          "SubjectTopic": "001  Civil Procedure"
        },
        {
          "Id": 2,
          "Title": "001-01  Civil Procedure : Civil Actions",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "01",
          "SubjectChapter": "Civil Actions",
          "SubjectTopic": "001-01  Civil Procedure : Civil Actions"
        },
        {
          "Id": 3,
          "Title": "001-02  Civil Procedure : Oaths",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "02",
          "SubjectChapter": "Oaths",
          "SubjectTopic": "001-02  Civil Procedure : Oaths"
        },
        {
          "Id": 4,
          "Title": "001-03  Civil Procedure : Statute of Limitations",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "03",
          "SubjectChapter": "Statute of Limitations",
          "SubjectTopic": "001-03  Civil Procedure : Statute of Limitations"
        },
        {
          "Id": 5,
          "Title": "001-04  Civil Procedure : Abatement and Survival",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "04",
          "SubjectChapter": "Abatement and Survival",
          "SubjectTopic": "001-04  Civil Procedure : Abatement and Survival"
        },
        {
          "Id": 6,
          "Title": "001-05  Civil Procedure : Venue",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "05",
          "SubjectChapter": "Venue",
          "SubjectTopic": "001-05  Civil Procedure : Venue"
        },
        {
          "Id": 7,
          "Title": "001-06  Civil Procedure : Process/Notice and Lis Pendens",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "06",
          "SubjectChapter": "Process/Notice and Lis Pendens",
          "SubjectTopic": "001-06  Civil Procedure : Process/Notice and Lis Pendens"
        },
        {
          "Id": 8,
          "Title": "001-07  Civil Procedure : Change of Venue",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "07",
          "SubjectChapter": "Change of Venue",
          "SubjectTopic": "001-07  Civil Procedure : Change of Venue"
        },
        {
          "Id": 9,
          "Title": "001-08  Civil Procedure : Time for Trial",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "08",
          "SubjectChapter": "Time for Trial",
          "SubjectTopic": "001-08  Civil Procedure : Time for Trial"
        },
        {
          "Id": 10,
          "Title": "001-09  Civil Procedure : Continuances",
          "SubjectTitleNumber": "001",
          "SubjectTitle": "Civil Procedure",
          "SubjectChapterNumber": "09",
          "SubjectChapter": "Continuances",
          "SubjectTopic": "001-09  Civil Procedure : Continuances"
        }
      ];
  }
}