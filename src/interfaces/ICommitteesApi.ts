import { IListApi, ICommittee } from "./";

export interface ICommitteesApi extends IListApi<ICommittee> {
    getCommittees(year?: number): Promise<ICommittee[]>;
}