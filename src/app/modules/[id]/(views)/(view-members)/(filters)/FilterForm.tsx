import { AutoComplete, FormFooter, OptionType, TextInput, Toggle } from '@/app/(components)/_IMSComponentLibary/components';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';
import { RemoteFilter, RemoteFilterForCreate, RemoteFilterForUpdate, RemoteFilterItemForCreate } from '@/models/Entities/RemoteFilter';
import React, { useContext, useState } from 'react'
import { Response } from "@/services/Helpers";
import { updateFilter, createFilter } from './Actions';
import Box from "@mui/material/Box";
import { Property, PropertyType } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import { SubmitFilterType } from './Filters';
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';

interface FilterFormProps {
    onClose: Function;
    filterData?: RemoteFilter;
}
interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}

export default function FilterForm(props: FilterFormProps) {
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { selectedView, refreshAllDataContracts, moduleId, setDataContractsLoading } = dataContractsContext;


    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);

    const isUpdate = !!props.filterData;
    const labelFieldsPrefix = "filterLabel";
    const languages = useContext(LanguagesContext);

    const handleClose = () => {
        props.onClose();
        setOpen(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        let result: { isSuccess: boolean, response?: RemoteFilter | undefined } | undefined = undefined;

        const formData = new FormData(event.currentTarget);
        const dataContractId = selectedView?.id
        try {
            if (dataContractId) {
                if (isUpdate) {
                    result = await updateFilter(formData, labelFieldsPrefix, languages);
                } else {
                    result = await createFilter(formData, labelFieldsPrefix, languages, dataContractId);
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
                modalTitle={isUpdate ? "Update filter" : "Create filter"}
                onSubmit={handleSubmit}
            >
                <div className="inputContainer inputContainerFirstChild">
                    <TextInput
                        id="systemName"
                        defaultValue={props.filterData?.systemName}
                        label="System Name"
                        name="systemName"
                        size="medium"
                    />
                    <TextInput
                        id="customLogic"
                        defaultValue={props.filterData?.customLogic}
                        label="Custom logic"
                        name="customLogic"
                        size="medium"
                    />
                    <LabelFields namePrefix={labelFieldsPrefix} labels={props.filterData?.labels} />
                    <Toggle
                        id="isMandatory"
                        defaultChecked={props.filterData?.isMandatory}
                        name="isMandatory"
                        label="Is mandatory"
                        size="medium"
                    />
                     <Toggle
                        id="showAsAvailableFilter"
                        defaultChecked={props.filterData?.showAsAvailableFilter === undefined ? true : props.filterData?.showAsAvailableFilter}
                        name="showAsAvailableFilter"
                        label="Available in view"
                        size="medium"
                    />
                    <div className="display-none" style={{ height: 0, overflow: 'hidden' }}>
                        <TextInput id="id" defaultValue={props.filterData?.id} name="id" />
                        {languages?.map(language => (
                            <TextInput key={language.id} id={language.id} defaultValue={props.filterData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                        ))}
                    </div>
                    <FormFooter cancelOnClick={handleClose} loading={loading} />
                </div>
            </ModalComponent>
        </>
    )
}
