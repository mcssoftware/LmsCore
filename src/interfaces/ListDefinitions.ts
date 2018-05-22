export interface IUser {
    Id: number;
    Title: string;
    EMail: string;
}

export interface IFile {
    CheckInComment: string;
    CheckOutType: number;
    ETag: string;
    Exists: boolean;
    IrmEnabled: boolean;
    Length: string;
    Level: number;
    LinkingUrl: string;
    MajorVersion: number;
    MinorVersion: number;
    Name: string;
    ServerRelativeUrl: string;
    Title: string;
    UIVersion: number;
    UIVersionLabel: string;
    UniqueId: string;
}

export interface IContentTypeId {
    StringValue: string;
}

export interface IContentType {
    Id: IContentTypeId;
    StringId: string;
    Name: string;
    DisplayFormUrl: string;
    DocumentTemplate: string;
    DocumentTemplateUrl: string;
}

export interface IListItem {
    Id?: number;
    Title: string;
    AuthorId?: number;
    ContentType?: IContentType;
    ContentTypeId?: string;
    Created?: string | Date;
    Modified?: string | Date;
    Editor?: IUser;
    "odata.etag"?: string;
    "odata.type"?: string;
}

export interface IDocumentItem extends IListItem {
    File?: IFile;
}

export interface ILmsItemConfiguration extends IListItem {
    Value: string;
}

export interface ISessionLaws extends IDocumentItem {
    BillLookupId: number;
    BillNumber: string;
    LSONumber: string;
    // SessionDetail: string;
    ApprovedDate: string | Date;
}

export interface ILmsConfiguration {
    BillYear: string;
    LegislatureName: string;
    HouseChiefClerkName: string;
    SenateChiefClerkName: string;
    HouseSalutation: string;
    SenateSalutation: string;
    HouseChamberName: string;
    SenateChamberName: string;
    HouseLeaderTitle: string;
    SenateLeaderTitle: string;
    HouseBillName: string;
    SenateBillName: string;
    BillDrafterGroup: string;
    CurrentLegislature: string;
    CurrentSessionTitle: string;
    FiscalAnalystGroupName: string;
    ExtranetUrl: string;
    BillDraftRequestEmail: string;
}

export interface IBillDraftRequest extends IListItem {
    BillDisclosed: string;
    CatchTitle: string;
    ContactPerson: string;
    CoSponsor?: string;
    CoSponsorType: string;
    DateReceived: string | Date;
    DrafterId: number;
    Drafter?: IUser;
    DraftingInstructions: string;
    DraftReceivedBy: string;
    HasFiscalImpact: string;
    HouseofOrigin: string;
    InfoReceivedMethod: string;
    LegislationType: string;
    LSONumber: string;
    LSOResearchRequestNumber: string;
    PrimeSponsorshipClause: string;
    ReleaseBill: string;
    Requestor: string;
    RequestorType: string;
    ResurrectBillCatchTitle?: string;
    ResurrectBillVersion?: string;
    ResurrectBillYear?: string;
    ResurrectLsoNumber?: string;
    ResurrectRelatedAmendments?: string;
    ResurrectSponsor?: string;
    RevenueRaising?: boolean;
    RevenueRaisingDate?: string | Date;
    Sponsor: string;
    SponsorshipClause: string;
    SponsorTitle: string;
    SponsorType: string;
}

export interface IBills extends IDocumentItem {
    BillDisclosed: string;
    BillEffectiveDate: string | Date;
    BillNumber: string;
    BillStatus: string;
    BillTitle: string;
    BillType: string;
    BillYear: string;
    CatchTitle: string;
    ChapterNumber: string;
    ChapterSignedOn: string | Date;
    ContactPerson: string;
    CoSponsor: string;
    DateReceived: string | Date;
    DocumentStatus: string;
    DocumentVersion: number;
    DrafterId: number;
    Drafter?: IUser;
    EnrolledNumber: string;
    FiscalAnalystUserId: number;
    FiscalAnalystUser?: IUser;
    HasFiscalImpact: string;
    HouseAmendments: boolean;
    HouseofOrigin: string;
    LegislationType: string;
    LSONumber: string;
    ReleaseBill: string;
    Requestor: string;
    RevenueRaising: boolean;
    RevenueRaisingDate: string | Date;
    SenateAmendments: boolean;
    Sponsor: string;
    SponsorshipClause: string;
    SponsorTitle: string;
    SubstituteNumber: number;
    CheckoutUser?: IUser;
}

