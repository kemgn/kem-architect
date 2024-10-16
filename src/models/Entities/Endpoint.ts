import { ReactNode, SetStateAction } from "react";
import { HTTPMethods, logType, loggerMode } from "../Enums/Enums";

export interface Endpoint {
    id:                 string;
    isActive:           boolean;
    systemName:         string;
    method:             HTTPMethods;
    description?:       string;
    useDefaultValues?:  boolean;
    logType:            logType;
    loggerMode:         loggerMode; 
    infix?:             string;
    postfix?:           string;
    Actions:            Actions;
}

export interface EndPointModalForCreate {
    modal:          ReactNode;
    setModal:       React.Dispatch<SetStateAction<ReactNode>>;
    endpoints:      Endpoint[];
    setEndpoints:   React.Dispatch<SetStateAction<Endpoint[]>>;
}

export interface EndPointModalForUpdate extends EndPointModalForCreate {
    endpoint?: Endpoint;
}

export type EndPointModalProps = EndPointModalForUpdate;