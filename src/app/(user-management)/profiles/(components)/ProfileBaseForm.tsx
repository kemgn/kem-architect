import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Button, FormFooter, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import Modal from "@mui/material/Modal";
import React, { useContext, useState } from 'react'
import Box from "@mui/material/Box";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { SubmitProfileType } from '../page';
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { updateProfile, createProfile } from '../actions';
import { Profile, ProfileForUpdate, ProfileForCreate } from '@/models/Entities/Profile';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';
interface ProfileBaseModalProps {
    onClose: Function;
    profileData?: Profile;
    onSuccessfulFormSubmit: Function;
}

export default function ProfileBaseForm(props: ProfileBaseModalProps) {
    const [open, setOpen] = useState(true);
    const { showToastAlert } = useToast();
    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    const isUpdate = !!props.profileData;
    const labelFieldsPrefix = "profileLabel";
    const languages = useContext(LanguagesContext);

    const onSuccessHandleClose = (data: SubmitProfileType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (isUpdate) {
            const result: { isSuccess: boolean, updatedProfile?: Profile } = await updateProfile(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.updateProfileSuccess.severity, messages.updateProfileSuccess.content, messages.updateProfileSuccess.title);
                onSuccessHandleClose({ data: result.updatedProfile, operation: "update" });
            }
            else {
                showToastAlert(messages.updateProfileError.severity, messages.updateProfileError.content, messages.updateProfileError.title);
            }
        } else {
            const result: { isSuccess: boolean, createdProfile?: Profile } = await createProfile(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.createProfileSuccess.severity, messages.createProfileSuccess.content, messages.createProfileSuccess.title);
                onSuccessHandleClose({ data: result.createdProfile, operation: "create" });
            }
            else {
                showToastAlert(messages.createProfileError.severity, messages.createProfileError.content, messages.createProfileError.title);
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
                    <FormHeader title={isUpdate ? "Update profile" : "Create profile"} variant="h5" />
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <TextInput id="systemName" defaultValue={props.profileData?.systemName} name="systemName" label="System name" type="string" size="medium" />
                            {/* <Toggle id="isSystem" defaultChecked={props.profileData?.isSystem} name="isSystem" label="Is system" /> */}
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.profileData?.labels} />
                            {
                                !isUpdate ? null : <div className="display-none">
                                    <TextInput id="id" defaultValue={props.profileData?.id} name="id" />
                                    {languages?.map(language => (
                                        <TextInput key={language.id} id={language.id} defaultValue={props.profileData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                    ))}
                                </div>
                            }
                            <FormFooter className="prFooter" cancelOnClick={onClose} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
