"use client";

import { ListRoot } from "@/models/Entities/List";
import { Module } from "@/models/Entities/Module";
import { Property } from "@/models/Entities/Property";
import { TreeRoot } from "@/models/Entities/Tree";
import { ListService } from "@/services/List";
import { ModulesService } from "@/services/Modules";
import { TreeService } from "@/services/Tree";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ArchitectDataContextProps {
    modules: Module[];
    lists: ListRoot[];
    trees: TreeRoot[];
    refreshModules: () => void;
}

export const ArchitectDataContext = createContext<ArchitectDataContextProps | undefined>(undefined);

export const ArchitectDataProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [modules, setModules] = useState<Module[]>([]);
    const [lists, setLists] = useState<ListRoot[]>([]);
    const [trees, setTrees] = useState<TreeRoot[]>([]);
    const refreshModules = () => {
        ModulesService.getAllModules().then(x => setModules(x));
    }
    useEffect(() => {
        refreshModules();
        const getAllModules = async () => {
            ListService.getListRoots().then(x => setLists(x.data))
            TreeService.getTreeRoots().then(x => setTrees(x))
        };
        getAllModules();
    }, [])
    return (
        <ArchitectDataContext.Provider value={{ modules, lists, trees, refreshModules }}>
            {children}
        </ArchitectDataContext.Provider>
    )
}