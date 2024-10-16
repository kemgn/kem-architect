"use server";

import { ProfileForCreate, Profile, ProfileForUpdate } from "@/models/Entities/Profile";
import { ProfileService } from "@/services/Profile";
import { ArrangeLabelsPack } from "@/utils/Helpers";


export async function createProfile(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {

    try {
        const profile: ProfileForCreate = {
            systemName:                   formData.get("systemName")          as string,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            labels:                       languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }),        
        }
        
        const createdProfile: Profile = await ProfileService.createProfile(profile);
        return { isSuccess: true, createdProfile: createdProfile };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}


export async function updateProfile(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {

    try {
        const profile: ProfileForUpdate = {
            id:                           formData.get("id")                  as string,
            systemName:                   formData.get("systemName")          as string,
            isSystem:                    (formData.get("isSystem")            as string) === "on" ? true : false,
            // labels:                       {
            //     updated: languages?.map(language => {
            //         return {
            //             Id          : (formData.get(`${labelFieldsPrefix}${language.id}id`) as string),
            //             LanguageID  : language.id,
            //             Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
            //             Description : "",
            //         }
            //     }) || []
            // }  
            labels: ArrangeLabelsPack(formData, labelFieldsPrefix, languages),
        }
        
        const createdProfile: Profile = await ProfileService.updateProfile(profile);
        return { isSuccess: true, updatedProfile: createdProfile };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}