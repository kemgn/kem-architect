'use server';

import { NodeCreate, NodeUpdate, TreeRoot, TreeRootCreate, TreeRootUpdate } from "@/models/Entities/Tree";
import { Response } from "@/services/Helpers";
import { TreeService } from "@/services/Tree";
import { ArrangeLabelsPack } from "@/utils/Helpers";

export async function updateTreeRoot(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const treeRoot: TreeRootUpdate = {
            id: formData.get("id") as string,
            systemName: formData.get("systemName") as string,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
            isLabelCustomizable: (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            description: formData.get("description") as string || "",
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
        debugger
        const response = await TreeService.updateTreeRoot(treeRoot);
        return response
    }
    catch (error) {
        return { isSuccess: false, error: error };
    }
}

export async function createTreeRoot(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const treeRoot: TreeRootCreate = {
            systemName: formData.get("systemName") as string,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            isExtendable: (formData.get("isExtendable") as string) === "on" ? true : false,
            description: formData.get("description") as string || "",
            isLabelCustomizable: (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
            labels: languages?.map(language => {
                return {
                    LanguageID: language.id,
                    Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description: "",
                }
            }),
        }
        const response = await TreeService.createTreeRoot(treeRoot);
        
        return response;
    }
    catch (error) {
        return { isSuccess: false, error: error }
    }
}

export async function createNode(formData: FormData, labelFieldsPrefix: string, languages?: Language[], treeId?: string) {
    try {
        const node: NodeCreate = {
            systemName: formData.get("systemName") as string,
            isCustomizable: (formData.get("isCustomizable") as string) === "on" ? true : false,
            isLabelCustomizable: (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            isSystem: (formData.get("isSystem") as string) === "on" ? true : false,
            labels: languages?.map(language => {
                return {
                    LanguageID: language.id,
                    Label: (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description: "",
                }
            }),
            weight: parseInt(formData.get("weight") as string) || 0,
        }
        if (!!treeId) {
            const response = await TreeService.createNode(node, treeId);
            return response;
        }
    }
    catch (error) {
        return { isSuccess: false, error: error }
    }
}

export async function updateNode(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try{
        const node: NodeUpdate = {
            id:                         formData.get("id") as string,
            isCustomizable:             (formData.get("isCustomizable") as string) === "on" ? true : false,
            isLabelCustomizable:        (formData.get("isLabelCustomizable") as string) === "on" ? true : false,
            isSystem:                   (formData.get("isSystem") as string) === "on" ? true : false,
            systemName:                 formData.get("systemName") as string, 
            weight:                     parseInt(formData.get("weight") as string) || 0,
            // labels:                     {
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
        debugger
        const response = await TreeService.updateNode(node);
        return response
    }
    catch(error){
        return { isSuccess: false, error: error }
    }
}
