// tslint:disable:typedef
// tslint:disable:variable-name
// tslint:disable:no-namespace
// tslint:disable:max-classes-per-file
export namespace Constants {
    export class Lists {
        public static ActionDefinition = "Action Definition";
        public static AdditionalDocument = "Additional Documents";
        public static AgencyContact = "Agency Contact";
        public static AllCommittee = "All Committee";
        public static AllLegislators = "All Legislators";
        public static MessageTemplates = "MessageTemplates";
        public static BillState = "Bill State";
        public static WorkflowDefinition = "Bill Workflow Definition";
        public static BillWorkflowDefinitionStepAction = "Bill Workflow Definition Step-Action";
        public static FiscalFund = "Fiscal Fund";
        public static FiscalSeries = "Fiscal Series";
        public static LMSTemplates = "LMSTemplates";
        public static LSOPersonnel = "LSOPersonnel";
        public static SubjectIndices = "SubjectIndices";
        public static Amendments = "Amendments";
        public static BillDigest = "Bill Digest";
        public static BillDocuments = "BillDocuments";
        public static BillDraftRequest = "Bill Draft Request";
        public static BillMessages = "BillMessages";
        public static Bills = "Bills";
        public static ElementsAffected = "Elements Affected";
        public static FiscalDocuments = "FiscalDocuments";
        public static JccMembers = "JccMembers";
        public static RollCall = "Roll Call";
        public static RollCallLegislatureVote = "RollCallLegislatureVote";
        public static SequenceNumbers = "Sequence Numbers";
        public static SessionLaws = "Session Laws";
        public static Tasks = "Tasks";
        public static TaskAction = "Task Action";
        public static LmsConfiguration = "WyLsoConfiguration";
    }

    export class Pages {
        public static AmendmentDesktop = "AmendmentDesktop";
        public static BillDraftRequest = "SitePages/BillDraftRequestForm.aspx";
        public static AssignChapterNumber = "SitePages/Assign Chapter Number.aspx";
        public static CreateSessionLawTask = "SitePages/Create Session Law.aspx";
        public static AssignDrafterTask = "";
        public static AssignEnrollNumber = "SitePages/AssignEnrollNumber.aspx";
        public static AssignFiscalAnalystTask = "SitePages/AssignFiscalAnalyst.aspx";
        public static BillProcessingTask = "SitePages/BillProcessingTask.aspx";
        public static BillTrackingTask = "SitePages/BillTracking.aspx";
        public static CreateEngrossedBillTask = "SitePages/CreateEngrossedBill.aspx";
        public static CreateEnrollBillTask = "";
        public static CreateFormalDraftTask = "SitePages/CreateFormalDraft.aspx";
        public static CreateNumberedBillTask = "SitePages/CreateNumberedBill.aspx";
        public static JccAssignment = "";
        public static BillIntroductionTask = "";
        public static UpdateDatabaseTask = "";
        public static SponsorApprovalTask = "SitePages/SponsorApproval.aspx";
        public static BillSummaryTask = "";
        public static DraftingDesktop = "SitePages/Drafting.aspx";
        public static UnassignedDrafts = "SitePages/UnassignedDrafts.aspx";
        public static FiscalImpactForm = "SitePages/FiscalImpactRequest.aspx";
        public static FiscalNoteForm = "SitePages/FiscalNote.aspx";
        public static FiscalDirectiveForm = "SitePages/FiscalNoteDirective.aspx";
        public static ElementsAffectedForm = "SitePages/ElementsAffected.aspx";
    }

    export enum SponsorType {
        Legislator = 1,
        Committee,
        Other,
    }

    export enum SequenceNumberType {
        BillMessageNumber = 1,
        HouseBillMessage,
        SenateBillMessage,
        LsoNumber,
        HouseBillNumber,
        SenateBillNumber,
        HouseResolutionNumber,
        SenateResolutionNumber,
        HouseEnrolledNumber,
        SenateEnrolledNumber,
    }

    export const serviceBaseUrl: string = "https://lsooffice365service20180227052111.azurewebsites.net/";

