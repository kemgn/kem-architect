import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import React, { ReactNode, useContext, useEffect, useState } from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ColorCircle, Button, ColorPicker, Popover, Select, TextInput, Toggle, FormFooter, NumberInput, TabPanel } from "@ims/component-library";
import { createProperty, updateProperty } from "../../action";
import { AutoCodeResetPeriod, InputMaskType, PeriodLocation, Property, PropertyForAutoCompleteForUpdate, PropertyForBool, PropertyForBoolForUpdate, PropertyForCreate, PropertyForDataLinkForCreate, PropertyForDataLinkForUpdate, PropertyForDateTimeForCreate, PropertyForDateTimeForUpdate, PropertyForFloatForCreate, PropertyForFloatForUpdate, PropertyForIntegerForCreate, PropertyForIntegerForUpdate, PropertyForListForCreate, PropertyForListForUpdate, PropertyForObjectLinkForUpdate, PropertyForStringForUpdate, PropertyForSubjectLinkForUpdate, PropertyForTimeForUpdate, PropertyForTreeForUpdate, PropertyForUpdate, PropertyType, SearchAttributesExecutionRuleType, StringType } from "@/models/Entities/Property";
import { GetEnumValue } from "@/utils/Helpers";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";
import { ListService } from "@/services/List";
import { ModulesService } from "@/services/Modules";
import { Module } from "@/models/Entities/Module";
import { DataContract, FileAccessConfigurationMode, ViewProperty } from "@/models/Entities/DataContract";
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";
import { DataContractService } from "@/services/DataContract";
import { TreeRoot } from "@/models/Entities/Tree";
import { TreeService } from "@/services/Tree";
import { ProfileService } from "@/services/Profile";
import { Profile } from "@/models/Entities/Profile";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { ValueUnitService } from "@/services/ValueUnit";
import { ArchitectDataContext } from "@/app/(components)/_Contexts/ArchitectDataContext";
import { ListRoot } from "@/models/Entities/List";
import { IgnoreDisabledUsers, RenderStyle, SelectionPreference, SortOptionsBy, SubjectDisplayMode } from "@/models/Enums/Enums";
import ValueUnitSelect from "@/app/(components)/Form/Fields/ValueUnitSelect";
import GroupSelect from "@/app/(components)/Form/Fields/GroupSelect";
import TreeNodeSelect from "@/app/(components)/Form/Fields/TreeNodeSelect";

