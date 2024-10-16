"use client";

import { GridColDef, GridRenderCellParams, GridRowParams } from "@ims/component-library"
import { Button, DataGrid } from "../(components)/_IMSComponentLibary/components"
import PageHeader from "../(components)/_NextComponents/PageHeader/PageHeader"
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ReactNode, useEffect, useState } from "react";
import { LanguageModal } from "./(components)/LanguageModal";
import { LanguageService } from "@/services/Language";
import LanguageDataTable from "./(components)/LanguageDataTable";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";

export interface SubmitLanguageType {
    data?: LanguageForCreate | LanguageForUpdate;
    operation?: Operation;
}
type Operation = "update" | "create";

export default function Languages() {
    const [modal, setModal] = useState<ReactNode>();
    const [loadingLanguage, setLoadingLanguage] = useState<boolean>(false);
    const [languages, setLanguages] = useState<Language[]>([]);

    const onClose = () => {
        setModal(null);
    }

    useEffect(() => {
        getAllLanguage();
    }, []);

    const getAllLanguage = async () => {
        setLoadingLanguage(true);
        try {
            const data = await LanguageService.getAllLanguages();
            console.log(data, "datagetall")
            setLanguages(data);
            setLoadingLanguage(false);
        } catch (_) {
            // await new Promise((res) => setTimeout(res, 1000));
            setLoadingLanguage(false);
        }
    }

    const deleteLanguagae = async (languageId: string) => {
        setLoadingLanguage(true);
        try {
            await LanguageService.deleteLanguage({ id: languageId });
            setLanguages(prevItems => prevItems?.filter(x => x.id !== languageId));
            setLoadingLanguage(false);
        } catch (_) {
            setLoadingLanguage(false);
        }
    }

    const handleLanguageModalClose = (data: SubmitLanguageType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setLanguages([...languages, data?.data as Language])
                break;
            case "update":
                const updateLanguage = languages.map(item =>
                    item.id === (data?.data as LanguageForUpdate).id ? data?.data as LanguageForUpdate : item
                );
                setLanguages(updateLanguage as Language[]);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Languages" />
                <Button
                    label="Create language"
                    color="primary"
                    onClick={() => {
                        setModal(<LanguageModal onClose={onClose} onSuccessfulFormSubmit={handleLanguageModalClose} />)
                    }}
                    loading={loadingLanguage}
                />
            </div>
            <LanguageDataTable
                languages={languages}
                loading={loadingLanguage}
                onRowDoubleClick={(event: GridRowParams) => setModal(<LanguageModal onClose={onClose} languageData={event.row} onSuccessfulFormSubmit={handleLanguageModalClose} languagesLoading={loadingLanguage}/>)}
                deleteLanguage={deleteLanguagae}
            />
            {
                modal
            }
        </>
    )
}

