import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorPicker, Select, TextInput, Toggle, Button, FormFooter } from "@ims/component-library";
import { createLanguage, updateLanguage } from "../action";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css"
import { SubmitLanguageType } from "../page";



interface LanguageModalProps {
    onClose: Function;
    languageData?: Language;
    onSuccessfulFormSubmit: Function;
    languagesLoading?: boolean;
}

export function LanguageModal(props: LanguageModalProps) {
    const [open, setOpen] = React.useState(true);
    const isUpdate = !!props.languageData?.id;
    const [loading, setLoading] = React.useState(false);
    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    const onSuccesshandleClose = (data: SubmitLanguageType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        if (isUpdate) {
            const result: { isSuccess: boolean, updatedLanguage?: LanguageForUpdate } = await updateLanguage(formData);
            if (result.isSuccess) {
                setLoading(false);
                onSuccesshandleClose({ data: result.updatedLanguage, operation: "update" });
            }
        } else {
            const result: { isSuccess: boolean, createdLanguage?: LanguageForCreate } = await createLanguage(formData);
            if (result.isSuccess) {
                setLoading(false);
                onSuccesshandleClose({ data: result.createdLanguage, operation: "create" });
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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {isUpdate ? "Update language" : "Create language"}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <TextInput id="name" defaultValue={props.languageData?.name} label="Name" disabled={isUpdate} name="name" type="string" size="medium" />
                            <TextInput id="abbreviation" defaultValue={props.languageData?.abbreviation} label="Abbreviation" name="abbreviation" type="string" size="medium" />
                            <TextInput id="cultureName" defaultValue={props.languageData?.cultureName} label="CultureName" name="cultureName" type="string" size="medium" />
                            <div className="display-none">
                                <TextInput id="id" defaultValue={props.languageData?.id} name="id" />
                            </div>
                        </div>
                        <FormFooter className="languageFooter" loading={loading} cancelOnClick={onClose} />
                    </form>
                </Box>
            </Modal>
        </>
    );
}