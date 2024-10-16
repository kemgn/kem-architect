interface ValueUnitType{
    id                       : string;
    createTime?              : Date;
    updateTime?              : Date;
    description?             : string;
    isCustomizable           : boolean;
    isSystem                 : boolean;
    isLabelsCustomizable     : boolean;
    isExtendable             : boolean;
    valueUnits               : ValueUnit[]; 
    labels?                  : Label[];     
}

interface ValueUnitTypeForCreate {
    description?        : string;
    isCustomizable      : boolean;
    isLabelsCustomizable: boolean;
    isSystem            : boolean;
    isExtendable        : boolean;
    labels             ?: LabelForCreate[];
}



///
interface ValueUnitForUpdate {

    id                  : string;
    isCustomizable      : boolean;
    isSystem            : boolean;
    isLabelsCustomizable: boolean;
    isExtendable        : boolean;
    labels             ?: LabelUpdated;
}

interface ValueUnitForDelete {
    id                  : string;  
}
//bura
 interface ValueUnit{
     id                       : string;
     createTime?              : Date;
     updateTime?              : Date;
     //systemName               : string;
     description?             : string;
     isCustomizable           : boolean;
     isSystem                 : boolean;
     isLabelsCustomizable     : boolean;
     valueUnitTypeReferenceId : string;
     labels?                  : Label[];
 }

 interface ValueUnitForCreate {
    valueUnitTypeId     ? : string;
    //systemName           : string;
    description         ?: string;
    isCustomizable       : boolean;
    isSystem             : boolean;
    isLabelsCustomizable : boolean;
    labels?              : LabelForCreate[];
}
interface ValueUnitTypeForUpdate {
    id                   : string;
    description         ?: string;
    isCustomizable       : boolean;
    isSystem             : boolean;
    isLabelsCustomizable : boolean;
    isExtendable         : boolean;
    valueUnits?          : ValueUnit[];  
    labels?              : LabelUpdated;
}


interface ValueUnitTypeForDelete {
    id                   : string;
}


