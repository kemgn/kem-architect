"use client";

import { DataContract, DataContractProperty } from "@/models/Entities/DataContract";
import { createContext, useEffect, useState } from "react";

interface FormsContextProps {
    setSelectedForm: React.Dispatch<React.SetStateAction<DataContract | undefined>>;
    selectedForm: DataContract | undefined;
}

export const FormsContext = createContext<FormsContextProps | undefined>(undefined);

export const FormsProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [selectedForm, setSelectedForm] = useState<DataContract | undefined>();

    useEffect(() => {
    
    }, [])

    return (
        <FormsContext.Provider value={{ selectedForm, setSelectedForm }}>
            {children}
        </FormsContext.Provider>
    )
}