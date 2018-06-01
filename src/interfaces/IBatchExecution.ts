export interface IBatchExecution {
    result: any;
    error: any;
}

export interface IBatchCreationData extends IBatchExecution {
    item: any;
}

export interface IBatchUpdateData extends IBatchExecution {
    Id: number;
    itemEntityType: string;
    item: any;
}

export interface IBatchDeleteData extends IBatchExecution {
    Id: number;
}