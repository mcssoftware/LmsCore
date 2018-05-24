import { ListBaseApi } from "./ListBaseApi";
import { IDocumentItem, IDocumentLibraryApi } from "../../exports/interfaces";
import { FileAddResult, Item, ItemUpdateResult } from "sp-pnp-js";

export class DocumentLibraryApi extends ListBaseApi<IDocumentItem> implements IDocumentLibraryApi {
    constructor(listTitle: string) {
        super();
        this.listTitle = listTitle;
        this.useCaching = false;
    }

    public addOrUpdateDocument(fileName: string, propertiesToUpdate: IDocumentItem, blob: Blob): Promise<IDocumentItem> {
        return new Promise<IDocumentItem>((resolve, reject) => {
            this.getWeb().lists.getByTitle(this.listTitle)
                .rootFolder.files.add(fileName, blob, true)
                .then((fileAdded: FileAddResult) => {
                    fileAdded.file.getItem().then((item: Item) => {
                        item.update(propertiesToUpdate).then((value: ItemUpdateResult) => {
                            value.item.select(...this.getSelects()).expand(...this.getExpands()).get().then((documentItem: IDocumentItem) => {
                                resolve(documentItem);
                            }, (err) => { reject(err); });
                        }, (err) => { reject(err); });
                    }, (err) => { reject(err); });
                }, (err) => {
                    reject(err);
                });
        });
    }
}