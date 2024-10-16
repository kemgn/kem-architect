"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
// import { getCodeFn, initIdeFn, initializeDotnetWasm } from "./plugin"
import dynamic from "next/dynamic.js";
import Script from "next/script";

interface IDEContextType {
    isOpen: boolean;
    openIde: () => void;
    closeIde: () => void;
    getCode: () => string;
}

export const IDEContext = createContext<IDEContextType | null>(null);

interface IDEProviderProps {
    children: ReactNode;
}

export const IDEProvider = (props: IDEProviderProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen && window.initIdeFn) {
            window.initIdeFn({ SessionGUID: "", BaseUrl: "https://localhost:7164/" });
        }
    }, [isOpen]);

    const openIde = () => setIsOpen(true);
    const closeIde = () => setIsOpen(false);
    const getCode = () => {
        if (window.getIdeCodeFn) {
            return window.getIdeCodeFn();
        }
    }
    return (
        <IDEContext.Provider value={{ isOpen, openIde, closeIde, getCode }}>
            {props.children}
        </IDEContext.Provider>
    );
};
export const useIde = () => {
    const context = useContext(IDEContext);
    if (!context) {
        throw new Error("useIde must be used within an IdeProvider");
    }
    return context;
};