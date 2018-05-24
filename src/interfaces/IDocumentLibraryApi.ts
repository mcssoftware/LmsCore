import { IDocumentItem } from "./ListDefinitions";
import { IListApi } from "./IListApi";

export interface IDocumentLibraryApi extends IListApi<IDocumentItem>{
    addOrUpdateDocument(fileName: string, propertiesToUpdate: IDocumentItem, blob: Blob): Promise<IDocumentItem>;
}