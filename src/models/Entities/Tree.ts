import { ReactNode, SetStateAction } from "react";

export interface TreeRoot {
    id                  : string;
    createTime?         : Date;
    updateTime?         : Date;
    systemName          : string;
    isSystem            : boolean;
    isCustomizable      : boolean;
    isExtendable        : boolean;
    isLabelCustomizable : boolean;
    description?        : string;
    nodeUIs?            : TreeNode[];
    labels?             : Label[];
    treeReferenceId?    : string;
}

export interface TreeRootCreate {
    systemName?          : string;
    isSystem?            : boolean;
    isCustomizable?      : boolean;
    isExtendable?        : boolean;
    isLabelCustomizable? : boolean;
    description?         : string;
    labels?              : LabelForCreate[];
}
export interface TreeRootUpdate {
    id                   : string;
    systemName?          : string;
    isSystem?            : boolean;
    isCustomizable?      : boolean;
    isExtendable?        : boolean;
    isLabelCustomizable? : boolean;
    description?         : string;
    labels?              : LabelUpdated;
}

export interface TreeRootModalProps {
    setModal             : React.Dispatch<SetStateAction<ReactNode>>;
    modal                : ReactNode;
    treeRoots            : TreeRoot[];
    setTreeRoots         : React.Dispatch<SetStateAction<TreeRoot[]>>;
    id?                  : string;
    createTime?          : Date;
    updateTime?          : Date;
    systemName?          : string;
    isSystem?            : boolean;
    IsCustomizable?      : boolean;
    isExtendable?        : boolean;
    isLabelCustomizable? : boolean;
    description?         : string;
    nodeUIs?             : TreeNode[];
    labels?              : Label[];
    treeReferenceId?     : string;
}

export interface TreeNode {
    id                  : string;
    createTime?         : Date;
    updateTime?         : Date;
    systemName          : string;
    weight?             : number;
    isCustomizable      : boolean;
    isLabelCustomizable : boolean;
    isSystem            : boolean;
    labels?             : Label[];
    nodeUIs?            : TreeNode[];      
    nodeReferenceId     : string;       
    Hierarchy?          : string[];
}

export interface TreeNodeModalProps {
    setProcessFinished   : React.Dispatch<SetStateAction<boolean>>;
    setTreeRoots         : React.Dispatch<SetStateAction<TreeRoot[]>>;
    rootId?              : string;
    setModal             : React.Dispatch<SetStateAction<ReactNode>>;
    modal                : ReactNode;
    nodes                : TreeNode[];
    setNodes             : React.Dispatch<SetStateAction<TreeNode[]>>;
    id?                  : string;
    weight?              : number;
    systemName?          : string;
    isSystem?            : boolean;
    IsCustomizable?      : boolean;
    isLabelCustomizable? : boolean;
    nodeUIs?             : TreeNode[];
    labels?              : Label[];
    nodeReferenceId?     : string;
    createTime?          : Date;
    updateTime?          : Date;
}

export interface NodeCreate {
    systemName           : string;
    weight               : number;
    isSystem             : boolean;
    isCustomizable       : boolean;
    isLabelCustomizable  : boolean;
    labels?              : LabelForCreate[];
}

export interface NodeUpdate {
    id                   : string;
    systemName           : string;
    weight               : number;
    isSystem             : boolean;
    isCustomizable       : boolean;
    isLabelCustomizable  : boolean;
    labels?              : LabelUpdated;
}
