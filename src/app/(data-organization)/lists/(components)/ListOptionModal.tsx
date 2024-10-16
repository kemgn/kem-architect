import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ColorCircle, Button, ColorPicker, Popover, Select, TextInput, Toggle, FormFooter } from "@ims/component-library";
import styles from "./list.module.css";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ColorPickerModal from "./ColorPickerModal";
import { SubmitListOptionType, SubmitListRootType } from "../page";
import { createListOption, updateListOption } from "../actions";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { useContext } from "react";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import ModalComponent from "@/app/(components)/ModalComponent/ModalComponent";
import { ListOption, ListOptionForUpdate, ListOptionForCreate } from "@/models/Entities/List";



interface ListOptionModalProps {
    onClose: Function;
    listOptionData?: ListOption;
    onSuccessfulFormSubmit: Function;
    listRootId?: string;
}

export function ListOptionModal(props: ListOptionModalProps) {
    const [open, setOpen] = React.useState(true);
    const defaultColor = ["#2E86C1", " #DAF7A6", "#FFC300", "#C7FF29", "#1D438A", "#8B59FF", "#FF4440", "#A1FFDA", "#FF6A65", "#EDD7FF", "#3a5462", "#c8016f"]
    const [loading, setLoading] = React.useState(false);

    const handleClose = (data: SubmitListOptionType) => {
        props.onClose();
        props.onSuccessfulFormSubmit(data);
        setOpen(false);
    };

    const isUpdate = !!props.listOptionData;
    const labelFieldsPrefix = "listOptionLabel";
    const languages = useContext(LanguagesContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);
        try {
            if (isUpdate) {
                const result: { isSuccess: boolean, updatedListOption?: ListOptionForUpdate } = await updateListOption(formData, labelFieldsPrefix, languages);
                if (result.isSuccess) {
                    handleClose({ data: result.updatedListOption, operation: "update" });
                }
            } else {
                const result: { isSuccess: boolean, createdListOption?: ListOptionForCreate } = await createListOption(formData, labelFieldsPrefix, languages);
                if (result.isSuccess) {
                    handleClose({ data: result.createdListOption, operation: "create" });
                }
            }
            setLoading(false);
        } catch (_) {
            setLoading(false);
        }

    }

    const [selectedColor, setSelectedColor] = React.useState("#C9C9C9");
    const getSelectedColor = (selectedColor: string) => {
        //console.log(selectedColor,"selectedd");
        setSelectedColor(selectedColor);
    }
    const [selectedColorDark, setSelectedColorDark] = React.useState("#C9C9C9");
    const getSelectedColorDark = (selectedColorDark: string) => {
        //console.log(selectedColorDark,"selecteddDARK");
        setSelectedColorDark(selectedColorDark);
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
                    <FormHeader title={isUpdate ? "Update list option" : "Create list option"} variant="h5" />

                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">

                            <TextInput id="systemName" defaultValue={props.listOptionData?.systemName} label="System name" disabled={props.listOptionData ? true : false} name="systemName" type="string" size="medium" />
                            {/* <TextInput id="chartColorCode" defaultValue={props.listOptionData?.chartColorCode} label="Chart color code" name="chartColorCode" type="string" size="medium" /> */}
                            {/* <TextInput id="iconPath" defaultValue={props.listOptionData?.iconPath} label="Icon path" name="iconPath" type="string" size="medium" /> */}
                            {/* <TextInput id="rowIndex" defaultValue={props.listOptionData?.rowIndex} label="Row index" name="rowIndex" type="number" size="medium" /> */}
                            <TextInput id="weight" defaultValue={props.listOptionData?.weight} label="Weight" name="weight" type="number" size="medium" />
                            {/* <TextInput id="maxThreshold" defaultValue={props.listOptionData?.maxThreshold} label="Max threshold" name="maxThreshold" type="number" size="medium" />
                            <TextInput id="minThreshold" defaultValue={props.listOptionData?.minThreshold} label="Min threshold" name="minThreshold" type="number" size="medium" /> */}
                            <LabelFields namePrefix={labelFieldsPrefix} labels={props.listOptionData?.labels} />
                            {/* <Popover elementColor="inherit" anchorHorizontal='right' anchorVertical="top" transformHorizontal="left" elementIcon={<KeyboardArrowDownOutlinedIcon />} elementLabel={<ColorCircle color={selectedColor} size="20px" />} >
                                <ColorPickerModal colors={defaultColor} getSelectedColor={getSelectedColor} getSelectedColorDark={getSelectedColorDark} />
                            </Popover> */}


                            {
                                isUpdate ? <div className="display-none">
                                    <TextInput id="lightColorcode" name="lightColorcode" value={selectedColor} />
                                    <TextInput id="darkColorcode" name="darkColorcode" value={selectedColorDark} />
                                    <TextInput id="id" defaultValue={props.listOptionData?.id} name="id" />
                                    <TextInput id="listRootId" defaultValue={props.listRootId} name="listRootId" />
                                    {languages?.map(language => (
                                        <TextInput key={language.id} id={language.id} defaultValue={props.listOptionData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                    ))}
                                </div>
                                    :
                                    <div className="display-none">
                                        <TextInput id="listRootId" defaultValue={props.listRootId} name="listRootId" />
                                    </div>
                            }
                            <FormFooter className="listOptionsFooter" loading={loading} cancelOnClick={handleClose} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}