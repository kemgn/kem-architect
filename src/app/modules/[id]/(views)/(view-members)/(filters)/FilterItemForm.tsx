/* eslint-disable react-hooks/exhaustive-deps */
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
import LabelFields from '@/app/(components)/Form/LabelFields/LabelFields';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';
import { FilterCriteria, RemoteFilter, RemoteFilterItem } from '@/models/Entities/RemoteFilter';
import { TextInput, Toggle, FormFooter, DateInput } from '@ims/component-library';
import React, { useContext, useEffect, useState } from 'react'
import { createFilterItem, updateFilterItem } from './Actions';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { AutoComplete, OptionType, Select } from '@/app/(components)/_IMSComponentLibary/components';
import { Property, PropertyForListForCreate, PropertyForListForUpdate, PropertyForTreeForCreate, PropertyForTreeForUpdate, PropertyType } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TreeRootSelect from '@/app/(components)/Form/Fields/TreeRootSelect';
import ListOptionSelect from '@/app/(components)/Form/Fields/ListOptionSelect';
import TreeNodeSelect from '@/app/(components)/Form/Fields/TreeNodeSelect';
import SubjectSelect from '@/app/(components)/Form/Fields/SubjectSelect';
import { Subject } from '@/models/Entities/Subject';
import { Dayjs } from 'dayjs';
import { GetEnumValue } from '@/utils/Helpers';
import { ViewProperty } from '@/models/Entities/DataContract';
import { ArchitectDataContext } from '@/app/(components)/_Contexts/ArchitectDataContext';

interface FilterItemFormProps {
    onClose: Function;
    filterItemData?: RemoteFilterItem;
    getIdentifier: Function;
    filterId?: string;
    // listRootId?: string;
}
interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}

