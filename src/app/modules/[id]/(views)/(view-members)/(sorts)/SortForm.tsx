import { AutoComplete, FormFooter, OptionType, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';
import { RemoteFilter, RemoteFilterForCreate, RemoteFilterForUpdate, RemoteFilterItemForCreate } from '@/models/Entities/RemoteFilter';
import React, { useContext, useState } from 'react'
import { Response } from "@/services/Helpers";
import { updateSort, createSort } from './Actions';
import Box from "@mui/material/Box";
import { Property, PropertyType } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { RemoteSort } from '@/models/Entities/RemoteSort';

interface SortFormProps {
    onClose: Function;
    sortData?: RemoteSort;
}
interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}

export default function SortForm(props: SortFormProps) {
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { selectedView, refreshAllDataContracts, moduleId } = dataContractsContext;


    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);

    const isUpdate = !!props.sortData;
    const labelFieldsPrefix = "sortLabel";
    const languages = useContext(LanguagesContext);

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        let result: { isSuccess: boolean, response?: RemoteSort | undefined } | undefined = undefined;

        const formData = new FormData(event.currentTarget);
        const dataContractId = selectedView?.id
        try {
            if (dataContractId) {
                if (isUpdate) {
                    result = await updateSort(formData, labelFieldsPrefix, languages);
                } else {
                    result = await createSort(formData, labelFieldsPrefix, languages!, dataContractId);
                }
            }
            handleClose();
            refreshAllDataContracts(moduleId);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <>
            <ModalComponent
                handleClose={handleClose}
                modalOpen={open}
                modalTitle={isUpdate ? "Update sort" : "Create sort"}
                onSubmit={handleSubmit}
            >
                <div className="inputContainer">
                    <TextInput
                        id="systemName"
                        defaultValue={props.sortData?.systemName}
                        label="System Name"
                        name="systemName"
                        size="medium"
                    />
                    <LabelFields namePrefix={labelFieldsPrefix} labels={props.sortData?.labels} />
                    <Toggle
                        id="isDefault"
                        defaultChecked={props.sortData?.isDefault}
                        name="isDefault"
                        label="Default"
                        size="medium"
                    />
                    <Toggle
                        id="doGrouping"
                        defaultChecked={props.sortData?.doGrouping}
                        name="doGrouping"
                        label="Group first entry"
                        size="medium"
                    />
                    <Toggle
                        id="groupCountVisibility"
                        defaultChecked={props.sortData?.groupCountVisibility}
                        name="groupCountVisibility"
                        label="Show group count"
                        size="medium"
                    />

                    <div className="display-none" style={{ height: 0, overflow: 'hidden' }}>
                        <TextInput id="id" defaultValue={props.sortData?.id} name="id" />
                        {languages?.map(language => (
                            <TextInput key={language.id} id={language.id} defaultValue={props.sortData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                        ))}
                    </div>
                    <FormFooter cancelOnClick={handleClose} loading={loading} />
                </div>
            </ModalComponent>
        </>
    )
}
