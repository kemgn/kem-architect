"use client";

import { RemoteFilter } from "@/models/Entities/RemoteFilter";
import { DataContract, DataContractForUpdate, DataContractProperty, DataContractUIPropertiesForUpdate } from "@/models/Entities/DataContract";
import { DataContractService } from "@/services/DataContract";
import { createContext, useEffect, useState } from "react";
import { RemoteSort } from "@/models/Entities/RemoteSort";

interface DataContractsContextProps {
    formDataContracts: DataContractForUpdate[] | undefined;
    viewDataContracts: DataContractForUpdate[] | undefined;
    setViewDataContracts: React.Dispatch<React.SetStateAction<DataContractForUpdate[] | undefined>>;
    setFormDataContracts: React.Dispatch<React.SetStateAction<DataContractForUpdate[] | undefined>>;
    selectedView: DataContract | undefined;
    setSelectedRow: React.Dispatch<React.SetStateAction<DataContract | undefined>>;
    moduleId: string;
    dataContractsLoading: boolean;
    setDataContractsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    initialDataContractState: DataContractAndViewProperties[];
    refreshAllDataContracts: (moduleId: string) => void;
    remoteFilters: DataContractAndRemoteFilters[];
    remoteSorts: DataContractAndRemoteSorts[];
}

export const DataContractsContext = createContext<DataContractsContextProps | undefined>(undefined);
interface DataContractAndViewProperties {
    dataContractId: string;
    dataContractProperties: DataContractProperty[];
}
interface DataContractAndRemoteFilters {
    dataContractId: string;
    remoteFilters: RemoteFilter[];
}
interface DataContractAndRemoteSorts {
    dataContractId: string;
    remoteSorts: RemoteSort[];
}

export const DataContractsProvider = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const [viewDataContracts, setViewDataContracts] = useState<DataContractForUpdate[]>();
    const [formDataContracts, setFormDataContracts] = useState<DataContractForUpdate[]>();
    const [dataContractsLoading, setDataContractsLoading] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<DataContract | undefined>();
    const [moduleId, setModuleId] = useState<string>("");
    const [initialDataContractState, setInitialDataContractState] = useState<DataContractAndViewProperties[]>([]);
    const [filters, setFilters] = useState<DataContractAndRemoteFilters[]>([]);
    const [sorts, setSorts] = useState<DataContractAndRemoteSorts[]>([]);

    const refreshAllDataContracts = async (moduleId: string) => {
        if (moduleId) {
            try {
                setDataContractsLoading(true);
                DataContractService.getAllDataContracts(moduleId).then(dataContractResults => {
                    const initialViewProps: DataContractAndViewProperties[] = [];
                    const filters_: DataContractAndRemoteFilters[] = [];
                    const sorts_: DataContractAndRemoteSorts[] = [];
                    const dcForUpdate = dataContractResults.map(x => {
                        initialViewProps.push({
                            dataContractId: x.dataContractReferenceId,
                            dataContractProperties: x.dataContractUIProperties,
                        })
                        filters_.push({
                            dataContractId: x.dataContractReferenceId,
                            remoteFilters: x.remoteFilterUIs || [],
                        });
                        sorts_.push({
                            dataContractId: x.dataContractReferenceId,
                            remoteSorts: x.remoteSortUIs || [],
                        });
                        return {
                            ...x,
                            dataContractUIProperties: undefined,
                            remoteFilterUIs: undefined,
                            remoteSortUIs: undefined,
                        }
                    });
                    debugger;
                    setViewDataContracts(dcForUpdate?.filter(x => x.parentDataContractId == undefined || x.parentDataContractId == "") || []);
                    setFormDataContracts(dcForUpdate?.filter(x => x.parentDataContractId !== "") || []);
                    setDataContractsLoading(false);
                    setInitialDataContractState(initialViewProps);
                    setFilters(filters_);
                    setSorts(sorts_);
                });
            } catch (error) {
                setDataContractsLoading(false);
            }
            
        }
    };

    useEffect(() => {
        setDataContractsLoading(true);
        const url = window.location.href;
        const idMatch = url.match(/modules\/([a-zA-Z0-9-]+)/);
        if (idMatch) {
            setModuleId(idMatch[1]);
            try {
                refreshAllDataContracts(idMatch[1]);
            } catch (error) {
            }
        }

    }, [])

    return (
        <DataContractsContext.Provider value={{
            viewDataContracts: viewDataContracts,
            setViewDataContracts: setViewDataContracts,
            selectedView: selectedRow,
            setSelectedRow,
            moduleId,
            dataContractsLoading,
            initialDataContractState,
            refreshAllDataContracts,
            formDataContracts,
            setFormDataContracts,
            remoteFilters: filters,
            remoteSorts: sorts,
            setDataContractsLoading: setDataContractsLoading
        }}>
            {children}
        </DataContractsContext.Provider>
    )
}