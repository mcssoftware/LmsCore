
interface ISpDependency {
    key: string;
    file: string;
    namespace: string;
    dependency?: string[];
}

interface IUserItem {
    Id: number;
    Title: string;
    EMail: string;
}

interface IDictionary<T> {
    key: string;
    value: T[];
}

export {
    ISpDependency, IUserItem, IDictionary,
};
