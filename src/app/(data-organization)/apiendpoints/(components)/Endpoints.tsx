import { Button, Select, Toggle } from '@ims/component-library'
import React, { ReactNode, SetStateAction, useState } from 'react'
import EndpointsDataTable from './EndpointsDataTable'
import { Endpoint } from '@/models/Entities/Endpoint'
import EndpointModal from './EndpointModal';
import { Actions, HTTPMethods, logType, loggerMode } from '@/models/Enums/Enums';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import styles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import localstyle from '../Endpointstyle.module.css'
import { ActionsPanelFieldIds, ActionsPanelLabels } from './EPointDataTColFields';
import ActionsPanel from './ActionsPanel';
import ActionsButton from './ActionsButton';
import { actionButtons } from '../statics';
import { DummyEndpoints } from './DummyEndpoints';

interface endpointsProps {
    actions: Action[];
    setActions: React.Dispatch<SetStateAction<Action[]>>;
}

export default function Endpoints(props: endpointsProps) {

    const [endPoints, setEndPoints] = useState<Endpoint[]>(DummyEndpoints);


    const [clickedRow, setClickedRow] = useState<Endpoint>();
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<ReactNode>();
    const [mainActionRadio, setMainActionRadio] = useState(ActionsPanelLabels.createNewAction);
    const [onAfterSaveActionRadio, setOnAfterSaveActionRadio] = useState(ActionsPanelLabels.createNewAction);
    const [onErrorActionRadio, setOnErrorActionRadio] = useState(ActionsPanelLabels.createNewAction);
    const content = "";
    const pageTitle = "Actions";
    const mainType = 1;
    const onAfterSaveType = 2;
    const onErrorType = 3;

    const handleRowClick = (data: Endpoint) => {
        setClickedRow(data);
    }

    const handleDeleteEndPoint = (row: Endpoint) => {
        let endPointsTmp = endPoints;
        endPointsTmp = endPointsTmp.filter(e => e.id !== row.id);
        setEndPoints(endPointsTmp);
    }

    const handleRowDoubleClick = (row: Endpoint) => {
        console.log("DOUBLECLICKEDROW", row);
        setModal(<EndpointModal modal={modal} setModal={setModal} endpoints={endPoints} setEndpoints={setEndPoints} endpoint={row} />);
    }


    const handleSubmitActions = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const actionType = formData.get("actionType") as string;
        const selectedActionSystemName = formData.get(ActionsPanelFieldIds.selectAnAction) as string
        const createdActionSystemName = formData.get(ActionsPanelFieldIds.createNewActionTextField) as string
        const isActive = (formData.get(ActionsPanelFieldIds.active) as string) === "on" ? true : false;


        console.log(formData.get(ActionsPanelFieldIds.createNewActionTextField));

        const endpointsTmp = endPoints.map((e) => {

            if (e.id === clickedRow?.id) {
                const actionsTmp = clickedRow?.Actions;
                if (!!formData.get(ActionsPanelFieldIds.selectAnAction) ) {
                    if (actionType === Actions.Main.toString()) {
                        actionsTmp.main.isActive = isActive;
                        actionsTmp.main.apiEndpointID = e.id;
                        actionsTmp.main.apiActionID = props.actions.find(a => a.systemName === selectedActionSystemName)!.id;
                        actionsTmp.main.id = Date.now().toString(); // Oğuzun endpointi ile handle submitte actionRelation oluştururken burası biraz değişebilir 
                        actionsTmp.main.relationType = mainType;
                    }
                    if (actionType === Actions.OnAfterSave.toString()) {
                        actionsTmp.onAfterSave.isActive = isActive;
                        actionsTmp.onAfterSave.apiEndpointID = e.id;
                        actionsTmp.onAfterSave.apiActionID = props.actions.find(a => a.systemName === selectedActionSystemName)!.id;
                        actionsTmp.onAfterSave.id = Date.now().toString(); // Oğuzun endpointi ile handle submitte actionRelation oluştururken burası biraz değişebilir 
                        actionsTmp.onAfterSave.relationType = onAfterSaveType;
                    }
                    if (actionType === Actions.OnError.toString()) {
                        actionsTmp.onError.isActive = isActive;
                        actionsTmp.onError.apiEndpointID = e.id;
                        actionsTmp.onError.apiActionID = props.actions.find(a => a.systemName === selectedActionSystemName)!.id;
                        actionsTmp.onError.id   = Date.now().toString();
                        actionsTmp.onError.relationType = onErrorType
                    }
                }
                if (!!formData.get(ActionsPanelFieldIds.createNewAction)) {
                    const newAction: Action = {
                        id: Date.now().toString(),
                        isActive:   isActive,
                        infix:    content,
                        systemName: createdActionSystemName,
                    }
                    props.setActions([...props.actions , newAction]);
                    if (actionType === Actions.Main.toString()) {
                        actionsTmp.main.isActive = isActive;
                        actionsTmp.main.apiEndpointID = e.id;
                        actionsTmp.main.apiActionID = newAction.id;
                        actionsTmp.main.id = Date.now().toString();
                    }
                    if (actionType === Actions.OnAfterSave.toString()) {
                        actionsTmp.onAfterSave.isActive = isActive;
                        actionsTmp.onAfterSave.apiEndpointID = e.id;
                        actionsTmp.onAfterSave.apiActionID = newAction.id;
                        actionsTmp.onAfterSave.id = Date.now().toString();
                    }
                    if (actionType === Actions.OnError.toString()) {
                        actionsTmp.onError.isActive = isActive;
                        actionsTmp.onError.apiEndpointID = e.id;
                        actionsTmp.onError.apiActionID = newAction.id;
                        actionsTmp.onError.id = Date.now().toString();
                        // relationType ve UseDefaultValues'u Burak abiye sor postfix ve infixi de sor
                    }
                }
                return { ...e, Actions: actionsTmp }
            }
            return e
        })
        setEndPoints(endpointsTmp)
    }

    return (
        <div>
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Custom Endpoints" />
                <Button
                    label="Create endpoint"
                    color="primary"
                    className={styles.createButton}
                    onClick={() => {
                        setModal(<EndpointModal modal={modal} setModal={setModal} setEndpoints={setEndPoints} endpoints={endPoints} />)
                    }}
                />
            </div>
            <EndpointsDataTable rows={endPoints} onRowClick={handleRowClick} onRowDoubleClick={handleRowDoubleClick} loading={loading} deleteEndPoint={handleDeleteEndPoint} setEndpoints={setEndPoints}/>
            {
                modal
            }
            {
                clickedRow &&
                <div className={localstyle.headerAndActions}>
                    <PageHeader pageTitle={pageTitle} />
                    <div className={globalStyles.ActionsAndButtonsGroup}>
                        <div className={globalStyles.buttonAndPanel}>
                            <div className={globalStyles.buttonOverPanel}>
                                <ActionsButton label={actionButtons.main} className={localstyle.actionButton} />
                            </div>
                            <ActionsPanel handleSubmitActions={handleSubmitActions} actionType={Actions.Main} actions={props.actions}
                             clickedRow={clickedRow} clickedRowHasAction={!!clickedRow.Actions.main?.apiActionID} />
                        </div>
                        <div className={globalStyles.buttonAndPanel}>
                            <div className={globalStyles.buttonOverPanel}>
                                <ActionsButton label={actionButtons.onAfterSave} className={localstyle.actionButton} />
                            </div>
                            <ActionsPanel handleSubmitActions={handleSubmitActions} actionType={Actions.OnAfterSave} actions={props.actions} 
                            clickedRow={clickedRow} clickedRowHasAction={!!clickedRow.Actions.onAfterSave?.apiActionID} />
                        </div>
                        <div className={globalStyles.buttonAndPanel}>
                            <div className={globalStyles.buttonOverPanel}>
                                <ActionsButton label={actionButtons.onError} className={localstyle.actionButton} />
                            </div>
                            <ActionsPanel handleSubmitActions={handleSubmitActions} actionType={Actions.OnError} actions={props.actions}
                            clickedRow={clickedRow} clickedRowHasAction={!!clickedRow.Actions.onError?.apiActionID} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
