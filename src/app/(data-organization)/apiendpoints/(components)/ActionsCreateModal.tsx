import React, { ReactNode, SetStateAction, useState } from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormFooter, TextInput, Toggle } from '@ims/component-library';
import { ActionsPanelFieldIds, ActionsPanelLabels } from './EPointDataTColFields';
import { SxProps } from '@mui/material'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import Modal from "@mui/material/Modal";
import Header from '@/app/(components)/Header/Header';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';

interface ActionsCreateModalProps {
    sxprops: SxProps;
    handleSubmitActions: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    actions: Action[];
    setModal: React.Dispatch<SetStateAction<ReactNode>>;
}

const textInputLabel = "System name";
const size = "medium";
const header = "Create Action";

export default function ActionsCreateModal(props: ActionsCreateModalProps) {

    const [open , setOpen] = useState(true);
    
    const handleClose = () => {
        props.setModal(null);
        setOpen(false);
    }

    return (
        <div>
            <ModalComponent handleClose={handleClose} modalOpen={open} modalTitle={header} onSubmit={props.handleSubmitActions}>
                <TextInput label={textInputLabel} size={size} name={ActionsPanelFieldIds.createNewActionTextField} id={ActionsPanelFieldIds.createNewActionTextField} />
                <div className={globalStyles.actionPanelsFooter}>
                    <Toggle label={ActionsPanelLabels.active} id={ActionsPanelFieldIds.active} name={ActionsPanelFieldIds.active} />
                    <FormFooter cancelOnClick={() =>{ props.setModal(null)}} />
                </div>
            </ModalComponent>
            {/* <Modal
                open={open}
                onClose={() => props.setModal(null)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={props.sxprops}>
                    <Typography>
                        <FormHeader title={header}/> 
                    </Typography>
                    <form onSubmit={props.handleSubmitActions}>
                        <Typography>
                            <TextInput label={textInputLabel} size={size} name={ActionsPanelFieldIds.createNewActionTextField} id={ActionsPanelFieldIds.createNewActionTextField} />
                            <div className={globalStyles.actionPanelsFooter}>
                                <Toggle label={ActionsPanelLabels.active} id={ActionsPanelFieldIds.active} name={ActionsPanelFieldIds.active} />
                                <FormFooter cancelOnClick={() =>{ props.setModal(null)}} />
                            </div>
                        </Typography>
                    </form>
                </Box>
            </Modal> */}
        </div>
    )
}
