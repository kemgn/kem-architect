import { AvailablePlatforms, SubjectSources, SubjectStatus, SubjectTypes } from "../Enums/Enums"

export interface Subject {
    displayName            : string
    displayText            : string
    emailAddress?          : string
    type                   : SubjectTypes
    sourceType             : SubjectSources
    samAccountName         : string
    domainName             : string
    isLocal                : boolean
    statusType             : SubjectStatus
    expireDate?            : Date
    availablePlatformsType : AvailablePlatforms
    firstLogonTime?        : Date
    lastLogonTime?         : Date
    isUser                 : boolean
    userPrincipalName      : string
    id                     : string
    createTime             : Date
    updateTime             : Date
    subjectReferenceId: string;
    password?: string;
    selfEnrollment              : boolean;
}   

export interface SubjectForCreate {
    displayName                 : string
    displayText                 : string
    emailAddress?               : string
    typeInt                     : number
    sourceTypeInt               : number
    samAccountName              : string
    domainName                  : string
    isLocal                     : boolean
    statusTypeInt               : number
    expireDate?                 : Date
    AvailablePlatformsTypeInt   : number
    firstLogonTime?             : Date
    lastLogonTime?              : Date
    isUser                      : boolean
    userPrincipalName           : string
    password?                   : string;
    selfEnrollment              : boolean;
}
export interface SubjectForUpdate {
    id  :                   string;
    displayName:            string;
    displayText:            string;
    emailAddress:           string;
    sourceType:             SubjectSources;
    samAccountName:         string;
    domainName:             string;
    isLocal:                boolean;
    statusType:             SubjectStatus;
    expireDate?:            Date;
    firstLogonTime?:        Date;
    lastLogonTime?:         Date;
    isUser:                 boolean;  
    userPrincipalName:      string;
    subjectReferenceId:     string;
    availablePlatformType:  AvailablePlatforms;
    password?: string;
}

export interface SubjectForDelete {
    id                 : string
}

export interface SubjectSearchQuery {
    query: string;
    searchType: SubjectSearchTypes;
    isUser?: boolean;
    allowWildCard: boolean;
    subjectSearchSources: SubjectSearchSources;
    saveLocalDB?: boolean;
}

export enum SubjectSearchTypes
{
    DisplayName,
    SamAccountName,
    EMail,
    PirincipalName
}
export enum SubjectSearchSources
{
    OnlyLocalDB         ,
    OnlyRemoteServices  ,
    All
}