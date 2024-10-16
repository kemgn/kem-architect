// 'use server';
import { ModuleForCreate, ModuleForDelete, ModuleForUpdate } from "@/models/Entities/Module";
import { PropertyType, StringType } from "@/models/Entities/Property";
import { ModulesService } from "@/services/Modules";
import { ArrangeLabelsPack } from "@/utils/Helpers";

const getBoolValueForSubjectProps = (value: number) => {
    switch (value) {
        case 1:
            return true;
        case 2:
            return false;
        default:
            case 0:
        return null;
    }
}

export async function createModule(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const ModuleForCreate : ModuleForCreate = {
            systemName: formData.get("systemName") as string,
            isSystem: true,
            keepHistory: (formData.get("keepHistory") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            isLabelsCustomizable: (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            unionUniqueProperties: (formData.get("unionUniqueProperties") as string) === "on" ? true : false,
            labels: languages ? languages.map(language => {
                return {
                    LanguageID: language.id,
                    Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description: "",
                }
            }) : [],
        }
        const createdModule: ModuleForCreate = await ModulesService.createModule(ModuleForCreate );
        return { isSuccess: true, createdModule };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function createProperty(formData: FormData, propertyFieldsPrefix: string, propertyTypeInputValue?: number, languages?: Language[]) {
    try {
        let propertyTypeData: any = {};
        let propertyData: any = {};
        switch (propertyTypeInputValue) {
            case PropertyType.AutoCode:
                //AutoCode
                propertyTypeData = {
                    // lastDate: formData.get("lastDate") as string,
                    preAppend: formData.get("preAppend") as string,
                    postAppend: formData.get("postAppend") as string,
                    minIndexLength: parseInt(formData.get("minIndexLength") as string) || 0,
                    increment: parseInt(formData.get("increment") as string) || 0,
                    currentIndex: parseInt(formData.get("currentIndex") as string) || 0,
                    autoCodeResetPeriod: parseInt(formData.get("autoCodeResetPeriod") as string),
                    autoCodePeriodLocation: parseInt(formData.get("autoCodePeriodLocation") as string),
                };
                break;
            case PropertyType.Bool:
                //Bool
                propertyTypeData = {
                    // trTrueLabel: formData.get("trTrueLabel") as string,
                    // trFalseLabel: formData.get("trFalseLabel") as string,
                    // enTrueLabel: formData.get("enTrueLabel") as string,
                    // enFalseLabel: formData.get("enFalseLabel") as string,
                    trueLabels: languages?.map(language => {
                        return {
                            LanguageID: language.id,
                            Label: formData.get(`trueLabels${language.id}`) as string,
                            Description: "",
                        }
                    }),
                    falseLabels: languages?.map(language => {
                        return {
                            LanguageID: language.id,
                            Label: formData.get(`falseLabels${language.id}`) as string,
                            Description: "",
                        }
                    }),
                };
                break;
            case PropertyType.Chat:
                //Chat
                propertyTypeData = {

                }
                break;
            case PropertyType.DateTime:
                //DateTime
                propertyTypeData = {
                    isDateOnly: (formData.get("isDateOnly") as string) === "on" ? true : false,
                    setCreateTime: (formData.get("setCreateTime") as string) === "on" ? true : false,
                    setModifyTime: (formData.get("setModifyTime") as string) === "on" ? true : false,
                    autoSetToday: (formData.get("autoSetToday") as string) === "on" ? true : false,
                }
                debugger;
                break;
            case PropertyType.DataLink:
                //DataLink
                propertyTypeData = {
                    isReport: (formData.get("isReport") as string) === "on" ? true : false,
                    isMultiData: (formData.get("isMultiData") as string) === "on" ? true : false,
                    FileAccessConfigurationModeType: parseInt(formData.get("fileAccessConfigurationMode") as string) || 0,
                    // infix: formData.get("infix") as string,
                    // postfix: formData.get("postfix") as string,
                }
                debugger
                break;
            case PropertyType.Integer:
                //Integer
                propertyTypeData = {
                    doNotUseThousandsSeperator: (formData.get("doNotUseThousandsSeperator") as string) === "on" ? true : false,
                    ValueUnitId: formData.get("valueUnit") as string,
                }
                break;
            case PropertyType.Float:
                //Float
                propertyTypeData = {
                    precision: parseInt(formData.get("precision") as string),
                    valueUnitId: formData.get("valueUnitId") as string,
                    doNotUseThousandsSeperator: (formData.get("doNotUseThousandsSeperator") as string) === "on" ? true : false,
                }
                break;
            case PropertyType.List:
                //List
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    autoSetValuesOnParentChange: (formData.get("autoSetValuesOnParentChange") as string) === "on" ? true : false,
                    sortOptionsBy: parseInt(formData.get("sortOptionsBy") as string) || 0,
                    renderStyle: parseInt(formData.get("renderStyle") as string) || 0,
                    listRootID: formData.get("listRootId") as string,
                }
                break;
            case PropertyType.ObjectLink:
                //ObjectLink
                propertyTypeData = {
                    keepHistory: (formData.get("keepHistory") as string) === "on" ? true : false,
                    searchAllOnEmptyValueClick: (formData.get("searchAllOnEmptyValueClick") as string) === "on" ? true : false,
                    prohibitSetValueByLinking: (formData.get("prohibitSetValueByLinking") as string) === "on" ? true : false,
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    reverseIsMultiSelect: (formData.get("reverseIsMultiSelect") as string) === "on" ? true : false,
                    createReverseProperty: (formData.get("createReverseProperty") as string) === "on" ? true : false,
                    actAsOwner: (formData.get("actAsOwner") as string) === "on" ? true : false,
                    childsCohesive: (formData.get("childsCohesive") as string) === "on" ? true : false,
                    moduleID: formData.get("modules") as string,
                    contractID: formData.get("views") as string,
                    displayPropertyID: formData.get("properties") as string,
                    defaultProfileID: formData.get("defaultProfileID") as string,
                    contractDisplayPropertyId: formData.get("contractDisplayPropertyId") as string,
                }
                debugger;
                break;
            case PropertyType.Tree:
                //Tree
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    isLinkedListSelect: (formData.get("isLinkedListSelect") as string) === "on" ? true : false,
                    treeRootID: formData.get("treeRootId") as string,
                    treeRootParentNodeID: formData.get("treeRootParentNodeID") as string,
                }
                break;
            case PropertyType.Time:
                //Time
                propertyTypeData = {
                    isDuration: (formData.get("isDuration") as string) === "on" ? true : false,
                }
                break;
            case PropertyType.SubjectLink:
                //SubjectLink
                //eksik bu eklenecek 
               
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    isCreator: (formData.get("isCreator") as string) === "on" ? true : false,
                    isModifier: (formData.get("isModifier") as string) === "on" ? true : false,
                    extendedProperties: formData.get("extendedProperties") as string,
                    activeDirectorySearchRoot: formData.get("activeDirectorySearchRoot") as string,
                    displayModeType: parseInt(formData.get("displayModeType") as string) || 0,
                    ignoreDisabledActiveDirectoryUsers: getBoolValueForSubjectProps(parseInt(formData.get("ignoreDisabledActiveDirectoryUsers") as string)),
                    isUsersOnly: getBoolValueForSubjectProps(parseInt(formData.get("isUsersOnly") as string)),
                    searchByLDAPAttributes: (formData.get("searchByLDAPAttributes") as string) === "on" ? true : false,
                    searchAttributes: formData.get("searchAttributes") as string,
                    searchAttributesExecutionRule: parseInt(formData.get("searchAttributesExecutionRule") as string) || 0,
                    userSearchFilterGroupID: formData.get("userSearchFilterGroupID") as string,
                }
                debugger
                break;
            case PropertyType.String:
                //string
                propertyTypeData = {
                    stringType: parseInt(formData.get("stringType") as string) || StringType.SingleLine,
                    inputMaskType: parseInt(formData.get("inputMaskType") as string) || 0,
                }
                break;
        }
        const moduleId = formData.get("moduleUIId") as string;
        propertyData = {
            typeInt: propertyTypeInputValue,
            systemName: formData.get("systemName") as string,
            isFormula: (formData.get("isFormula") as string) === "on",
            isSystem : true,
            labels: languages?.map(language => {
                return {
                    LanguageID: language.id,
                    Label: (formData.get(`${propertyFieldsPrefix}${language.id}`) as string),
                    Description: "",
                }
            }),
        };
        const property = { ...propertyTypeData, ...propertyData };

        const finalData = {
            moduleUIId: moduleId,
            properties: [
                property
            ]
        }
        debugger
        const createdProperty = await ModulesService.createProperty(finalData);
        return { isSuccess: true, createdProperty };
    } catch (error) {
        console.error("Error:", error);
        return { isSuccess: false, createdProperty: null };
    }
}