export interface IMultipleLookupField {
    results: number[];
}

export interface ITasks extends IListItem {
    AssignedToId: number;
    AssignedTo?: IUser;
    BillLookupId?: number;
    BillLookup?: IBills;
    Body: string;
    Comments?: string;
    CommentsFromPreviousTask?: string;
    DueDate?: string | Date;
    HasChildren?: boolean;
    IsChildren?: boolean;
    LmsTaskType: string;
    ParentLookupId?: number;
    ParentLookup?: IListItem;
    PercentComplete?: number;
    PredecessorsId?: IMultipleLookupField;
    Predecessors?: IListItem;
    PreviouslyAssignedToStringId?: string[];
    Priority?: string;
    StartDate: string | Date;
    Status: string;
    WorkflowStepNumber: number;
    StepType: string;
    TaskProperties?: string;
    WorkflowStep?: IWorkflowDefinition;
}

export interface ILegislator extends IListItem {
    BillYear: string;
    CanSponsor: boolean;
    Chamber: string;
    County: string;
    EMail: string;
    LegislatorID: string;
    LegislatureDisplayName: string;
    LegislatureLoginId: string;
    LegislatureName: string;
    NotificationPreference: string;
    Party: string;
    SponsorAddressLine1: string;
    SponsorAddressLine2: string;
    WorkCity: string;
    WorkState: string;
    WorkZip: string;
}

export interface ICommittee extends IListItem {
    AllLegislatorLookupLegislatorNamId?: number;
    AllLegislatorLookupLegislatorNam?: IListItem;
    BillYear: string;
    CanCoSponsor: boolean;
    CanCreateAmendments: boolean;
    CanSponsor: boolean;
    CommitteeDisplayTitle: string;
    CommitteeShortName: string;
}

export interface ISequenceNumbers extends IListItem {
    SequenceNextNumber: number;
    SequenceNumberDescription: string;
}

export interface IWorkflowDefinition extends IListItem {
    ActionRequired: boolean;
    AllowBatchCompletion: boolean;
    AllowInCalendar: boolean;
    AssignedToId: number;
    AssignedTo?: IUser;
    AssignmentFilterId: number;
    AssignmentFilter?: IUser;
    AutoComplete: boolean;
    BillDigestReportable: boolean;
    BillStatusReportable: boolean;
    Chamber: string;
    ChildSteps: string;
    CommitteeID: number;
    CutoffDate: string | Date;
    Instructions: string;
    LmsTaskType: string;
    LookupBillMessageDefaultId: number;
    LookupBillMessageDefault?: IListItem;
    LookupBillMessageFailedId: number;
    LookupBillMessageFailed?: IListItem;
    LookupBillMessagePassedId: number;
    LookupBillMessagePassed?: IListItem;
    LookupBillMessagePassedAltAmendeId: number;
    LookupBillMessagePassedAltAmende?: IListItem;
    LookupBillMessagePassedSameAmendId: number;
    LookupBillMessagePassedSameAmend?: IListItem;
    LookupBillStateTitle?: IListItem;
    OnApproveNext: string;
    OppositeChamberCutOffDate: string | Date;
    ReminderTasks: string;
    Step: number;
    StepShortTitle: string;
    StepTitle: string;
    StepType: string;
    WorkflowBillStatus: string;
}

export interface ISubjectIndices extends IListItem {
    SubjectChapter: string;
    SubjectChapterNumber: string;
    SubjectTitle: string;
    SubjectTitleNumber: string;
    SubjectTopic: string;
}

export interface IElementsAffected extends IListItem {
    BillLookupId: number;
    BillLookup?: IListItem;
    DuplicateElement: boolean;
    ElementApplied: boolean;
    ElementType: string;
    Intro: boolean;
    NewElementNumber: string;
    NewElementNumberDbFormat: string;
}

export interface IActionDefinition extends IListItem {
    ActionDescription: string;
    ActionDisposition: string;
    ActionName: string;
    ActionShortDescription: string;
    AmendmentRequired: boolean;
    BillDigestReportable: boolean;
    BillStatusReportable: boolean;
    CommitteeVoteIDRequired: boolean;
    VoteIdRequired: boolean;
}

