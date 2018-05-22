import { IListApi, ISessionLaws } from "../exports/interfaces";

export interface ISessionLawsApi extends IListApi<ISessionLaws> {
    createSessionLaw(sessionLaw: ISessionLaws, blob: Blob): Promise<ISessionLaws>;
    updateSessionLaw(sessionLaw: ISessionLaws, sessionLawProperty: ISessionLaws, blob: Blob, checkInComments?: string): Promise<ISessionLaws>;
}