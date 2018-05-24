import { IActionDefinition, IActionDefinitionApi } from "../../exports/interfaces";
import { MockBaseApi } from "./MockBaseApi";
import { Constants } from "../../configuration/constants";

export class MockActionDefinitionApi extends MockBaseApi<IActionDefinition> implements IActionDefinitionApi{
    constructor() {
        super();
        this.listTitle = Constants.Lists.ActionDefinition;
        this.useCaching = true;
    }

    public getActions(idList: number[]): Promise<IActionDefinition[]> {
        return new Promise<IActionDefinition[]>((resolve, reject) => {
            resolve([]);
        });
    }
}