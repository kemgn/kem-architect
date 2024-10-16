interface Label {
    id           : string;
    createTime   : Date;
    updateTime?  : Date;
    label        : string;
    description? : string;
    languageID   : string;
}


interface LabelAdded {
    added: LabelForCreate[];
}

interface LabelForCreate {
    LanguageID         : string;
    Description?       : string;
    Label?             : string;
}

interface LabelUpdated{
    updated: LabelForUpdate[]; 
    added?: LabelForCreate[];
}
interface LabelForUpdate{
    Id                 : string;
    LanguageID         : string;
    Label             : string;
    Description       : string;
}

interface LabelDeleted {
    deleted: LabelForDelete[];
}
interface LabelForDelete {
    Id                 : string;
}