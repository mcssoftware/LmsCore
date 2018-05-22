import { ILmsConfigurationApi } from "../interfaces/ILmsConfigurationApi";
import { IListApi } from "../interfaces/IListApi";
import { IBillDraftRequest, ISequenceNumbers, IReportDefinition, IDocumentItem } from "../interfaces/ListDefinitions";
import { ILmsTaskApi } from "../interfaces/ILmsTaskApi";
import { IBillApi } from "../interfaces/IBillApi";
import { IWorkflowDefinitionApi } from "../interfaces/IWorkflowDefinitionApi";
import { ILegislatorsApi } from "../interfaces/ILegislatorsApi";
import { ICommitteesApi } from "../interfaces/ICommitteesApi";
import { IElementsAffectedApi } from "../interfaces/IElementsAffectedApi";

import {
    IActionDefinitionApi,
    IWorkflowStepActionApi,
    IAmendmentApi,
    IBillDigestApi,
    ITaskAction,
    IRollCall,
    IBillState,
    ISessionLaws,
    ISessionLawsApi,
} from "../exports/interfaces";

import { MockLmsConfigurationApi } from "./Mock/MockLmsConfigurationApi";
import { LmsConfigurationApi } from "./Lists/LmsConfigurationApi";
import { MockBillDraftApi } from "./Mock/MockBillDraftApi";
import { BillDraftApi } from "./Lists/BillDraftApi";
import { MockBillApi } from "./Mock/MockBillApi";
import { BillApi } from "./Lists/BillApi";
import { MockLmsTaskApi } from "./Mock/MockLmsTaskApi";
import { LmsTaskApi } from "./Lists/LmsTaskApi";
import { WorkflowDefinitionApi } from "./Lists/WorkflowDefinitionApi";
import { MockWorkflowDefinitionApi } from "./Mock/MockWorkflowDefinitionApi";
import { MockSequenceNumbersApi } from "./Mock/MockSequenceNumbersApi";
import { SequenceNumbersApi } from "./Lists/SequenceNumbersApi";
import { MockElementsAffectedApi } from "./Mock/MockElementsAffectedApi";
import { ElementsAffectedApi } from "./Lists/ElementsAffectedApi";

import { ActionDefinitionApi } from "./Lists/ActionDefinitionApi";
import { MockActionDefinitionApi } from "./Mock/MockActionDefinitionApi";
import { WorkflowStepActionApi } from "./Lists/WorkflowStepActionApi";
import { MockWorkflowStepActionApi } from "./Mock/MockWorkflowStepActionApi";
import { MockAmendmentApi } from "./Mock/MockAmendmentApi";
import { AmendmentApi } from "./Lists/AmendmentApi";
import { BillDigestApi } from "./Lists/BillDigestApi";
import { MockBillDigestApi } from "./Mock/MockBillDigestApi";
import { MockLmsTaskActionApi } from "./Mock/MockLmsTaskActionApi";
import { LmsTaskActionApi } from "./Lists/LmsTaskActionApi";
import { RollCallApi } from "./Lists/RollCallApi";
import { MockRollCallApi } from "./Mock/MockRollCallApi";
import { MockLegislatorsApi } from "./Mock/MockLegislatorsApi";
import { LegislatorsApi } from "./Lists/LegislatorsApi";
import { CommitteesApi } from "./Lists/CommitteesApi";
import { MockCommitteesApi } from "./Mock/MockCommitteesApi";
import { ListBaseApi } from "./Lists/ListBaseApi";
import { SessionLawsApi } from "./Lists/SessionLawsApi";
import { ReportDefinitionApi } from "./Lists/ReportDefinitionApi";
import { IRollCallApi } from "../interfaces/IRollCallApi";
import { DocumentLibraryApi } from "./Lists/DocumentLibraryApi";

export class ApiHelper {
    public getConfigurationApi(isLocalEnvironment: boolean): ILmsConfigurationApi {
        return isLocalEnvironment ? MockLmsConfigurationApi.getInstance() : LmsConfigurationApi.getInstance();
    }

    public getBillDraftApi(isLocalEnvironment: boolean): IListApi<IBillDraftRequest> {
        return isLocalEnvironment ? new MockBillDraftApi() : new BillDraftApi();
    }

    public getBillsApi(isLocalEnvironment: boolean): IBillApi {
        return isLocalEnvironment ? new MockBillApi() : new BillApi();
    }

    public getLmsTaskApi(isLocalEnvironment: boolean): ILmsTaskApi {
        return isLocalEnvironment ? new MockLmsTaskApi() : new LmsTaskApi();
    }

    public getWorkflowDefinitionApi(isLocalEnvironment: boolean): IWorkflowDefinitionApi {
        return isLocalEnvironment ? new MockWorkflowDefinitionApi() : new WorkflowDefinitionApi();
    }

    public getSequenceNumberApi(isLocalEnvironment: boolean): IListApi<ISequenceNumbers> {
        return isLocalEnvironment ? new MockSequenceNumbersApi() : new SequenceNumbersApi();
    }

    public getElementsAffectedApi(isLocalEnvironment: boolean): IElementsAffectedApi {
        return isLocalEnvironment ? new MockElementsAffectedApi() : new ElementsAffectedApi();
    }

    public getActionDefinitionApi(isLocalEnvironment: boolean): IActionDefinitionApi {
        return isLocalEnvironment ? new MockActionDefinitionApi() : new ActionDefinitionApi();
    }

    public getWorkflowStepActionApi(isLocalEnvironment: boolean): IWorkflowStepActionApi {
        return isLocalEnvironment ? new MockWorkflowStepActionApi() : new WorkflowStepActionApi();
    }

    public getAmendmentApi(isLocalEnvironment: boolean): IAmendmentApi {
        return isLocalEnvironment ? new MockAmendmentApi() : new AmendmentApi();
    }

    public getBillDigestApi(isLocalEnvironment: boolean): IBillDigestApi {
        return isLocalEnvironment ? new MockBillDigestApi() : new BillDigestApi();
    }

    public getTaskActionApi(isLocalEnvironment: boolean): IListApi<ITaskAction> {
        return isLocalEnvironment ? new MockLmsTaskActionApi() : new LmsTaskActionApi();
    }

    public getRollCallApi(isLocalEnvironment: boolean): IRollCallApi {
        return new RollCallApi();
    }

    public getLegislatorApi(isLocalEnvironment: boolean): ILegislatorsApi {
        return isLocalEnvironment ? new MockLegislatorsApi() : new LegislatorsApi();
    }

    public getCommitteeApi(isLocalEnvironment: boolean): ICommitteesApi {
        return isLocalEnvironment ? new MockCommitteesApi() : new CommitteesApi();
    }

    public getSessionLawsApi(isLocalEnvironment: boolean): ISessionLawsApi {
        return new SessionLawsApi();
    }

    public getReportDefinitionApi(isLocalEnvironment: boolean): IListApi<IReportDefinition> {
        return new ReportDefinitionApi();
    }

    public getDocumentLibraryApi(listTitle: string): ListBaseApi<IDocumentItem> {
        return new DocumentLibraryApi(listTitle);
    }
}

export let apiHelper: ApiHelper = new ApiHelper();
