import { ReactNode } from "react";

export interface Icon {
    id?:         string;
    image?:      string;
    systemName?:      string;
    resized?:    boolean;
    browseName?:  string;
}

export interface IconModalI  {
    iconmodal: ReactNode;
    setModal: React.Dispatch<React.SetStateAction<ReactNode>>;
    setIcons: React.Dispatch<React.SetStateAction<Icon[]>>;
    icons: Icon[];
    resizing: (image: string) => Promise<unknown>
}

export interface iconAndModal extends Icon , IconModalI {
    
}
