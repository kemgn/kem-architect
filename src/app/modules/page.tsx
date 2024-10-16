"use client"
import React, { ReactNode, useState, useEffect } from 'react';
import PageHeader from '../(components)/_NextComponents/PageHeader/PageHeader';
import { GridColDef, GridRenderCellParams, DataGrid, GridRowParams, Button } from '@ims/component-library';
import ModulesDataTable from './(components)/ModulesDataTable';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ModulesModal } from './(components)/ModulesModal';
import { ModulesService } from '@/services/Modules';
import { useSearchParams } from 'next/navigation';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import { Module, ModuleForUpdate } from '@/models/Entities/Module';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';
type Operation = "update" | "create";
export interface SubmitModuleType {
    data?: Module | ModuleForUpdate;
    operation?: Operation;
}

export default function Modules() {

    const [modal, setModal] = useState<ReactNode>();
    const [loadingModules, setLoadingModules] = useState<boolean>(false);
    const [modules, setModules] = useState<Module[]>([]);

    const { showToastAlert } = useToast();

    const searchParams = useSearchParams()
    const search = searchParams.get('workspaceId')
    const onClose = () => {
        setModal(null);
    }

    useEffect(()=>{
     getWorkspaceModules();
    },[search])

    useEffect(() => {
        getAllModules();
    }, []);

    const getAllModules = async () => {
        setLoadingModules(true);
        try {
            const data = await ModulesService.getAllModules();
            console.log(data, "datagetallModulesdatagetallModules")
            setModules(data);
            setLoadingModules(false);
        } catch (_) {
            // await new Promise((res) => setTimeout(res, 1000));
            setLoadingModules(false);
        }
    }

    const getWorkspaceModules = async ()=> {

    } 

    const handleModuleModalClose = (data: SubmitModuleType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setModules([...modules, data.data as Module])
                break;
            case "update":
                const updateModule = modules.map(item =>
                    item.id === (data?.data as ModuleForUpdate).id ? data?.data as ModuleForUpdate : item
                );
                setModules(updateModule as Module[]);
                break;
            default:
                break;
        }
    }

    const deleteModule = async (moduleId: string) => {
        console.log("moduleId:", moduleId)
        setLoadingModules(true);
        try {
            await ModulesService.deleteModule({ id: moduleId });
            showToastAlert(messages.deleteModuleSuccess.severity , messages.deleteModuleSuccess.content , messages.deleteModuleSuccess.title);
            setModules(prevItems => prevItems?.filter(x => x.id !== moduleId));
            setLoadingModules(false);
        } catch (_) {
            showToastAlert(messages.deleteModuleError.severity , messages.deleteModuleError.content , messages.deleteModuleError.title);
            setLoadingModules(false);
        }
    }

    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    {search && <Link href={"/"}><ArrowBackRoundedIcon/></Link>}
                
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="Modules" />
                        <Button
                            label="Create module"
                            color="primary"
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<ModulesModal onClose={onClose} onSuccessfulFormSubmit={handleModuleModalClose} />)
                            }}
                        />
                    </div>
                    <ModulesDataTable
                        loading={loadingModules}
                        onRowDoubleClick={(event: GridRowParams) =>window.location.href = `/modules/${event.row.id}`}
                        // onRowDoubleClick={(event: GridRowParams) => setModal(<ModulesModal onSuccessfulFormSubmit={handleModuleModalClose} onClose={onClose} moduleData={event.row} loadingModules={loadingModules} />)}
                        modules={[...(modules || [])].sort((a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime())}
                        deleteModule={deleteModule}
                        setModal={setModal}
                        handleModuleModalClose={handleModuleModalClose}
                        onClose={onClose}
                        loadingModules={loadingModules}
                    />
                </div>
            </div>
            {
                modal
            }
        </>
    )
}
