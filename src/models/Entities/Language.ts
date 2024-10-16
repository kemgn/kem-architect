interface LanguageForCreate {
    name         : string;
    abbreviation : string;
    cultureName  : string;
}

interface LanguageForUpdate {
    id          : string ;
    abbreviation: string ;
    cultureName : string ;
} 

interface LanguageForDelete {
    id          : string;
}

interface Language {
    id                 : string;
    createTime         : Date  ;
    updateTime        ?: Date  ;
    name               : string;
    abbreviation       : string;
    cultureName        : string;
    languageReferenceId: string;
 }