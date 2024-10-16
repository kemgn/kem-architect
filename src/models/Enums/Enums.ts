export enum SortOptionsBy {
    TimeCreated,
    Weight,
    Threshold,
    Manual,
    ListRootSetting
}
export enum RenderStyle {
    PlainText = 0,
    ColoredText = 1,
    PlainBoldText = 2,
    ColoredBoldText = 3,
    BoxPlainText = 4,
    BoxColoredText = 5,
    BoxPlainBoldText = 6,
    BoxColoredBoldText = 7,
    FillPlainText = 8,
    FillColoredText = 9,
    FillPlainBoldText = 10,
    FillColoredBoldText = 11,
    UseListOptionSettings = -1,
}

export enum ProfileMemberType {
    Subject,
    Group,
    Profile,
    Property,
}

export enum GroupMemberType {
    Subject,
    Group,
}

export enum SelectedInputEnum {
    User,
    Group,
    Property,
    Profile,
}

export enum HTTPMethods {
    GET,
    POST,
    DELETE,
    PATCH,
    PUT,

}

export enum logType {
    Unified,
    Seperated
}

export enum loggerMode {
    Default,
    Full,
    Off,
    Standard,
}

export enum Actions {
    Main,
    OnAfterSave,
    OnError
}

export enum AvailablePlatforms {
    None = 0,
    Web = 1,
    Api = 2
}

export enum SubjectTypes {
    user = 0,
    group = 1,
    iMSGroup = 2,
    property = 3,
    profile = 4,
}

export enum SubjectStatus {
    active = 0,
    passive = 1,
    premature = 2,
    prematureBlocked = 3,
}


export enum SubjectSources {
    None = 0,
    IMS = 1,
    ActiveDirectory = 2,
    Local = 3,
    AzureAD = 4
}

export enum alertSeverity {
    error = 'error',
    success = 'success',
    info = 'info',
    warning = 'warning'
}

export enum alertVariant {
    standard = 'standard',
    outlined = 'outlined',
    filled = 'filled'
}

export enum IgnoreDisabledUsers {
    InheritSystemSetting,
    Enable,
    Disable,
}

export enum SelectionPreference {
    UserOrGroup,
    UserOnly,
    GroupOnly,
}

export enum SubjectDisplayMode {
    DisplayName = 0,
    DisplayNameAndAccountName = 1,
    DisplayNameAndDomainAndAccountName = 2,
    DisplayNameAndEmail = 3
}

export enum HistoryLogPlacementMode
{
    DoNotShow = 0,
    AddButton = 1,
    AddContent = 2,
}

export enum ColumSummaryFunction {
    None = 0,
    CountNoneEmpty = 1,
    CountEmpty = 2,
    TotalRecords = 3,
    Avg = 4,
    Sum = 5,
    Min = 6,
    Max = 7,
}