export default function FilterItemForm(props: FilterItemFormProps) {
    const architectDataContext = useContext(ArchitectDataContext);
    const dataContractsContext = useContext(DataContractsContext);

    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    if (!architectDataContext) {
        throw new Error("useArchitectData must be used within a ArchitectDataProvider");
    }
    const { lists, trees } = architectDataContext;
    const { selectedView, refreshAllDataContracts, moduleId, initialDataContractState } = dataContractsContext;

    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [inputFetchLoading, setInputFetchLoading] = useState<boolean>(false);
    const [propertiesData, setPropertiesData] = useState<PropertyForAutoControl[]>([])
    const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | undefined>()
    const [property, setProperty] = useState<PropertyForAutoControl>();
    const [selectedOperator, setSelectedOperator] = useState<FilterCriteria>();
    const [propertyValue, setPropertyValue] = useState<string>("");


    const isUpdate = !!props.filterItemData;
    const identifier = isUpdate ? props.filterItemData?.identifier : props.getIdentifier();
    const hideValueField = [
        FilterCriteria.Empty,
        FilterCriteria.NotEmpty,
        FilterCriteria.IsCurrentUser,
    ];

    useEffect(() => {
        if (props.filterItemData) {
            const propType = GetEnumValue(PropertyType, props.filterItemData?.propertyId?.split(":")[2]);

            const property_ = {
                id: props.filterItemData.propertyId,
                moduleName: "",
                propertyReferenceId: "",
                systemName: props.filterItemData?.propertySystemName,
                type: propType!
            };
            
            console.log("kemal", props.filterItemData);

            switch (propType) {
                case PropertyType.List:
                    const listRootRefId = (props.filterItemData.propertyValue as string)?.split(":")[0];
                    const listRootId = lists.find(x => x.listReferenceId === listRootRefId)?.id;
                    if (!listRootId) {
                        return;
                    }
                    (property_ as unknown as PropertyForListForUpdate).listRootID = listRootId;
                    break;
                case PropertyType.Tree:
                    const treeRootRefId = (props.filterItemData.propertyValue as string)?.split(":")[0];
                    const treeRootId = trees.find(x => x.treeReferenceId === treeRootRefId)?.id;
                    if (!treeRootId) {
                        return;
                    }
                    (property_ as unknown as PropertyForTreeForUpdate).treeRootID = treeRootId;
                    break;
                default:
                    break;
            }

            setProperty(property_);
            setSelectedPropertyType(propType);
            setSelectedOperator(props.filterItemData.operator);
        }
    }, [])


    const onClose = () => {
        setOpen(false)
        props.onClose();
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        let result: { isSuccess: boolean, response?: RemoteFilterItem | undefined } | undefined = undefined;

        const formData = new FormData(event.currentTarget);
        const dataContractId = selectedView?.id
        try {
            if (dataContractId && property && props.filterId) {
                if (isUpdate) {
                    result = await updateFilterItem(formData, property, propertyValue);
                } else {
                    result = await createFilterItem(formData, props.filterId, property, propertyValue);
                }
            }

            onClose();
            refreshAllDataContracts(moduleId);
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

            const selectedDataContractViewProps = initialDataContractState?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.dataContractProperties;
            const propertyIds = selectedDataContractViewProps?.map(x => (x as ViewProperty).propertyId);

            setPropertiesData(modulesData.filter(x => propertyIds?.includes(x.id)));
        });

        // setPropertiesData(properties);
        setInputFetchLoading(false);
    }
    const propertySelected = (_: React.SyntheticEvent<Element, Event>, property: Property) => {
        setProperty({ ...property, moduleName: "asd" });
        setSelectedPropertyType(property.type);
    }
    const handleOperatorChange = (operatorEnum: number) => {
        setSelectedOperator(operatorEnum);
    }
    const getOperators = () => {
        const baseCriterias: EnumForSelect[] = [
            {
                label: "Not empty",
                value: FilterCriteria.NotEmpty,
            },
            {
                label: "Empty",
                value: FilterCriteria.Empty,
            },
            {
                label: "Equals",
                value: FilterCriteria.Equals,
            },
            {
                label: "Not equals",
                value: FilterCriteria.NotEquals,
            }
        ];
        switch (selectedPropertyType) {
            case PropertyType.SubjectLink:
                return baseCriterias.concat([
                    {
                        label: "Contains",
                        value: FilterCriteria.Contains
                    },
                    {
                        label: "Not contains",
                        value: FilterCriteria.NotContains
                    },
                    {
                        label: "Starts with",
                        value: FilterCriteria.StartsWith
                    },
                    {
                        label: "Ends with",
                        value: FilterCriteria.EndsWith
                    },
                    {
                        label: "Is/contains current user",
                        value: FilterCriteria.IsCurrentUser
                    },
                ]);
            case PropertyType.AutoCode:
            case PropertyType.DataLink:
            case PropertyType.ObjectLink:
            case PropertyType.String:
            case PropertyType.Chat:
                return baseCriterias.concat([
                    {
                        label: "Contains",
                        value: FilterCriteria.Contains
                    },
                    {
                        label: "Not contains",
                        value: FilterCriteria.NotContains
                    },
                    {
                        label: "Starts with",
                        value: FilterCriteria.StartsWith
                    },
                    {
                        label: "Ends with",
                        value: FilterCriteria.EndsWith
                    },
                ]);
            case PropertyType.DateTime:
            case PropertyType.Integer:
            case PropertyType.Float:
            case PropertyType.Time:
                return baseCriterias.concat([
                    {
                        label: "Smaller than",
                        value: FilterCriteria.SmallerThan
                    },
                    {
                        label: "Equal smaller than",
                        value: FilterCriteria.EqualSmallerThan
                    },
                    {
                        label: "Bigger than",
                        value: FilterCriteria.BiggerThan
                    },
                    {
                        label: "Equal bigger than",
                        value: FilterCriteria.EqualBiggerThan
                    },
                ]);
            case PropertyType.Bool:
            case PropertyType.List:
            case PropertyType.Tree:
            default:
                return baseCriterias;
        }
    }
    const getValueField = () => {
        const inputName = "propertyValue";
        const inputLabel = "Value"
        const textInput = <TextInput
            label={inputLabel}
            name={inputName}
            defaultValue={props.filterItemData?.propertyValue}
            size="medium"
        />;
        const numberInput = <TextInput
            type="number"
            label={inputLabel}
            name={inputName}
            defaultValue={props.filterItemData?.propertyValue}
            size="medium"
        />;
        const subjectSelectHandleChange = (_: React.SyntheticEvent<Element, Event>, subject: Subject) => {
            setPropertyValue(subject.id);
        }
        switch (selectedPropertyType) {
            case PropertyType.SubjectLink:
                switch (selectedOperator) {
                    case FilterCriteria.Contains:
                    case FilterCriteria.NotContains:
                    case FilterCriteria.StartsWith:
                    case FilterCriteria.EndsWith:
                        return textInput;
                    case FilterCriteria.Equals:
                    case FilterCriteria.NotEquals:
                        return (
                            <SubjectSelect handleChange={subjectSelectHandleChange} label="Search for a subject" />
                        )
                    case FilterCriteria.Empty:
                    case FilterCriteria.NotEmpty:
                    case FilterCriteria.IsCurrentUser:
                    default:
                        break;
                }

            case PropertyType.DateTime:
                return (
                    <DateInput
                        label="Pick a date"
                        name={inputName}
                        defaultValue={props.filterItemData?.propertyValue as Dayjs}
                    />
                )
            case PropertyType.Time:
                return numberInput;
            case PropertyType.Bool:
                return (
                    <Toggle
                        defaultChecked={props.filterItemData?.propertyValue as boolean}
                        name={inputName}
                        label="Bool value"
                    />
                )
            case PropertyType.List:
                return (
                    <ListOptionSelect
                        name={inputName}
                        listRootId={(property as unknown as PropertyForListForCreate).listRootID}
                        defaultValue={props.filterItemData?.propertyValue as string}
                    />
                )
            case PropertyType.Tree:
                return (
                    <TreeNodeSelect
                        name={inputName}
                        treeRootId={(property as unknown as PropertyForTreeForCreate).treeRootID}
                        defaultValue={props.filterItemData?.propertyValue as string}
                    />
                )
            case PropertyType.Integer:
            case PropertyType.Float:
                return numberInput;
            case PropertyType.ObjectLink:
            case PropertyType.String:
            case PropertyType.AutoCode:
            case PropertyType.DataLink:
            case PropertyType.Chat:
                return textInput;
            default:
                break;
        }
    }
    return (
        <>
            <ModalComponent
                handleClose={onClose}
                modalOpen={open}
                modalTitle={isUpdate ? "Update filter item" : "Create filter item"}
                onSubmit={handleSubmit}
            >
                <div className="inputContainer">
                    <TextInput
                        name="identifier_"
                        label="Identifier"
                        disabled={true}
                        size="medium"
                        defaultValue={identifier}
                    />
                    {
                        !isUpdate
                            ?
                            <AutoComplete
                                id={"propertySearch"}
                                label="Select a property"
                                placeholder="Type to search properties"
                                startIcon={<SearchOutlinedIcon />}
                                onInputChange={handlePropertyInputChange}
                                loading={inputFetchLoading}
                                onChange={propertySelected}
                                options={propertiesData}
                                groupBy={(option: PropertyForAutoControl) => option.moduleName}
                                getOptionLabel={(option: PropertyForAutoControl) => option.systemName}
                                value={property}
                                autoComplete={true}
                                name="propertyId"
                                clearAfterSelect={false}
                                disabled={!!props.filterItemData}
                            />
                            :
                            <TextInput
                                disabled={true}
                                defaultValue={props.filterItemData?.propertySystemName}
                                size="medium"
                            />
                    }


                    <Select
                        id="property"
                        values={getOperators()}
                        label="Operator"
                        labelField="label"
                        valueField="value"
                        disabled={selectedPropertyType == undefined}
                        handleChange={(value) => handleOperatorChange(value as number)}
                        name="operator"
                        defaultValue={props.filterItemData?.operator?.toString()}
                    // value={selectedRow?.htmlHeaderMode.toString()}
                    />
                    {
                        selectedOperator && !hideValueField.includes(selectedOperator) && getValueField()
                    }
                    <div className="display-none" style={{ height: 0, overflow: 'hidden' }}>
                        <TextInput id="id" defaultValue={props.filterItemData?.id} name="id" />
                        <TextInput id="identifier" defaultValue={identifier} name="identifier" />
                    </div>
                    <FormFooter loading={loading} cancelOnClick={onClose} />
                </div>
            </ModalComponent>
        </>
    )
}
