import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorCircle, Button, ColorPicker, Popover, Select, TextInput, Toggle, FormFooter } from "@ims/component-library";
import styles from "./list.module.css";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { useContext } from "react";
import { createValueUnit, updateValueUnit } from "../actions";
import { SubmitValueUnitType } from "../page";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 6,
};

interface ValueUnitModalProps {
    onClose: Function;
    valueUnitData?: ValueUnit;
    onSuccessfulFormSubmit: Function;
    valueUnitTypeId?: string;
}
export function ValueUnitModal(props: ValueUnitModalProps) {
    const [open, setOpen] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const { showToastAlert } = useToast();

    const handleClose = (data: SubmitValueUnitType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const isUpdate = !!props.valueUnitData;
    const labelFieldsPrefix = "valueUnit";
    const languages = useContext(LanguagesContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        if (isUpdate) {
            const result: { isSuccess: boolean, updatedValueUnit?: ValueUnitForUpdate } = await updateValueUnit(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.updateValueUnitSuccess.severity, messages.updateValueUnitSuccess.content, messages.updateValueUnitSuccess.title);
                setLoading(false);
                handleClose({ data: result.updatedValueUnit, operation: "update" });
            }
            else {
                showToastAlert(messages.updateValueUnitError.severity, messages.updateValueUnitError.content, messages.updateValueUnitError.title);
            }
        } else {
            const result: { isSuccess: boolean, createdValueUnit?: ValueUnitForCreate } = await createValueUnit(formData, labelFieldsPrefix, languages);
            if (result.isSuccess) {
                showToastAlert(messages.createValueUnitSuccess.severity, messages.createValueUnitSuccess.content, messages.createValueUnitSuccess.title);
                setLoading(false);
                handleClose({ data: result.createdValueUnit, operation: "create" });
            }
            else {
                showToastAlert(messages.createValueUnitError.severity, messages.createValueUnitError.content, messages.createValueUnitError.title)
            }
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
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h5" sx={{ marginBottom: "36px" }}>
                        {isUpdate ? "Update Value Unit" : "Create Value Unit"}
                    </Typography>
                    <div className={globalStyles.hrContainerForForm}>
                        <hr className={`${globalStyles.hr} mb-16`} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            {/* <Toggle id="isSystem" label="Is System" name="isSystem" defaultChecked={props.valueUnitData?.isSystem} />
                        <Toggle id="isCustomizable" label="Is Customizable" name="isCustomizable" defaultChecked={props.valueUnitData?.isCustomizable} />
                        <Toggle id="isLabelsCustomizable" label="Is Label Customizable" name="isLabelsCustomizable" sx={{ backroundColor: "red" }} defaultChecked={props.valueUnitData?.isLabelsCustomizable} /> */}
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.valueUnitData?.labels} />

                            <div className="display-none">
                                <TextInput id="valueUnitTypeId" defaultValue={props.valueUnitTypeId} name="valueUnitTypeId" />
                                <TextInput id="id" defaultValue={props.valueUnitData?.id} name="id" />
                                {languages?.map(language => (
                                    <TextInput key={language.id} id={language.id} defaultValue={props.valueUnitData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                ))}
                            </div>
                        </div>
                        <FormFooter className="valueUnitsFooter" loading={loading} cancelOnClick={handleClose} />
                    </form>
                </Box>
            </Modal>
        </>
    );
}