import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Button, FormFooter, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from 'react'
import Box from "@mui/material/Box";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { SubmitGroupType } from '../page';
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { updateGroup, createGroup } from '../actions';
import { GroupForUpdate, GroupForCreate, Group } from '@/models/Entities/Group';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';
interface GroupBaseFormProps {
    onClose: Function;
    groupData?: Group;
    onSuccessfulFormSubmit: Function;
}

export default function GroupBaseForm(props: GroupBaseFormProps) {
    const [open, setOpen] = useState(true);

    const { showToastAlert } = useToast();

    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    const isUpdate = !!props.groupData;
    const labelFieldsPrefix = "groupLabel";
    const languages = useContext(LanguagesContext);

    const onSuccessHandleClose = (data: SubmitGroupType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (isUpdate) {
            const result: { isSuccess: boolean, updatedGroup?: GroupForUpdate } = await updateGroup(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.updateGroupSuccess.severity, messages.updateGroupSuccess.content, messages.updateGroupSuccess.title);
                onSuccessHandleClose({ data: result.updatedGroup, operation: "update" });
            }
            else {
                showToastAlert(messages.updateGroupError.severity, messages.updateGroupError.content, messages.updateGroupError.title);
            }
        } else {
            const result: { isSuccess: boolean, createdGroup?: Group } = await createGroup(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.createGroupSuccess.severity, messages.createGroupSuccess.content, messages.createGroupSuccess.title);
                onSuccessHandleClose({ data: result.createdGroup, operation: "create" });
            }
            else {
                showToastAlert(messages.createGroupError.severity, messages.createGroupError.content, messages.createGroupError.title);
            }
        }
    }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal}>
                    <FormHeader title={isUpdate ? "Update group" : "Create group"} variant="h5" />
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <TextInput id="systemName" defaultValue={props.groupData?.systemName} name="systemName" label="System name" type="string" size="medium" />
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.groupData?.labels} />
                            {
                                isUpdate &&
                                (<div className="display-none">
                                    <TextInput defaultValue={props.groupData?.id} name="id" />
                                    <TextInput defaultValue={props.groupData?.groupReferenceId} name="groupReferenceId" />
                                    {languages?.map(language => (
                                        <TextInput key={language.id} id={language.id} defaultValue={props.groupData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                    ))}
                                </div>)
                            }
                            <FormFooter className="groupFooter" cancelOnClick={onClose} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
