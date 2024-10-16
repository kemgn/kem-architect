import React, { FormEvent, ReactNode, SetStateAction, useState } from 'react'
import { ActionsDataTable } from './ActionsDataTable';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import { Button } from '@ims/component-library';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import styles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import ActionsCreateModal from './ActionsCreateModal';
import { style } from './style';
import { ActionsPanelFieldIds } from './EPointDataTColFields';

interface actionPoolProps {
    actions: Action[];
    setActions: React.Dispatch<SetStateAction<Action[]>>
}

const pageTitle = "Custom Actions";
const createButtonsLabel = "Create Action";
const createButtonsColor = "primary"
const content = ""

export default function ActionPool(props: actionPoolProps) {

    const [modal , setModal] = useState<ReactNode>();

    const openIDE = () => {
        
    }

    const handleSubmitActions = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const isActive = (formData.get(ActionsPanelFieldIds.active) as string) === "on" ? true : false;
        const actionName = formData.get(ActionsPanelFieldIds.createNewActionTextField) as string
        const actionObj:Action = {
            isActive: isActive ,
            postfix:  content ,
            id: Date.now().toString(),
            systemName: actionName,
            infix:  content,
            UseDefaultValues: false
        } 
        props.setActions([...props.actions , actionObj]);
        setModal(null);
    } 

    const handleDelete = (row: Action) => {
        let actionsTmp = props.actions;
        actionsTmp = actionsTmp.filter(a => a.id !== row.id);
        props.setActions(actionsTmp);
    }

    return (
        <div>
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle={pageTitle} />
                <Button
                    label={createButtonsLabel}
                    color={createButtonsColor}
                    className={styles.createButton}
                    onClick={() => setModal(<ActionsCreateModal actions={props.actions} sxprops={style} handleSubmitActions={handleSubmitActions} setModal={setModal}/>)}
                />
            </div>
            <ActionsDataTable deleteAction={handleDelete} onRowClick={() => { }} onRowDoubleClick={openIDE} loading={false} rows={props.actions} />
            {
                modal
            }
        </div>
    )
}
