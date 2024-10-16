"use client";

import { LanguageService } from "@/services/Language";
import { ReactNode, createContext, useEffect, useState } from "react";

export const LanguagesContext = createContext<Language[] | undefined>([]);

export const LanguagesProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [languages, setLanguages] = useState<Language[]>();
    useEffect(() => {
        const getAllLanguages = async () => {
            LanguageService.getAllLanguages().then(x => setLanguages(x));
        };
        getAllLanguages();
    }, [])
    return (
        <LanguagesContext.Provider value={ languages }>
            {children}
        </LanguagesContext.Provider>
    )
}