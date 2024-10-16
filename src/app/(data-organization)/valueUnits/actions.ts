"use server";

import { ValueUnitService } from "@/services/ValueUnit";
import { ArrangeLabelsPack } from "@/utils/Helpers";


export async function createValueUnitType(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const valueUnitType: ValueUnitTypeForCreate = {
            isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            isLabelsCustomizable: (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            labels: languages?.map(language => {
                return {
                    LanguageID: language.id,
                    Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description: "",
                }
            }),
        }
        const createdValueUnitType: ValueUnitTypeForCreate = await ValueUnitService.createValueUnitType(valueUnitType);
        return { isSuccess: true, createdValueUnitType };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateValueUnitType(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const valueUnit: ValueUnitTypeForUpdate = {
            id: formData.get("id") as string,
            isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            isLabelsCustomizable: (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
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
        const updatedValueUnitType: ValueUnitTypeForUpdate = await ValueUnitService.updateValueUnitType(valueUnit);
        return { isSuccess: true, updatedValueUnitType };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}
//

export async function createValueUnit(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const valueUnit: ValueUnitForCreate = {
            isCustomizable:              (formData.get("isCustomizable")       as string) === "on" ? true : false,
            isSystem:                    (formData.get("isSystem")             as string) === "on" ? true : false,
            isLabelsCustomizable:        (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
            valueUnitTypeId:              formData.get("valueUnitTypeId")      as string,
            labels:                       languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }),   
        }
        const createdValueUnit: ValueUnitForCreate = await ValueUnitService.createValueUnit(valueUnit);
        return { isSuccess: true, createdValueUnit: createdValueUnit };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}
export async function updateValueUnit(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const valueUnit: ValueUnitForUpdate = {
            id:                           formData.get("id")                  as string,
            isCustomizable:              (formData.get("isCustomizable")      as string) === "on" ? true : false,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            isLabelsCustomizable:        (formData.get("isLabelsCustomizable") as string) === "on" ? true : false,
            isExtendable:                (formData.get("isExtendable")        as string) === "on" ? true : false,
            // labels:                       {
            //     updated: languages?.map(language => {
            //         return {
            //             Id          : (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
            //             LanguageID  : language.id,
            //             Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
            //             Description : "",
            //         }
            //     }) || []
            // },
            labels: ArrangeLabelsPack(formData, labelFieldsPrefix, languages),
        }
        debugger
        const updatedValueUnit: ValueUnitForUpdate = await ValueUnitService.updateValueUnit(valueUnit);
        return { isSuccess: true, updatedValueUnit };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
    
}
