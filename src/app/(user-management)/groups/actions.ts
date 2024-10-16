"use server";

import { Group, GroupForCreate, GroupForUpdate } from "@/models/Entities/Group";
import { ProfileForCreate, Profile, ProfileForUpdate } from "@/models/Entities/Profile";
import { GroupService } from "@/services/Group";
import { ProfileService } from "@/services/Profile";
import { ArrangeLabelsPack } from "@/utils/Helpers";


export async function createGroup(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {

    try {
        const group: GroupForCreate = {
            systemName:                   formData.get("systemName")          as string,
            labels:                       languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }),        
        }
        
        const createdGroup: Group = await GroupService.createGroup(group);
        return { isSuccess: true, createdGroup: createdGroup };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}


export async function updateGroup(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {

    try {
        const group: GroupForUpdate = {
            id:                           formData.get("id")                  as string,
            systemName:                   formData.get("systemName")          as string,
            groupReferenceId:             formData.get("groupReferenceId")          as string,
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
        
        const createdGroup: Profile = await GroupService.updateGroup(group);
        return { isSuccess: true, createdGroup: createdGroup };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}