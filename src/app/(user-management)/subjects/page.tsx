"use client";

import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Button } from "@/app/(components)/_IMSComponentLibary/components";
import PageHeader from "@/app/(components)/_NextComponents/PageHeader/PageHeader";
import { ReactNode, useEffect, useState } from "react";
import SubjectModal from "./(components)/SubjectModal";
import { Subject, SubjectForDelete } from "@/models/Entities/Subject";
import { SubjectService } from "@/services/Subject";
import SubjectDataTable from "./(components)/SubjectDataTable";
import { GridRowParams } from "@ims/component-library";
import { LanguageModal } from "@/app/languages/(components)/LanguageModal";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

const pageTitle = "Users";
const createButtonLabel = "Create user";
const createButtonColor = "primary"
const reset = false;
const loadingTrue = true;
const notLoading = false;

export default function Subjects() {
    const [modal, setModal] = useState<ReactNode>(null);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading , setLoading] = useState<boolean>(true);
    const [isProcessFinished , setIsProcessFinished] = useState<boolean>(true);

    const { showToastAlert } = useToast();

    useEffect(() => {
        if(isProcessFinished){
            getAllSubjects();
            setIsProcessFinished(reset)
        }
    }, [modal]);

    const getAllSubjects = async () => {
        try {
            const data = await SubjectService.getAllSubjects();
            setSubjects(data);
            setLoading(false);
        } catch (error) {
            // await new Promise((res) => setTimeout(res, 1000));
            
        }
    }

    const deleteSubject = async (id: string) => {
        const subjectForDelete:SubjectForDelete = {
            id: id
        }
        setLoading(loadingTrue)
        const response = await SubjectService.deleteSubject(subjectForDelete);

        if(response.isSuccess){
            showToastAlert(messages.deleteSubjectSuccess.severity , messages.deleteSubjectSuccess.content , messages.deleteSubjectSuccess.title);
            await getAllSubjects();
            setLoading(notLoading)
        }
        else{
            showToastAlert(messages.deleteSubjectError.severity , messages.deleteSubjectError.content , messages.deleteSubjectError.title);
        }
    }
    
    const handleRowDoubleClick = async (row: Subject) => {
        setModal(<SubjectModal setIsProcessFinished={setIsProcessFinished} setModal={setModal} subject={row} setLoadingDataGrid={setLoading} />)
    }

    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle={pageTitle} />
                        <Button
                            label={createButtonLabel}
                            color={createButtonColor}
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<SubjectModal setModal={setModal} setIsProcessFinished={setIsProcessFinished} setLoadingDataGrid={setLoading}/>)
                            }}
                        />
                    </div>
                    <SubjectDataTable
                        subjects={subjects}
                        loading={loading}
                        setModal={setModal}
                        deleteSubject={deleteSubject}
                        onRowDoubleClick={handleRowDoubleClick}
                        setLoading={setLoading}
                        setIsProcessFinished={setIsProcessFinished}
                    /> 
                </div>
            </div>
            {
                modal
            }
        </>
    )
}
