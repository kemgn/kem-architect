import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorCircle, Button, ColorPicker, Popover, Select, TextInput, Toggle, FormFooter } from "@ims/component-library";
import styles from "./list.module.css";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { useContext, useState } from "react";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { createModule, updateModule } from "../action";
import { Module, ModuleForCreate, ModuleForUpdate } from "@/models/Entities/Module";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

interface ModuleModalProps {
    onClose: Function;
    moduleData?: Module;
    onSuccessfulFormSubmit: Function;
    moduleId?: string;
    loadingModules?: boolean;
}
export function ModulesModal(props: ModuleModalProps) {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false)

    const { showToastAlert } = useToast();

    const handleClose = (data: any) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const isUpdate = !!props.moduleData;
    const labelFieldsPrefix = "Module";
    const languages = useContext(LanguagesContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        try {
            event.preventDefault();
            const formElement = event.currentTarget as HTMLFormElement;
            const formData = new FormData(formElement);
            if (isUpdate) {
                const result: { isSuccess: boolean, updatedModule?: ModuleForUpdate } = await updateModule(formData, labelFieldsPrefix, languages);
                if (result.isSuccess) {
                    showToastAlert(messages.updateModuleSuccess.severity, messages.updateModuleSuccess.content, messages.updateModuleSuccess.title);
                    handleClose({ data: result.updatedModule, operation: "update" });
                }
                else {
                    showToastAlert(messages.updateModuleError.severity, messages.updateModuleError.content, messages.updateModuleError.title);
                }
            } else {
                const result: { isSuccess: boolean, createdModule?: ModuleForCreate } = await createModule(formData, labelFieldsPrefix, languages);
                if (result.isSuccess) {
                    showToastAlert(messages.createModuleSuccess.severity, messages.createModuleSuccess.content, messages.createModuleSuccess.title);
                    handleClose({ data: result.createdModule, operation: "create" });
                    console.log(result, "result")
                }
                else {
                    showToastAlert(messages.createModuleError.severity, messages.createModuleError.content, messages.createModuleError.title);
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal}>
                    <Typography id="modal-modal-title" variant="h5" component="h5" sx={{ marginBottom: "36px" }}>
                        {isUpdate ? "Update modules" : "Create modules"}
                    </Typography>
                    <div className={globalStyles.hrContainerForForm}>
                        <hr className={`${globalStyles.hr} mb-16`} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">

                            <TextInput id="systemName" label="System Name" name="systemName" size="medium" disabled={isUpdate} defaultValue={props.moduleData?.systemName}/>
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.moduleData?.labels} />
                            <div className="display-none">
                                <TextInput id="modulesId" defaultValue={props.moduleId} name="modulesId" />
                                <TextInput id="id" defaultValue={props.moduleData?.id} name="id" />
                                {languages?.map(language => (
                                    <TextInput key={language.id} id={language.id} defaultValue={props.moduleData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                ))}
                            </div>
                        </div>
                        <FormFooter className="ModulesFooter" loading={loading} cancelOnClick={handleClose} />
                    </form>
                </Box>
            </Modal>
        </>
    );
}