interface PropertyModalProps {
    onClose: Function;
    propertyData?: Property;
    onSuccessfulFormSubmit: Function;
    moduleId?: string;
    loadingModules?: boolean;
}
export default function PropertyModal(props: PropertyModalProps) {
    const [open, setOpen] = React.useState(true);
    const [propertyConfigArea, setPropertyConfigArea] = useState<React.ReactNode>(null);
    const [selectedProperty, setSelectedProperty] = useState<PropertyType>();
    // const [propertyTypeSelected, setPropertyTypeSelected] = useState<React.ReactNode>(null);
    const { showToastAlert } = useToast();
    const [loading, setLoading] = useState(false);


    //////////////////////////////////////////////////////////////////////////
    const AutoCodeForm = () => {
        const resetPeriod_ = [
            {
                value: AutoCodeResetPeriod.DoNotReset,
                label: "Do not reset"
            },
            {
                value: AutoCodeResetPeriod.ResetDaily,
                label: "Reset daily"
            },
            {
                value: AutoCodeResetPeriod.ResetMonthly,
                label: "Reset monthly"
            },
            {
                value: AutoCodeResetPeriod.ResetYearly,
                label: "Reset yearly"
            },
        ];
        const periodLocation = [
            {
                value: PeriodLocation.AfterPreappend,
                label: "After preappend"
            },
            {
                value: PeriodLocation.BeforePreappend,
                label: "Before preappend"
            },
            {
                value: PeriodLocation.AfterPostappend,
                label: "After postappend"
            },
            {
                value: PeriodLocation.BeforePostappend,
                label: "Before postappend"
            },
        ];
        const [resetPeriod, setResetPeriod] = useState<AutoCodeResetPeriod>(AutoCodeResetPeriod.DoNotReset);
        return (
            <>
                <TextInput name="preAppend" label="Pre append" size="medium" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.preAppend}></TextInput>
                <TextInput name="postAppend" label="Post append" size="medium" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.postAppend}></TextInput>
                <TextInput name="minIndexLength" label="Min index length" size="medium" type="number" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.minIndexLength?.toString()}></TextInput>
                <TextInput name="increment" label="Increment" size="medium" type="number" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.increment?.toString() || "1"}></TextInput>
                <TextInput name="currentIndex" label="Current index" size="medium" type="number" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.currentIndex?.toString()}></TextInput>
                <Select label="Auto code reset period" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.autoCodeResetPeriod?.toString()} values={resetPeriod_} name="autoCodeResetPeriod" handleChange={(value) => setResetPeriod(value)} />
                <Select disabled={resetPeriod === AutoCodeResetPeriod.DoNotReset} label="Period location" defaultValue={(props.propertyData as PropertyForAutoCompleteForUpdate)?.autoCodePeriodLocation?.toString()} values={periodLocation} name="autoCodePeriodLocation" />
                {/* <TextInput name="autoCodeResetPeriod" label="Auto code reset period" size="medium" type="number"value={(props.propertyData as PropertyForAutoCompleteForUpdate)?.autoCodeResetPeriod.toString()}></TextInput> */}
                {/* <TextInput label="Module system name" name="moduleSystemName" size="medium" value={(props.propertyData as PropertyForAutoCompleteForUpdate)?.moduleSystemName} /> */}
            </>
        );
    }
    const BoolForm = () => {
        return (
            <>
                <LabelFields namePrefix="falseLabels" labels={(props.propertyData as PropertyForBool)?.falseLabels} inputLabel="False label" />
                <LabelFields namePrefix="trueLabels" labels={(props.propertyData as PropertyForBool)?.trueLabels} inputLabel="True label" />
                {languages?.map(language => (
                    <>
                        <div style={{ display: 'none' }}>
                            <TextInput defaultValue={(props.propertyData as PropertyForBool)?.falseLabels?.find(x => x.languageID === language.id)?.id} name={"falseLabels" + language.id + "id"} />
                            <TextInput defaultValue={(props.propertyData as PropertyForBool)?.trueLabels?.find(x => x.languageID === language.id)?.id} name={"trueLabels" + language.id + "id"} />
                            <TextInput defaultValue={(props.propertyData as PropertyForBool)?.id} name={"id"} />
                        </div>
                    </>
                ))}
                {/* <TextInput id="trTrueLabel" name="trTrueLabel" label="trTrueLabel" size="medium" value={(props.propertyData as PropertyForBoolForUpdate)?.trueLabels.toString()}></TextInput>
                <TextInput id="trFalseLabel" name="trFalseLabel" label="trFalseLabel" size="medium" value={(props.propertyData as PropertyForBoolForUpdate)?.falseLabels.toString()}></TextInput>
                <TextInput id="enTrueLabel" name="enTrueLabel" label="enTrueLabel" size="medium" value={(props.propertyData as PropertyForBoolForUpdate)?.trueLabels.toString()}></TextInput>
                <TextInput id="enFalseLabel" name="enFalseLabel" label="enFalseLabel" size="medium" value={(props.propertyData as PropertyForBoolForUpdate)?.falseLabels.toString()}></TextInput> */}
            </>
        );
    }
    const ChatForm = () => {
        return (
            <>
            </>
        )
    }
    const DateTimeForm = () => {
        return (
            <>
                <Toggle label="Is date only" name="isDateOnly" defaultChecked={(props.propertyData as PropertyForDateTimeForUpdate)?.isDateOnly} />
                <Toggle label="Set create time" name="setCreateTime" defaultChecked={(props.propertyData as PropertyForDateTimeForUpdate)?.setCreateTime} />
                <Toggle label="Set modify time" name="setModifyTime" defaultChecked={(props.propertyData as PropertyForDateTimeForUpdate)?.setModifyTime} />
                <Toggle
                    id="autoSetToday"
                    label="Auto set today"
                    name="autoSetToday"
                    defaultChecked={(props.propertyData as PropertyForDateTimeForUpdate)?.autoSetToday}
                />
            </>

        )
    }
    const DataLinkForm = () => {
        const fileAccessConfigurationMode = [
            {
                label: "Inherit",
                value: FileAccessConfigurationMode.Inherit,
            },
            {
                label: "Preview allow & download allow",
                value: FileAccessConfigurationMode.PreviewAllow_DownloadAllow,
            },
            {
                label: "Preview allow download deny",
                value: FileAccessConfigurationMode.PreviewAllow_DownloadDeny,
            },
            {
                label: "Preview allow & download on failure",
                value: FileAccessConfigurationMode.PreviewAllow_DownloadOnFailure,
            },
            {
                label: "Preview deny & download allow",
                value: FileAccessConfigurationMode.PreviewDeny_DownloadAllow,
            },
        ]
        return (
            <>
                <Toggle label="Is report" name="isReport" defaultChecked={(props.propertyData as PropertyForDataLinkForUpdate)?.isReport} />
                <Toggle label="Is multi data" name="isMultiData" defaultChecked={(props.propertyData as PropertyForDataLinkForUpdate)?.isMultiData} />
                <Select label="File access configuration mode" defaultValue={(props.propertyData as PropertyForDataLinkForUpdate)?.dataLinkReportConfig?.toString()} values={fileAccessConfigurationMode} name="fileAccessConfigurationMode" />
                {/* <TextInput label="Infix" size="medium" name="infix"></TextInput> */}
                {/* <TextInput label="Postfix" size="medium" name="postfix"></TextInput> */}
            </>

        )
    }
    const IntegerForm = () => {
        const [valueUnitsData, setValueUnitsData] = useState<ValueUnit[]>([]);
        useEffect(() => {
            const setAllValueUnits = async () => {
                try {
                    debugger
                    const data = await ValueUnitService.getValueUnit();
                    setValueUnitsData(data);
                } catch (_) {
                    console.log();
                }
            }
            setAllValueUnits();
        }, [])
        return (
            <>
                <Toggle defaultChecked={(props.propertyData as PropertyForIntegerForUpdate)?.doNotUseThousandsSeperator} label="Do not use thousands separator" name="doNotUseThousandsSeperator" />
                <Select label="Value units" defaultValue={(props.propertyData as PropertyForIntegerForUpdate)?.valueUnitId} values={valueUnitsData?.map(root => ({ value: root.id, label: root.labels?.[0]?.label }))} name="valueUnit" />
            </>
        )
    }
    const FloatForm = () => {
        return (
            <>
                <TextInput name="precision" label="Precision" size="medium" type="number" defaultValue={(props.propertyData as PropertyForFloatForUpdate)?.precision}></TextInput>
                <Toggle label="Do not use thousands separator" name="doNotUseThousandsSeperator" defaultChecked={(props.propertyData as PropertyForFloatForUpdate)?.doNotUseThousandsSeperator} />
                <ValueUnitSelect defaultValue={(props.propertyData as PropertyForFloatForUpdate)?.valueUnitId} name="valueUnitId" />
            </>
        )
    }
    const ListForm = () => {
        const [listRoots, setListRoots] = useState<ListRoot[]>([]);

        useEffect(() => {
            const getAllListRoots = async () => {
                try {
                    const response = await ListService.getListRoots();
                    debugger
                    setListRoots(response.data || []);
                } catch (error) {
                    console.log(error + "error fetching list roots");
                }
            }
            getAllListRoots();
        }, [])

        const sortOptionsByValues = [
            {
                value: SortOptionsBy.ListRootSetting,
                label: "List root setting"
            },
            {
                value: SortOptionsBy.Manual,
                label: "Manual"
            },
            {
                value: SortOptionsBy.Threshold,
                label: "Threshold"
            },
            {
                value: SortOptionsBy.TimeCreated,
                label: "Time created"
            },
            {
                value: SortOptionsBy.Weight,
                label: "Weight"
            },
        ];
        const style = [
            {
                value: RenderStyle.PlainText,
                label: "Plain text"
            },
            {
                value: RenderStyle.ColoredText,
                label: "Colored text"
            },
            {
                value: RenderStyle.PlainBoldText,
                label: "Plain bold text"
            },
            {
                value: RenderStyle.ColoredBoldText,
                label: "Colored bold text"
            },
            {
                value: RenderStyle.BoxPlainText,
                label: "Box plain text"
            },
            {
                value: RenderStyle.BoxColoredText,
                label: "Box colored text"
            },
            {
                value: RenderStyle.BoxPlainBoldText,
                label: "Box plain bold text"
            },
            {
                value: RenderStyle.BoxColoredBoldText,
                label: "Box colored bold text"
            },
            {
                value: RenderStyle.FillPlainText,
                label: "Fill plain text"
            },
            {
                value: RenderStyle.FillColoredText,
                label: "Fill colored text"
            },
            {
                value: RenderStyle.FillPlainBoldText,
                label: "Fill plain bold text"
            },
            {
                value: RenderStyle.FillColoredBoldText,
                label: "Fill colored bold text"
            },
            {
                value: RenderStyle.UseListOptionSettings,
                label: "Use list option settings"
            },
        ];
        debugger
        return (
            <>
                <Toggle label="Is multi select" name="isMultiSelect" defaultChecked={(props.propertyData as PropertyForListForUpdate)?.isMultiSelect} />
                <Toggle label="Auto set values on parent change" name="autoSetValuesOnParentChange" defaultChecked={(props.propertyData as PropertyForListForUpdate)?.autoSetValuesOnParentChange} />
                {/* <TextInput label="Sort options by" name="sortOptionsBy" size="medium" type="number" defaultValue={(props.propertyData as PropertyForListForUpdate)?.sortOptionsBy} /> */}
                <Select label="Sort options by" values={sortOptionsByValues} name="sortOptionsBy" defaultValue={(props.propertyData as PropertyForListForUpdate)?.sortOptionsBy.toString() || SortOptionsBy.ListRootSetting.toString()} />
                <Select label="Style" values={style} name="renderStyle" defaultValue={(props.propertyData as PropertyForListForUpdate)?.renderStyle.toString() || RenderStyle.UseListOptionSettings.toString()} />
                <Select label="List root" values={listRoots.map(root => ({ value: root.id, label: root.systemName }))} name="listRootId" defaultValue={(props.propertyData as PropertyForListForUpdate)?.listRootID.toString()} />
            </>
        )
    }
    const ObjectLinkForm = () => {
        const architectDataContext = useContext(ArchitectDataContext);
        if (!architectDataContext) {
            throw new Error("useArchitectData must be used within a ArchitectDataProvider");
        }
        const { modules } = architectDataContext;

        // const [modules, setModules] = useState<Module[]>([]);
        const [moduleId, setModuleId] = useState<string>();
        const [properties, setProperties] = useState<EnumForSelect[]>();
        const [views, setViews] = useState<DataContract[]>();
        const [profiles, setProfiles] = useState<Profile[]>();
        const [contractDisplayPropertyId, setContractDisplayPropertyId] = useState<string>((props.propertyData as PropertyForObjectLinkForUpdate)?.contractDisplayPropertyID);
        const [selectedViewId, setSelectedViewId] = useState<string>();
        // useEffect(() => {
        //     const getAllModules = async () => {
        //         try {
        //             const data = await ModulesService.getAllModules();
        //             setModules(data);
        //         } catch (_) {
        //             console.log();
        //         }
        //     }
        //     getAllModules();
        // }, [])
        debugger
        useEffect(() => {
            if ((props.propertyData as PropertyForObjectLinkForUpdate)?.moduleID) {
                modulesHandleChange((props.propertyData as PropertyForObjectLinkForUpdate)?.moduleID);
            }
        }, [])

        useEffect(() => {
            console.log(properties);
            if (properties) {
                profileshandleChange();
            }
        }, [properties])

        const modulesHandleChange = async (moduleId: string) => {
            if (moduleId) {
                const viewData = await DataContractService.getAllDataContracts(moduleId);
                if (isUpdate) {
                    viewHandleChange((props.propertyData as PropertyForObjectLinkForUpdate)?.contractID, viewData, moduleId);
                }
                setViews(viewData.filter(x => x.parentDataContractId === "" || x.parentDataContractId == undefined));
                setModuleId(moduleId);
            }
        }

        const viewHandleChange = async (viewId: string, viewData?: DataContract[], moduleId_?: string) => {
            if (viewId) {
                let propertyData;
                let finalModuleId = moduleId;
                setSelectedViewId(viewId);
                if (isUpdate && viewData) {
                    propertyData = viewData?.find(x => x.id === viewId)?.dataContractUIProperties;
                    finalModuleId = moduleId_;
                } else {
                    propertyData = views?.find(x => x.id === viewId)?.dataContractUIProperties;
                }

                const propertySelectValues: EnumForSelect[] = propertyData?.map(x => {
                    const properties = modules.find(y => y.id === finalModuleId)?.properties;
                    const propUIId = properties?.find(z => z.id === (x as ViewProperty).propertyId)?.id;
                    const propertySystemName = properties?.find(y => y.id === (x as ViewProperty).propertyId)?.systemName;
                    debugger;
                    return (
                        {
                            value: propUIId,
                            label: propertySystemName || ""
                        }
                    )
                }) || [];
                setProperties(propertySelectValues);
            }
        }
        const propertyHandleChange = (propertyId: string) => {
            const propId = modules.find(x=>x.id === moduleId)?.properties?.find(x=>x.id === propertyId)?.id;
            const dcPropId = (views?.find(x=>x.id === selectedViewId)?.dataContractUIProperties?.find(x=>(x as ViewProperty).propertyId === propId) as ViewProperty)?.id;
            setContractDisplayPropertyId(dcPropId);
        }

        const profileshandleChange = async () => {
            try {
                const data = await ProfileService.getAllProfiles();
                debugger
                setProfiles(data);
            } catch (_) {
            }
        }
        return (
            <>
                <Toggle id="searchAllOnEmptyValueClick" label="Search all on empty value click" name="searchAllOnEmptyValueClick" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.searchAllOnEmptyValueClick} />
                <Toggle id="prohibitSetValueByLinking" label="Prohibit set value by linking" name="prohibitSetValueByLinking" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.prohibitSetValueByLinking} />
                <Toggle id="keepHistory" label="Keep history" name="keepHistory" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.keepHistory} />
                <Toggle id="isMultiSelect" label="Is multi select" name="isMultiSelect" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.isMultiSelect} />
                <Toggle id="reverseIsMultiSelect" label="Reverse is multi select" name="reverseIsMultiSelect" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.reverseIsMultiSelect} />
                <Toggle id="createReverseProperty" label="Create reverse property" name="createReverseProperty" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.createReverseProperty} />
                <Toggle id="actAsOwner" label="Act as owner" name="actAsOwner" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.actAsOwner} />
                <Toggle id="childsCohesive" label="Childs cohesive" name="childsCohesive" defaultChecked={(props.propertyData as PropertyForObjectLinkForUpdate)?.childsCohesive} />
                
                <Select
                    label="Modules"
                    values={modules?.map((modules) => ({ value: modules.id, label: modules.systemName })) || []}
                    id="modules"
                    name="modules"
                    handleChange={(e) => modulesHandleChange(e)}
                    loading={modules ? false : true}
                    defaultValue={(props.propertyData as PropertyForObjectLinkForUpdate)?.moduleID}
                />
                <Select
                    label="Views"
                    values={views?.map((views) => ({ value: views.id, label: views.systemName })) || []}
                    id="views"
                    name="views"
                    handleChange={(e) => viewHandleChange(e)}
                    loading={views ? false : true}
                    defaultValue={(props.propertyData as PropertyForObjectLinkForUpdate)?.contractID}
                />

                <Select
                    label="Properties"
                    values={properties?.filter((x) => {
                        const valueType = x?.value?.split(':').pop();
                        return ["AutoCode", "SubjectLink", "String"].includes(valueType);
                    })}
                    id="properties"
                    name="properties"
                    handleChange={propertyHandleChange}
                    loading={properties ? false : true}
                    defaultValue={(props.propertyData as PropertyForObjectLinkForUpdate)?.displayPropertyID}
                />
                <Select
                    label="Profiles"
                    values={profiles?.map((profiles) => ({ value: profiles.profileReferenceId, label: profiles.systemName })) || []}
                    id="profiles"
                    name="defaultProfileID"
                    handleChange={() => profileshandleChange()}
                    loading={properties ? false : true}
                    defaultValue={(props.propertyData as PropertyForObjectLinkForUpdate)?.defaultProfileID}
                />
                <div style={{ display: "none" }}>
                    <TextInput name="contractDisplayPropertyId" value={contractDisplayPropertyId} />
                </div>
            </>
        )
    }
    const TreeForm = () => {
        const [treeRoot, setTreeRoot] = useState<TreeRoot[]>([]);
        const [treeRootId, setTreeRootId] = useState<string>((props.propertyData as PropertyForTreeForUpdate)?.treeRootID);

        useEffect(() => {
            const getAllTreeRoots = async () => {
                try {
                    const response = await TreeService.getTreeRoots();
                    setTreeRoot(response || []);
                } catch (error) {
                    console.log(error + "error fetching Tree roots");
                }
            }
            getAllTreeRoots();
        }, [])
        return (
            <>
                <Toggle id="isMultiSelect" label="Is multi select" name="isMultiSelect" defaultChecked={(props.propertyData as PropertyForTreeForUpdate)?.isMultiSelect} />
                <Toggle id="isLinkedListSelect" label="Is linked list select" name="isLinkedListSelect" defaultChecked={(props.propertyData as PropertyForTreeForUpdate)?.isLinkedListSelect} />
                <Select label="Tree root" values={treeRoot.map(root => ({ value: root.id, label: root.systemName }))} name="treeRootId" defaultValue={(props.propertyData as PropertyForTreeForUpdate)?.treeRootID} handleChange={(value: string) => {debugger; setTreeRootId(value);}}/>
                <TreeNodeSelect label="Top node" treeRootId={treeRootId} defaultValue={(props.propertyData as PropertyForTreeForUpdate)?.treeRootParentNodeID} name="treeRootParentNodeID"/>
            </>
        )
    }
    const TimeForm = () => {
        return (
            <>
                <Toggle id="isDuration" label="Is duration" name="isDuration" defaultChecked={(props.propertyData as PropertyForTimeForUpdate)?.isDuration} />
            </>
        )
    }
    const SubjectLinkForm = () => {
        const [searchByAttributes, setSearchByAttributes] = useState<boolean>((props.propertyData as PropertyForSubjectLinkForUpdate)?.searchByLDAPAttributes);
        const ignoreDisabledUsers = [
            {
                value: IgnoreDisabledUsers.InheritSystemSetting,
                label: "Inherit system settings"
            },
            {
                value: IgnoreDisabledUsers.Enable,
                label: "Enable"
            },
            {
                value: IgnoreDisabledUsers.Disable,
                label: "Disable"
            },
        ];
        const selectionPreference = [
            {
                value: SelectionPreference.UserOnly,
                label: "User only"
            },
            {
                value: SelectionPreference.GroupOnly,
                label: "Group only"
            },
            {
                value: SelectionPreference.UserOrGroup,
                label: "User or group"
            },
        ];
        const subjectDisplayMode = [
            {
                value: SubjectDisplayMode.DisplayName,
                label: "Display name"
            },
            {
                value: SubjectDisplayMode.DisplayNameAndAccountName,
                label: "Display name [account.name]"
            },
            {
                value: SubjectDisplayMode.DisplayNameAndDomainAndAccountName,
                label: "Display name [DOMAIN\account.name]"
            },
            {
                value: SubjectDisplayMode.DisplayNameAndEmail,
                label: "Display name [email@domain.url]"
            },
        ];
        const searchAttributesExecutionRule = [
            {
                value: SearchAttributesExecutionRuleType.IntersectResults,
                label: "Intersect results"
            },
            {
                value: SearchAttributesExecutionRuleType.CombineResults,
                label: "Combine results"
            },
            {
                value: SearchAttributesExecutionRuleType.CascadeAttributeResults,
                label: "Cascade attribute results"
            },
        ];
        const getBoolEnumValue = (value?: boolean) => {
            if (value) {
                return 1;
            } else if (value === false) {
                return 2;
            } else if (value === null) {
                return 0;
            } else if (value === undefined) {
                return 0;
            }
        }
        return (
            <>
                <Toggle label="Is multi select" name="isMultiSelect" defaultChecked={(props.propertyData as PropertyForSubjectLinkForUpdate)?.isMultiSelect} />
                <Toggle label="Is creator" name="isCreator" defaultChecked={(props.propertyData as PropertyForSubjectLinkForUpdate)?.isCreator} />
                <Toggle label="Is modifier" name="isModifier" defaultChecked={(props.propertyData as PropertyForSubjectLinkForUpdate)?.isModifier} />
                <TextInput label="Extended properties" name="extendedProperties" size="medium" defaultValue={(props.propertyData as PropertyForSubjectLinkForUpdate)?.extendedProperties}></TextInput>
                <TextInput label="LDAP search roots" name="activeDirectorySearchRoot" size="medium" defaultValue={(props.propertyData as PropertyForSubjectLinkForUpdate)?.activeDirectorySearchRoot}></TextInput>
                <Select label="Display mode" defaultValue={(props.propertyData as PropertyForSubjectLinkForUpdate)?.displayModeType?.toString()} values={subjectDisplayMode} name="displayModeType" />
                <Select label="Ignore disabled users" defaultValue={getBoolEnumValue((props.propertyData as PropertyForSubjectLinkForUpdate)?.ignoreDisabledActiveDirectoryUsers as unknown as boolean)?.toString()} values={ignoreDisabledUsers} name="ignoreDisabledActiveDirectoryUsers" />
                <Select label="Selection preference" defaultValue={getBoolEnumValue((props.propertyData as PropertyForSubjectLinkForUpdate)?.isUsersOnly as unknown as boolean)?.toString()} values={selectionPreference} name="isUsersOnly" />
                <GroupSelect name="userSearchFilterGroupID" groupId={(props.propertyData as PropertyForSubjectLinkForUpdate)?.userSearchFilterGroupID} />
                <Toggle label="Search by attributes" name="searchByLDAPAttributes" defaultChecked={(props.propertyData as PropertyForSubjectLinkForUpdate)?.searchByLDAPAttributes} onChange={(event, checked) => setSearchByAttributes(checked)} />
                <div className={!searchByAttributes ? "display-none" : ""}>
                    <TextInput label="Search attributes" name="searchAttributes" size="medium" defaultValue={(props.propertyData as PropertyForSubjectLinkForUpdate)?.searchAttributes}></TextInput>
                    <Select label="Attribute search method" defaultValue={(props.propertyData as PropertyForSubjectLinkForUpdate)?.searchAttributesExecutionRule?.toString()} values={searchAttributesExecutionRule} name="searchAttributesExecutionRule" />
                </div>
            </>
        )
    }
    const StringForm = () => {
        const stringTypeOptions = [
            {
                value: StringType.SingleLine,
                label: "Single line",
            },
            {
                value: StringType.MultiLine,
                label: "Mutli line",
            },
            {
                value: StringType.RichText,
                label: "RichText",
            },
            {
                value: StringType.Markdown,
                label: "Markdown",
            },
        ]

        const inputMaskTypeOptions = Object.keys(InputMaskType)
            .filter((key) => isNaN(Number(key)))
            .map((key) => ({
                value: InputMaskType[key as keyof typeof InputMaskType],
                label: key
            }));

        return (
            <>
                <Select
                    label="String type"
                    values={stringTypeOptions}
                    name="stringType"
                    defaultValue={(props.propertyData as PropertyForStringForUpdate)?.stringType.toString() || StringType.SingleLine}
                />
                <Select
                    label="Input mask type"
                    values={inputMaskTypeOptions}
                    id="InputMaskType"
                    name="InputMaskType"
                    defaultValue={(props.propertyData as PropertyForStringForUpdate)?.inputMaskType.toString()}
                />
            </>
        );
    };



    const propertyTypeOptions: EnumForSelect[] = [
        {
            label: "Auto code",
            value: PropertyType.AutoCode,
        },
        {
            label: "Bool",
            value: PropertyType.Bool,
        },
        {
            label: "Chat",
            value: PropertyType.Chat,
        },
        {
            label: "Data link",
            value: PropertyType.DataLink,
        },
        {
            label: "Date time",
            value: PropertyType.DateTime,
        },
        {
            label: "Float",
            value: PropertyType.Float,
        },
        {
            label: "Integer",
            value: PropertyType.Integer,
        },
        {
            label: "List",
            value: PropertyType.List,
        },

        {
            label: "Object link",
            value: PropertyType.ObjectLink,
        },
        {
            label: "String",
            value: PropertyType.String,
        },
        {
            label: "Subject link",
            value: PropertyType.SubjectLink,
        },
        {
            label: "Time",
            value: PropertyType.Time,
        },
        {
            label: "Tree",
            value: PropertyType.Tree,
        },

    ]

    useEffect(() => {
        console.log(props.propertyData?.type);
        const propType = GetEnumValue(PropertyType, props.propertyData?.type);
        if (props.propertyData?.type) {
            calculateFormContents(propType);
            setSelectedProperty(propType);
        }
    }, [props.propertyData?.type]);

    enum RenderedPage {
        General,
        Config,
    }
    const isUpdate = !!props.propertyData;
    const labelFieldsPrefix = "Property";
    const languages = useContext(LanguagesContext);

    const [renderedPageEnum, setRenderedPageEnum] = useState<RenderedPage>(RenderedPage.General);
    const handleClose = (data: any) => {
        props.onClose();
        if (data?.operation === "update" || data?.operation === "create") {
            props.onSuccessfulFormSubmit(data);
        }
        setOpen(false);
    };

    const calculateFormContents = (selectedProperty_: PropertyType | undefined) => {
        switch (selectedProperty_) {
            case PropertyType.AutoCode:
                setPropertyConfigArea(<AutoCodeForm />);
                break;
            case PropertyType.Bool:
                setPropertyConfigArea(<BoolForm />);
                break;
            case PropertyType.Chat:
                setPropertyConfigArea(<ChatForm />);
                break;
            case PropertyType.DateTime:
                setPropertyConfigArea(<DateTimeForm />);
                break;
            case PropertyType.DataLink:
                setPropertyConfigArea(<DataLinkForm />);
                break;
            case PropertyType.Integer:
                setPropertyConfigArea(<IntegerForm />);
                break;
            case PropertyType.Float:
                setPropertyConfigArea(<FloatForm />);
                break;
            case PropertyType.List:
                setPropertyConfigArea(<ListForm />);
                break;
            case PropertyType.ObjectLink:
                setPropertyConfigArea(<ObjectLinkForm />)
                break;
            case PropertyType.Tree:
                setPropertyConfigArea(<TreeForm />);
                break;
            case PropertyType.Time:
                setPropertyConfigArea(<TimeForm />);
                break;
            case PropertyType.SubjectLink:
                setPropertyConfigArea(<SubjectLinkForm />);
                break;
            case PropertyType.String:
                setPropertyConfigArea(<StringForm />);
                break;
            default:
                break;
        }
    }
    const changedTypeField = (e: PropertyType) => {
        calculateFormContents(e);
        setSelectedProperty(e);
    }
    const architectData = useContext(ArchitectDataContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            if (isUpdate) {
                const result: { isSuccess: boolean, updatedProperty?: PropertyForUpdate } = await updateProperty(formData, labelFieldsPrefix, languages, selectedProperty);
                if (result.isSuccess) {
                    showToastAlert(messages.updatePropertySuccess.severity, messages.updatePropertySuccess.content, messages.updatePropertySuccess.title)
                    handleClose({ data: result.updatedProperty, operation: "update" });
                    architectData?.refreshModules();
                }
                else {
                    showToastAlert(messages.updatePropertyError.severity, messages.updatePropertyError.content, messages.updatePropertyError.title)
                }
            } else {
                const result: { isSuccess: boolean, createdproperty?: PropertyForCreate } = await createProperty(formData, labelFieldsPrefix, selectedProperty, languages);
                if (result.isSuccess) {
                    showToastAlert(messages.createPropertySuccess.severity, messages.createPropertySuccess.content, messages.createPropertySuccess.title)
                    handleClose({ data: result.createdproperty, operation: "create" });
                    architectData?.refreshModules();
                }
                else {
                    showToastAlert(messages.createPropertyError.severity, messages.createPropertyError.content, messages.createPropertyError.title)
                }
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    console.log("props.propertyData::", props.propertyData?.type)

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal}>
                    <FormHeader title={props.propertyData ? "Update Property" : "Create Property"} variant="h5" />
                    <div className="flex justify-content-space-around mb-16">
                        <Button
                            label="General"
                            onClick={() => setRenderedPageEnum(RenderedPage.General)}
                        />
                        <Button
                            label="Config"
                            onClick={() => setRenderedPageEnum(RenderedPage.Config)}
                            disabled={!propertyConfigArea}
                        />
                    </div>
                    <div className="inputContainer">
                        <form onSubmit={handleSubmit}>
                            <div className={renderedPageEnum === RenderedPage.General ? "" : "display-none"}>
                                <TextInput id="systemName" label="System name" name="systemName" size="medium" defaultValue={props.propertyData?.systemName} />
                                <Toggle id="isUnique" label="Is unique" name="isUnique" defaultChecked={props.propertyData?.isUnique} />
                                <Toggle id="isFormula" label="Is formula" name="isFormula" defaultChecked={props.propertyData?.isFormula} />
                                <Select
                                    id="type"
                                    label={"Property type"}
                                    name="typeInt"
                                    values={propertyTypeOptions}
                                    handleChange={(e: any) => changedTypeField(e)}
                                    valueField="value"
                                    labelField="label"
                                    defaultValue={props.propertyData?.type.toString()}
                                    value={GetEnumValue(PropertyType, props.propertyData?.type.toString() || "")}
                                    disabled={isUpdate}
                                />
                                <LabelFields namePrefix={labelFieldsPrefix} labels={props.propertyData?.labels} />
                                <div className="display-none">
                                    <TextInput id="moduleUIId" defaultValue={props.moduleId} name="moduleUIId" />
                                    <TextInput id="id" defaultValue={props.propertyData?.id} name="id" />
                                    {languages?.map(language => (
                                        <TextInput key={language.id} id={language.id} defaultValue={props.propertyData?.labels?.find(x => x.languageID === language.id)?.id} name={labelFieldsPrefix + language.id + "id"} />
                                    ))}
                                    <TextInput id="moduleUIId" defaultValue={props.moduleId} name="moduleUIId" />
                                    <TextInput id="id" defaultValue={props.propertyData?.id} name="id" />
                                </div>
                            </div>
                            <div className={renderedPageEnum === RenderedPage.Config ? "" : "display-none"}>
                                {propertyConfigArea}
                            </div>
                            <FormFooter className="ModulesFooter" loading={loading} cancelOnClick={handleClose} saveOnClick={() => { handleSubmit }} />
                        </form>
                    </div>

                </Box>
            </Modal>
        </>
    )
}