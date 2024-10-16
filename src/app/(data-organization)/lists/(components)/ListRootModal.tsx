import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormFooter, Select, TextInput, Toggle } from "@ims/component-library";
import "./list.module.css";
import { createListRoot, updateListRoot } from "../actions";
import { SubmitListRootType } from "../page";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { useContext, useState } from "react";
import { Response } from "@/services/Helpers";
import ModalComponent from "@/app/(components)/ModalComponent/ModalComponent";
import { ListRoot, ListOption } from "@/models/Entities/List";
import { SortOptionsBy } from "@/models/Enums/Enums";

interface ListRootModalProps {
    listRootData?: ListRoot;
    optionData?: ListOption;
    setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    proccessSuccess?: boolean;
    setProcessSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const sortOptionsBySelect: EnumForSelect[] = [
    {
        label: "List root setting",
        value: SortOptionsBy.ListRootSetting,
    },
    {
        label: "Manual",
        value: SortOptionsBy.Manual,
    },
    {
        label: "Threshold",
        value: SortOptionsBy.Threshold,
    },
    {
        label: "Time created",
        value: SortOptionsBy.TimeCreated,
    },
    {
        label: "Weight",
        value: SortOptionsBy.Weight,
    },
]

export function ListRootModal(props: ListRootModalProps) {
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);

    React.useEffect(() => {
        props.setProcessSuccess(false);
    }, [])

    const onClose = () => {
        props.setModal(null);
        setOpen(false);
    }

    const isUpdate = !!props.listRootData;
    const labelFieldsPrefix = "listRootLabel";
    const languages = useContext(LanguagesContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let result: Response<ListRoot> | {
            isSuccess: boolean;
            null: null;
        }
        setLoading(true);
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (isUpdate) {
            result = await updateListRoot(formData, labelFieldsPrefix, languages);
        } else {
            result = await createListRoot(formData, labelFieldsPrefix, languages);
        }
        if (result.isSuccess) {
            setLoading(false);
            props.setModal(null);
            props.setProcessSuccess(true);
        }
    }
  
    
    return (
        <>
            <ModalComponent handleClose={onClose} modalOpen={open} modalTitle={isUpdate ? "Update list root" : "Create list root"}
                onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <TextInput id="systemName" defaultValue={props.listRootData?.systemName} disabled={isUpdate} label="System Name" name="systemName" type="string" size="medium" />
                    {/* <Toggle id="isSystem" defaultChecked={props.listRootData?.isSystem} name="isSystem" label="Is System" /> */}
                    <Toggle id="isThresholdDuration" defaultChecked={props.listRootData?.isThresholdDuration} name="isThresholdDuration" label="Is Threshold Duration" />
                    {/* <Toggle id="isCustomizable" defaultChecked={props.listRootData?.isCustomizable} name="isCustomizable" label="Is Customizable" />
                    <Toggle id="isExtendable" defaultChecked={props.listRootData?.isExtendable} name="isExtendable" label="Is Extendable" />
                    <Toggle id="isLabelCustomizable" defaultChecked={props.listRootData?.isLabelCustomizable} name="isLabelCustomizable" label="Is Label Customizable" /> */}
                    <Select
                        label="Sort options by"
                        values={sortOptionsBySelect}
                        name="sortOptionsByType"
                        defaultValue={props.listRootData?.sortOptionsByType?.toString()}
                    />
                    <LabelFields namePrefix={labelFieldsPrefix} labels={props.listRootData?.labels} />
                    <div className="display-none" style={{ height: 0, overflow: 'hidden' }}>
                        <TextInput id="id" defaultValue={props.listRootData?.id} name="id" />
                        {languages?.map(language => (
                            <TextInput key={language.id} id={language.id} defaultValue={props.listRootData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                        ))}
                    </div>
                    <FormFooter className="listRootFooter" loading={loading} cancelOnClick={onClose} />
                </div>
            </ModalComponent>
        </>
    );
}