    export class ServiceUrl {
        public static CreateBill: string = serviceBaseUrl + "api/Lms/Bill/Generate";
        public static GetStatuteElements: string = serviceBaseUrl + "api/Lms/Statute/GetStatuteElements";
        public static InsertStatuteElements: string = serviceBaseUrl + "api/Lms/Statute/UpdateBill";
        public static CreateAmendment: string = serviceBaseUrl + "api/Lms/Amendment/Generate";
        public static CreateJccAmendment: string = serviceBaseUrl + "api/Lms/Amendment/GenerateJcc";
        public static ConvertToNumberedAmendment: string = serviceBaseUrl + "api/Lms/Amendment/ConvertToNumbered";
        public static UpdateAmendment: string = serviceBaseUrl + "api/Lms/Amendment/Update";
        public static SplitAmendment: string = serviceBaseUrl + "api/Lms/Amendment/Split";
        public static CreateSubstitute: string = serviceBaseUrl + "api/Lms/Bill/CreateSubstitute";
        public static CreateEnrolled: string = serviceBaseUrl + "api/Lms/Bill/CreateEnrolled";
        public static CreateEngrossed: string = serviceBaseUrl + "api/Lms/Bill/CreateEngrossed";
        public static ConvertToNumbered: string = serviceBaseUrl + "api/Lms/Bill/ConvertToNumbered";
        public static CreateSessionLaw: string = serviceBaseUrl + "api/Lms/SessionLaw/Generate";
        public static FiscalImpact: string = serviceBaseUrl + "api/FiscalImpacts";
        public static FiscalNote: string = serviceBaseUrl + "api/FiscalNotes";
        public static FiscalDirective: string = serviceBaseUrl + "api/FiscalDirectives";
        public static RollCall: string = serviceBaseUrl + "api/RollCalls";
        public static CalendarOrder: string = serviceBaseUrl + "api/CalendarOrders";
        public static FiscalNoteYear: string = serviceBaseUrl + "api/FiscalNoteYears";
        public static FiscalNoImpactDocument: string = serviceBaseUrl + "api/Lms/Fiscal/GetFiscalNoImpactDocument";
        public static FiscalImpactDocument: string = serviceBaseUrl + "api/Lms/Fiscal/GetFiscalImpactDocument";
    }

    export class LmsTemplates {
        public static EnrolledBillTemplateFileName: string = "LMSTemplates/EnrolledBillTemplate.docx";
        public static SessionLawTemplateFileName: string = "LMSTemplates/SessionLawTemplate.docx";
        public static SessionLawResolutionTemplateFileName: string = "LMSTemplates/SessionLawResolutionTemplate.docx";
        public static ApprovalAndAuthorization: string = "LMSTemplates/Approval and Authorization.docx";
        public static Co_sponsorTransmittalForm: string = "LMSTemplates/Co-sponsor Transmittal Form.docx";
        public static PrimeSponsorTransmittalForm: string = "LMSTemplates/Prime Sponsor Transmittal Form.docx";
        public static HeldPrimeSponsorTransmittalForm: string = "LMSTemplates/Held Green Sheet Prime Sponsor Transmittal Form.docx";
        public static SponsorNumberBillAcknowledgement: string = "LMSTemplates/Sponsor Number Bill Acknowledgement.docx";
        public static BillTitle: string = "LMSTemplates/Bill Title.docx";
        public static BillSummary: string = "LMSTemplates/BillSummary.docx";
        public static FiscalNoteTemplateFileName: string = "LMSTemplates/FiscalNote.docx";
        public static FiscalNoteNoImpactTemplateFileName: string = "LMSTemplates/FiscalNoteNoImpact.docx";
        public static MemoToSponsorTemplateFileName: string = "LMSTemplates/MemoToSponsor.docx";
        public static JccTemplateUrl: string = "LMSTemplates/Joint Conference Committee Report.docx";
        public static ProposedAmendmentTemplateUrl: string = "LMSTemplates/Proposed Amendment.docx";
    }
}
