"use server";

import { ListRootForCreate, ListRootForUpdate, ListOptionForCreate, ListOptionForUpdate } from "@/models/Entities/List";
import { ListService } from "@/services/List";
import { ArrangeLabelsPack } from "@/utils/Helpers";


export async function createListRoot(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        debugger
        const listRoot: ListRootForCreate = {
            systemName:                   formData.get("systemName")          as string,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            isThresholdDuration:         (formData.get("isThresholdDuration") as string) === "on" ? true : false,
            isCustomizable:              (formData.get("isCustomizable")      as string) === "on" ? true : false,
            isExtendable:                (formData.get("isExtendable")        as string) === "on" ? true : false,
            isLabelCustomizable:         (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            sortOptionsByType:   parseInt(formData.get("sortOptionsByType")   as string) || 0,
            description:                  formData.get("description")         as string || "",
            labels:                       languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }),        
        }
        
        const response = await ListService.createListRoot(listRoot);
        return response
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateListRoot(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        debugger
        const listRoot: ListRootForUpdate = {
            id:                          formData.get("id")                  as string,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            isThresholdDuration:         (formData.get("isThresholdDuration") as string) === "on" ? true : false,
            isCustomizable:              (formData.get("isCustomizable")      as string) === "on" ? true : false,
            isExtendable:                (formData.get("isExtendable")        as string) === "on" ? true : false,
            isLabelCustomizable:         (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            sortOptionsByType:   parseInt(formData.get("sortOptionsByType")   as string) || 0,
            description:         "",
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
        
        const response = await ListService.updateListRoot(listRoot);
        return response;
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function createListOption(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {

    try {
        const listOption: ListOptionForCreate = {
            systemName:                   formData.get("systemName")          as string,
            listRootId:                   formData.get("listRootId")          as string,

            chartColorCode:               formData.get("chartColorCode")      as string || "",  
            //
            lightColorcode:               formData.get("lightColorcode")      as string || "#cccccc",  
            darkColorcode:                formData.get("darkColorcode")       as string || "#595959",
            //
            iconPath:                     formData.get("iconPath")            as string || "",    
            rowIndex:                     0, 

            maxThreshold:        null,   
            minThreshold:        null, 
            // maxThreshold:        parseInt(formData.get("maxThreshold")        as string) || 0,   
            // minThreshold:        parseInt(formData.get("minThreshold")        as string) || 0,
            weight:              parseInt(formData.get("weight")              as string) || 0,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            isCustomizable:              (formData.get("isCustomizable")      as string) === "on" ? true : false,
            isLabelCustomizable:         (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            labels:                       languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }),   
        }
        debugger
        const createdListOption: ListOptionForCreate = await ListService.createListOption(listOption);
        return { isSuccess: true, createdListOption: createdListOption };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateListOption(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const listOption: ListOptionForUpdate = {
            id:                           formData.get("id")                  as string,

            chartColorCode:               formData.get("chartColorCode")      as string || "",  
            lightColorcode:               formData.get("lightColorcode")      as string || "#cccccc",  
            darkColorcode:                formData.get("darkColorcode")       as string || "#595959",  
            iconPath:                     formData.get("iconPath")            as string || "",    
            rowIndex:                     0, 

            maxThreshold:        parseInt(formData.get("maxThreshold")        as string) || 0,   
            minThreshold:        parseInt(formData.get("minThreshold")        as string) || 0, 
            weight:              parseInt(formData.get("weight")              as string) || 0,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            isCustomizable:              (formData.get("isCustomizable")      as string) === "on" ? true : false,
            isLabelCustomizable:         (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
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
        
        const updatedListOption: ListOptionForUpdate = await ListService.updateListOption(listOption);
        return { isSuccess: true, updatedListOption };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
    
}