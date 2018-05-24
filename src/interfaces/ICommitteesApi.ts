import { IListApi, ICommittee } from "../exports/interfaces";

export interface ICommitteesApi extends IListApi<ICommittee> {
    getCommittees(year?: number): Promise<ICommittee[]>;
}