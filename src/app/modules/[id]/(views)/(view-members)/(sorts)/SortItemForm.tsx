import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';
import { TextInput, Toggle, FormFooter } from '@ims/component-library';
import React, { useContext, useState } from 'react'
import { createSortItem, updateSortItem } from './Actions';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { AutoComplete, OptionType, Select } from '@/app/(components)/_IMSComponentLibary/components';
import { Property, PropertyType } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { RemoteSortItem } from '@/models/Entities/RemoteSort';
import { ViewProperty } from '@/models/Entities/DataContract';

interface SortItemFormProps {
    onClose: Function;
    sortItemData?: RemoteSortItem;
    sortId?: string;
    getIndex: Function;
    // listRootId?: string;
}
interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}

export default function SortItemForm(props: SortItemFormProps) {
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { remoteSorts, selectedView, refreshAllDataContracts, moduleId, initialDataContractState } = dataContractsContext;

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputFetchLoading, setInputFetchLoading] = useState<boolean>(false);
    const [propertiesData, setPropertiesData] = useState<PropertyForAutoControl[]>([])
    const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | undefined>()
    const [propertyValue, setPropertyValue] = useState<PropertyForAutoControl>();

    const isUpdate = !!props.sortItemData;

    const onClose = () => {
        setOpen(false)
        props.onClose();
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        let result: { isSuccess: boolean, response?: RemoteSortItem | undefined } | undefined = undefined;
        const formData = new FormData(event.currentTarget);
        const dataContractId = selectedView?.id
        try {
            if (dataContractId && props.sortId) {
                if (isUpdate) {
                    result = await updateSortItem(formData, props.sortItemData!);
                } else if (propertyValue) {
                    result = await createSortItem(formData, props.sortId, propertyValue, props.getIndex());
                }
                onClose();
                refreshAllDataContracts(moduleId);
            }


            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    const handlePropertyInputChange = async (_: React.SyntheticEvent<Element, Event>, query: string) => {
        setInputFetchLoading(true);
        if (!query.trim()) {
            setPropertiesData([]);
            setInputFetchLoading(false);
            setSelectedPropertyType(undefined);
            return;
        }
        await ModulesService.getAllModules().then(result => {
            let modulesData: PropertyForAutoControl[] = [];
            modulesData = result?.flatMap(module =>
                module.properties?.map(property => {
                    return { ...property, moduleName: module.systemName };
                }) ?? []
            ) ?? [];

            const selectedDataContractViewProps = initialDataContractState?.find(x=>x.dataContractId === selectedView?.dataContractReferenceId)?.dataContractProperties;
            const propertyIds = selectedDataContractViewProps?.map(x=>(x as ViewProperty).propertyId);
            
            setPropertiesData(modulesData.filter(x => propertyIds?.includes(x.id)));
        });

        // setPropertiesData(properties);
        setInputFetchLoading(false);
    }
    const propertySelected = (_: React.SyntheticEvent<Element, Event>, property: Property) => {
        setPropertyValue({ ...property, moduleName: "" });
        setSelectedPropertyType(property.type);
    }

    return (
        <>
            <ModalComponent
                handleClose={onClose}
                modalOpen={open}
                modalTitle={isUpdate ? "Update sort item" : "Create sort item"}
                onSubmit={handleSubmit}
            >
                <div className="inputContainer">
                    <AutoComplete
                        id={"propertySearch"}
                        className={`${isUpdate ? "display-none" : ""}`}
                        label="Select a property"
                        placeholder="Type to search properties"
                        startIcon={<SearchOutlinedIcon />}
                        onInputChange={handlePropertyInputChange}
                        loading={inputFetchLoading}
                        onChange={propertySelected}
                        options={propertiesData}
                        groupBy={(option: PropertyForAutoControl) => option.moduleName}
                        getOptionLabel={(option: PropertyForAutoControl) => option.systemName}
                        value={propertyValue}
                        autoComplete={true}
                        name="propertyId"
                        clearAfterSelect={false}
                    />
                    <Toggle
                        id="isDescending"
                        defaultChecked={props.sortItemData?.isDescending}
                        name="isDescending"
                        label="Descending"
                        size="medium"
                    />
                    <Toggle
                        id="sortOnLabel"
                        defaultChecked={props.sortItemData?.sortOnLabel}
                        name="sortOnLabel"
                        label="Sort on label"
                        size="medium"
                    />
                    <div className="display-none" style={{ height: 0, overflow: 'hidden' }}>
                        <TextInput id="id" defaultValue={props.sortItemData?.id} name="id" />
                    </div>
                    <FormFooter loading={loading} cancelOnClick={onClose} />
                </div>
            </ModalComponent>
        </>
    )
}
