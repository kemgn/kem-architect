import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormFooter, TextInput, Toggle } from "@ims/component-library";
import "./valueUnit.module.css";
import { SubmitValueUnitType, SubmitValueUnitTypeType } from "../page";
import { useContext } from "react";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { createValueUnitType, updateValueUnitType } from "../actions";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";
const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: 450,
    border: "none",
    boxShadow: 24,
    p: 6,
};

interface ValueUnitTypeModalProps {
    onClose: Function;
    valueUnitTypeData?: ValueUnitType;
    valueUnitData?: ValueUnit
    onSuccessfulFormSubmit: Function;
    loadingValueUnitType?: boolean;
}

export function ValueUnitTypeModal(props: ValueUnitTypeModalProps) {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const { showToastAlert } = useToast();

    const onClose = () => {
        props.onClose();
        setOpen(false);
    }

    const onSuccesshandleClose = (data: SubmitValueUnitTypeType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const isUpdate = !!props.valueUnitTypeData;

    const labelFieldsPrefix = "valueUnitType";
    const languages = useContext(LanguagesContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        if (isUpdate) {
            const result: { isSuccess: boolean, updatedValueUnitType?: ValueUnitTypeForUpdate } = await updateValueUnitType(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.updateValueUnitTypeSuccess.severity, messages.updateValueUnitTypeSuccess.content, messages.updateValueUnitTypeSuccess.title);
                setLoading(false);
                onSuccesshandleClose({ data: result.updatedValueUnitType, operation: "update" });
            }
            else {
                showToastAlert(messages.updateValueUnitTypeError.severity, messages.updateValueUnitTypeError.content, messages.updateValueUnitTypeError.title);
            }
        } else {
            const result: { isSuccess: boolean, createdValueUnitType?: ValueUnitTypeForCreate } = await createValueUnitType(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.createValueUnitTypeSuccess.severity, messages.createValueUnitTypeSuccess.content, messages.createValueUnitTypeSuccess.title);
                setLoading(false);
                onSuccesshandleClose({ data: result.createdValueUnitType, operation: "create" });
            }
            else {
                showToastAlert(messages.createValueUnitTypeError.severity, messages.createValueUnitTypeError.content, messages.createValueUnitTypeError.title);
            }
        }
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FormHeader title={isUpdate ? "Update value unit type" : "Create value unit type"} variant="h5" />
                    {/* <div className={globalStyles.hrContainerForForm}>
                        <hr className={`${globalStyles.hr} mb-16`} />
                    </div> */}
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">

                            {/* <Toggle id="isSystem" label="Is System" name="isSystem" defaultChecked={props.valueUnitTypeData?.isSystem} />
                        <Toggle id="isCustomizable" label="Is Customizable" name="isCustomizable" defaultChecked={props.valueUnitTypeData?.isCustomizable} />
                        <Toggle id="isExtendable" label="Is Extendable" name="isExtendable" defaultChecked={props.valueUnitTypeData?.isExtendable} />
                        <Toggle id="isLabelsCustomizable" label="Is Label Customizable" name="isLabelsCustomizable" sx={{ backroundColor: "red" }} defaultChecked={props.valueUnitTypeData?.isLabelsCustomizable} /> */}
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.valueUnitTypeData?.labels} />

                            <div className="display-none">
                                <TextInput id="id" defaultValue={props.valueUnitTypeData?.id} name="id" />
                                {languages?.map(language => (
                                    <TextInput key={language.id} id={language.id} defaultValue={props.valueUnitTypeData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                ))}
                            </div>
                        </div>
                        <FormFooter className="valueUnitTypeFooter" loading={loading} cancelOnClick={onClose} />
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