export async function deleteModule(formData: FormData) {
    try {
        const moduleForDelete: ModuleForDelete = {
            id: formData.get("id") as string,
        }
        const deletedModule: ModuleForDelete = await ModulesService.deleteModule(moduleForDelete);
        return { isSuccess: true, deletedModule };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateModule(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const moduleForUpdate: ModuleForUpdate = {
            id: formData.get("id") as string,
            isSystem: true,
            keepHistory: (formData.get("keepHistory") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            isLabelsCustomizable: (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            unionUniqueProperties: (formData.get("unionUniqueProperties") as string) === "on" ? true : false,
            //properties:[],
            // labels: {
            //     updated: languages?.map(language => {
            //         return {
            //             Id: (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
            //             LanguageID: language.id,
            //             Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
            //             Description: "",
            //         }
            //     }) || []
            // },
            labels: ArrangeLabelsPack(formData, labelFieldsPrefix, languages),
        }
        const updatedModule: ModuleForUpdate = await ModulesService.updateModule(moduleForUpdate);
        return { isSuccess: true, updatedModule };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateProperty(formData: FormData, labelFieldsPrefix: string, languages?: Language[], propertyTypeInputValue?: number,) {
    //  try {
    //      const module: ModuleForUpdate = {
    //          id: formData.get("id") as string,
    //          isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
    //          keepHistory: (formData.get("keepHistory") as string) === "on" ? true : false,
    //          isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
    //          isLabelsCustomizable: (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
    //          isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
    //          unionUniqueProperties: (formData.get("unionUniqueProperties") as string) === "on" ? true : false,

    //          labels: {
    //              updated: languages?.map(language => {
    //                  return {
    //                      Id: (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
    //                      LanguageID: language.id,
    //                      Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
    //                      Description: "",
    //                  }
    //              }) || []
    //          },
    //      }
    //      const updatedModule: ModuleForUpdate = await ModulesService.updateModule(module);
    //      return { isSuccess: true, updatedModule };
    //  } catch (error) {
    //      return { isSuccess: false, null: null };
    //  }

    try {
        let propertyTypeData: any = {};
        let propertyData: any = {};
        switch (propertyTypeInputValue) {
            case PropertyType.AutoCode:
                propertyTypeData = {
                    preAppend: formData.get("preAppend") as string,
                    postAppend: formData.get("postAppend") as string,
                    minIndexLength: parseInt(formData.get("minIndexLength") as string) || 0,
                    increment: parseInt(formData.get("increment") as string) || 0,
                    currentIndex: parseInt(formData.get("currentIndex") as string) || 0,
                    autoCodeResetPeriod: parseInt(formData.get("autoCodeResetPeriod") as string),
                    autoCodePeriodLocation: parseInt(formData.get("autoCodePeriodLocation") as string),
                };
                break;
            case PropertyType.Bool:
                propertyTypeData = {
                    trueLabels: {
                        updated: languages?.map(language => {
                            return {
                                Id: (formData.get(`trueLabels${language.id}id`) as string),
                                LanguageID: language.id,
                                Label: formData.get(`trueLabels${language.id}`) as string,
                                Description: "",
                            }
                        })
                    },
                    falseLabels: {
                        updated: languages?.map(language => {
                            return {
                                Id: (formData.get(`falseLabels${language.id}id`) as string),
                                LanguageID: language.id,
                                Label: formData.get(`falseLabels${language.id}`) as string,
                                Description: "",
                            }
                        })
                    },
                };
                break;
            case PropertyType.Chat:
                propertyTypeData = {

                }
                break;
            case PropertyType.DateTime:
                propertyTypeData = {
                    isDateOnly: (formData.get("isDateOnly") as string) === "on" ? true : false,
                    setCreateTime: (formData.get("setCreateTime") as string) === "on" ? true : false,
                    setModifyTime: (formData.get("setModifyTime") as string) === "on" ? true : false,
                    autoSetToday: (formData.get("autoSetToday") as string) === "on" ? true : false,
                }
                break;
            case PropertyType.DataLink:
                propertyTypeData = {
                    isReport: (formData.get("isReport") as string) === "on" ? true : false,
                    fileAccessConfigurationMode: parseInt(formData.get("fileAccessConfigurationMode") as string) || 0,
                    infix: formData.get("infix") as string,
                    postfix: formData.get("postfix") as string,
                }
                break;
            case PropertyType.Integer:
                propertyTypeData = {
                    precision: formData.get("precision") as string,
                    valueUnitId: formData.get("valueUnit") as string,
                }
                break;
            case PropertyType.Float:
                propertyTypeData = {
                    precision: parseInt(formData.get("precision") as string),
                    valueUnitId: formData.get("valueUnitId") as string,
                    doNotUseThousandsSeperator: (formData.get("doNotUseThousandsSeperator") as string) === "on" ? true : false,
                }
                break;
            case PropertyType.List:
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    autoSetValuesOnParentChange: (formData.get("autoSetValuesOnParentChange") as string) === "on" ? true : false,
                    sortOptionsBy: parseInt(formData.get("sortOptionsBy") as string) || 0,
                    renderStyle: parseInt(formData.get("renderStyle") as string) || 0,
                    listRootID: formData.get("listRootId") as string,
                }
                break;
            case PropertyType.ObjectLink:
                propertyTypeData = {
                    keepHistory: (formData.get("keepHistory") as string) === "on" ? true : false,
                    searchAllOnEmptyValueClick: (formData.get("searchAllOnEmptyValueClick") as string) === "on" ? true : false,
                    prohibitSetValueByLinking: (formData.get("prohibitSetValueByLinking") as string) === "on" ? true : false,
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    reverseIsMultiSelect: (formData.get("reverseIsMultiSelect") as string) === "on" ? true : false,
                    createReverseProperty: (formData.get("createReverseProperty") as string) === "on" ? true : false,
                    moduleID: formData.get("modules") as string,
                    contractID: formData.get("views") as string,
                    displayPropertyID: formData.get("properties") as string,
                    actAsOwner: (formData.get("actAsOwner") as string) === "on" ? true : false,
                    childsCohesive: (formData.get("childsCohesive") as string) === "on" ? true : false,
                    defaultProfileID: formData.get("defaultProfileID") as string,
                    contractDisplayPropertyId: formData.get("contractDisplayPropertyId") as string,
                }
                debugger
                break;
            case PropertyType.Tree:
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    isLinkedListSelect: (formData.get("isLinkedListSelect") as string) === "on" ? true : false,
                    treeRootID: formData.get("treeRootId") as string,
                }
                break;
            case PropertyType.Time:
                propertyTypeData = {
                    isDuration: (formData.get("isDuration") as string) === "on" ? true : false,
                }
                break;
            case PropertyType.SubjectLink:
                propertyTypeData = {
                    isMultiSelect: (formData.get("isMultiSelect") as string) === "on" ? true : false,
                    isCreator: (formData.get("isCreator") as string) === "on" ? true : false,
                    isModifier: (formData.get("isModifier") as string) === "on" ? true : false,
                    extendedProperties: formData.get("extendedProperties") as string,
                    activeDirectorySearchRoot: formData.get("activeDirectorySearchRoot") as string,
                    displayModeType: parseInt(formData.get("displayModeType") as string) || 0,
                    ignoreDisabledActiveDirectoryUsers: getBoolValueForSubjectProps(parseInt(formData.get("ignoreDisabledActiveDirectoryUsers") as string)),
                    isUsersOnly: getBoolValueForSubjectProps(parseInt(formData.get("isUsersOnly") as string)),
                    searchByLDAPAttributes: (formData.get("searchByLDAPAttributes") as string) === "on" ? true : false,
                    searchAttributes: formData.get("searchAttributes") as string,
                    searchAttributesExecutionRule: parseInt(formData.get("searchAttributesExecutionRule") as string) || 0,
                    userSearchFilterGroupID: formData.get("userSearchFilterGroupID") as string,
                }
                debugger;
                break;
            case PropertyType.String:
                propertyTypeData = {
                    stringType: parseInt(formData.get("stringType") as string) || StringType.SingleLine,
                    inputMaskType: parseInt(formData.get("inputMaskType") as string) || 0,
                }
                break;
        }
        const moduleId = formData.get("moduleUIId") as string;
        propertyData = {
            isFormula: formData.get("isFormula") as string === "on",
            isUnique: formData.get("isUnique") as string == "on",
            id: formData.get("id") as string,
            isSystem : true,
            // labels: {
            //     updated: languages?.map(language => {
            //         return {
            //             Id: (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
            //             LanguageID: language.id,
            //             Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
            //             Description: "",
            //         }
            //     }) || []
            // }
            labels: ArrangeLabelsPack(formData, labelFieldsPrefix, languages),
        };
        const property = { ...propertyTypeData, ...propertyData };
        const finalData = {
            properties: {
                updated: [
                    property
                ]
            }
        }
        debugger
        const updateProperty = await ModulesService.updateProperty(finalData, moduleId);
        return { isSuccess: true, updateProperty };
    } catch (error) {
        console.error("Error:", error);
        return { isSuccess: false, updateProperty: null };
    }
}