export interface IWorkflowDefinitionStepAction extends IListItem {
    LookupActionDefinitionActionNameId: number;
    LookupActionDefinitionActionName?: IListItem;
    LookupBillWorkflowDefinitionStepId: number;
    LookupBillWorkflowDefinitionStep?: IListItem;
}

export interface ITaskAction extends IListItem {
    ActionDate: string | Date;
    ActionLookupId: number;
    AmendmentLookupId?: number;
    AmendmentLookup?: IAmendments;
    BillLookupId: number;
    BillLookup?: IBills;
    BillStatusMessage: string;
    TaskLookupId: number;
    TaskLookup?: IListItem;
    ActionDisposition: string;
    VoteID?: string;
}

export interface IBillDigest extends IListItem {
    AmendmentLookupId?: number;
    AmendmentLookup?: IListItem;
    BillDigestReportable: boolean;
    BillLookupId: number;
    BillLookup?: IListItem;
    BillStatusReportable: boolean;
    Duplicate: boolean;
    Message: string;
    StatusDate: string | Date;
    TaskActionLookupId?: number;
    TaskActionLookup?: IListItem;
    TaskLookupId: number;
    TaskLookup?: IListItem;
    VoteID?: string;
}

export interface IAmendments extends IDocumentItem {
    AmendmentNumber: string;
    AmendmentStatus: string;
    AppliedToEngrossed: boolean;
    BillLookupId?: number;
    BillLookup?: IListItem;
    CoSponsor?: string;
    DrafterId: number;
    Drafter?: IUser;
    IsCorrectedCopy: boolean;
    IsCorrectedToCorrectedCopy: boolean;
    IsDividedAmendment: boolean;
    PostedAction?: string;
    ProposedAmendmentNumber?: string;
    Requestor: string;
    RequestorType: string;
    ResurrectRelatedAmendments?: string;
    Sponsor: string;
    SponsorType: string;
}

export interface IAdditionalDocuments extends IDocumentItem {
    BillEffectiveDate_RO: string | Date;
    BillLookupId: number;
    BillLookup?: IListItem;
    BillNumber_RO: string;
    CatchTitle_RO: string;
    ChapterNumber_RO: string;
    Drafter_RO: string;
    EnrolledNumber_RO: string;
    LSONumber_RO: string;
    Sponsor_RO: string;
}

export interface IBillDocuments extends IDocumentItem {
    BillLookupId: number;
    BillLookup?: IListItem;
    IsLegalMemo: boolean;
}

export interface IBillMessages extends IDocumentItem {
    BillLookupId: number;
    BillLookup?: IListItem;
    Chamber?: string;
    OriginatingTaskIdId: number;
    OriginatingTaskId?: IListItem;
    Printed: string | Date;
}

export interface IFiscalDocuments extends IDocumentItem {
    BillLookupId: number;
    BillLookup?: IListItem;
    IsAdministrativeFiscalImpactDocument: boolean;
    IsFiscalMemo: boolean;
}

export interface IRollCall extends IListItem {
    VoteId: number;
    BillId: number;
    Chamber: string;
    YesVotes: number;
    NoVotes: number;
    AbsentVotes: number;
    ConflictVotes: number;
    ExcusedVotes: number;
    CommitteeId: string;
    CommitteeName?: any;
    // BillLookupId: number;
    BillNumber: string;
    AmendmentNumber?: string;
    Year: number;
}

export interface IJccMembers extends IListItem {
    BillLookupId: number;
    BillLookup?: IListItem;
    CommitteeID: string;
    LegislatureRollCallName?: string;
}

export interface IBillState extends IListItem {
    FileSystemObjectType: number;
}

export interface IAgencyContact extends IListItem {
    AgencyContactName: string;
    AgencyName: string;
    EMail: string;
    IsAgencyDirector: boolean;
    LSOFunction: string;
    WorkAddress: string;
    WorkCity: string;
    WorkFax: string;
    WorkPhone: string;
    WorkState: string;
    WorkZip: string;
}

export interface IFiscalFund extends IListItem {
    FiscalFundDescription: string;
}

export interface IFiscalSeries extends IListItem {
    FiscalSeriesDescription: string;
}
export enum JccAmendType {
    Adopt = 1,
    Delete,
    Amend,
}

export interface IAmendmentEntity extends IAmendments {
    Disposition: string;
    Chamber: string;
    amendType: JccAmendType;
}

export interface IReportDefinition extends IListItem {
    ReportDefinition: string;
}