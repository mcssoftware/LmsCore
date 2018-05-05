import { IContentTypeId } from ".";

export interface IList {
    AllowContentTypes: boolean;
    BaseTemplate: number;
    BaseType: number;
    ContentTypesEnabled: boolean;
    Description: string;
    DocumentTemplateUrl: string;
    EnableMinorVersions: boolean;
    EnableVersionin: boolean;
    EntityTypeName: string;
    Id: string;
    Title: string;
    RootFolder: IFolder;
    Fields?: IField[];
}

export interface IFolder {
    IsWOPIEnabled: boolean;
    Name: string;
    ServerRelativeUrl: string;
}

export interface IView {
    Aggregations: string;
    AggregationsStatus: string;
    BaseViewId: string;
    ContentTypeId: IContentTypeId;
    CustomFormatter?: any;
    DefaultView: boolean;
    DefaultViewForContentType: boolean;
    EditorModified: boolean;
    Formats?: any;
    Hidden: boolean;
    HtmlSchemaXml: string;
    Id: string;
    ImageUrl: string;
    IncludeRootFolder: boolean;
    ViewJoins?: any;
    JSLink: string;
    ListViewXml: string;
    Method?: any;
    MobileDefaultView: boolean;
    MobileView: boolean;
    ModerationType?: any;
    OrderedView: boolean;
    Paged: boolean;
    PersonalView: boolean;
    ViewProjectedFields?: any;
    ViewQuery: string;
    ReadOnlyView: boolean;
    RequiresClientIntegration: boolean;
    RowLimit: number;
    Scope: number;
    ServerRelativeUrl: string;
    TabularView: boolean;
    Threaded: boolean;
    Title: string;
    Toolbar: string;
    ToolbarTemplateName: string;
    ViewType: string;
    ViewData: string;
    VisualizationInfo?: any;
}

export interface IField {
    // AutoIndexed: boolean;
    // CanBeDeleted: boolean;
    // ClientSideComponentId: string;
    // ClientSideComponentProperties?: any;
    // CustomFormatter?: any;
    // DefaultFormula?: any;
    // DefaultValue?: any;
    // Description: string;
    // Direction: string;
    // EnforceUniqueValues: boolean;
    // EntityPropertyName: string;
    // Filterable: boolean;
    // FromBaseType: boolean;
    // Group: string;
    // Hidden: boolean;
    Id: string;
    // Indexed: boolean;
    InternalName: string;
    // JSLink: string;
    // PinnedToFiltersPane: boolean;
    // ReadOnlyField: boolean;
    // Required: boolean;
    // SchemaXml: string;
    // Scope: string;
    // Sealed: boolean;
    // ShowInFiltersPane: number;
    Sortable: boolean;
    // StaticName: string;
    Title: string;
    // FieldTypeKind: number;
    TypeAsString: string;
    // TypeDisplayName: string;
    // TypeShortDescription: string;
    // ValidationFormula?: any;
    // ValidationMessage?: any;
    // AllowHyperlink?: boolean;
    // AppendOnly?: boolean;
    // NumberOfLines?: number;
    // RestrictedMode?: boolean;
    // RichText?: boolean;
    // UnlimitedLengthInDocumentLibrary?: boolean;
    // WikiLinking?: boolean;
    IsDependentLookup?: boolean;
    LookupField?: string;
    PrimaryFieldId?: string;
}

export interface IListSelection {
    Id: string;
    BaseTemplate: number;
    BaseType: number;
    Title: string;
    searchField: string;
    fieldType: string;
}