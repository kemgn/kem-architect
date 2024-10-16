import React, { ReactNode, SetStateAction, useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalstyle } from '@/modalstyle';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Subject, SubjectForUpdate } from '@/models/Entities/Subject';
import { FormFooter, PasswordInput, Select, SelectValue, TextInput } from '@ims/component-library';
import { SubjectDataTColsFields, SubjectDataTColsHeaders } from './SubjectDataTCols';
import { SubjectSources } from '@/models/Enums/Enums';
import { ConvertEnumToObject } from '@/utils/Helpers';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { updatePassword, updateSubject } from '../actions';
import { messages } from '@/AlertMessages';
import { useToast } from '@/ToastAlertProvider';

interface ChangePasswordModalProps {
    setModal: React.Dispatch<SetStateAction<ReactNode>>;
    rowData: Subject;
}

const nullValue = null;
const openStatus = false;
const size = "medium";
const disabled = true;
const password = "Password";
const defaultDomain = "Local"

export default function ChangePasswordModal(props: ChangePasswordModalProps) {

    const [open, setOpen] = useState<boolean>(true);
    const modalTitle = `Reset password`
    const { showToastAlert } = useToast();

    const domains: SelectValue[] = ConvertEnumToObject(SubjectSources);

    function handleClose() {
        props.setModal(nullValue);
        setOpen(openStatus);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const updatedSubject = props.rowData;
        updatedSubject.password = formData.get("password") as string;

        const result = await updatePassword(updatedSubject as unknown as SubjectForUpdate);
        showToastAlert(messages.updateSubjectSuccess.severity, messages.updateSubjectSuccess.content, messages.updateSubjectSuccess.title);
        if (!result.isSuccess) {
            showToastAlert(messages.updateSubjectError.severity, messages.updateSubjectError.content, messages.updateSubjectError.title);
        }
        handleClose();
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal}>
                    <div className="inputContainer">

                        <FormHeader title={modalTitle} />
                        <form onSubmit={handleSubmit}>
                            <TextInput size={size} label={SubjectDataTColsHeaders.displayName} id={SubjectDataTColsFields.displayName}
                                name={SubjectDataTColsFields.displayName} defaultValue={props.rowData.displayName} disabled={disabled} />
                            <TextInput size={size} label={SubjectDataTColsHeaders.samAccountName} id={SubjectDataTColsFields.samAccountName}
                                name={SubjectDataTColsFields.samAccountName} defaultValue={props.rowData.samAccountName} disabled={disabled} />
                            <TextInput size={size} label={SubjectDataTColsHeaders.emailAddress} id={SubjectDataTColsFields.emailAddress}
                                name={SubjectDataTColsFields.emailAddress} defaultValue={props.rowData.emailAddress} disabled={disabled} />
                            <PasswordInput size={size} label={password} id={password} name={"password"} />
                            {/* <Select values={domains} defaultValue={domains.find((val) => val.value === defaultDomain)?.value} disabled={disabled} /> */}
                            <FormFooter cancelOnClick={handleClose} />
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
