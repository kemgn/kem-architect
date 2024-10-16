"use server";

import { Property } from "@/models/Entities/Property";
import { FilterCriteria, RemoteFilter, RemoteFilterForCreate, RemoteFilterForUpdate, RemoteFilterItem, RemoteFilterItemForCreate } from "@/models/Entities/RemoteFilter";
import { RemoteSort, RemoteSortForCreate, RemoteSortForUpdate, RemoteSortItem, RemoteSortItemForCreate, RemoteSortItemForUpdate } from "@/models/Entities/RemoteSort";
import { DataContractService } from "@/services/DataContract";
import { ArrangeLabelsPack } from "@/utils/Helpers";



export async function createSort(formData: FormData, labelFieldsPrefix: string, languages: Language[], dataContractId: string) {
    try {
        const sort: RemoteSortForCreate = {
            systemName:             formData.get("systemName")   as string,
            isDefault:              (formData.get("isDefault") as string) === "on" ? true : false,
            doGrouping:             (formData.get("doGrouping") as string) === "on" ? true : false,
            groupCountVisibility:   (formData.get("groupCountVisibility") as string) === "on" ? true : false,
            labels:                 languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }) || [],
        }
        const response: RemoteSort = await DataContractService.createSort(dataContractId, sort);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateSort(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const sort: RemoteSortForUpdate = {
            id:                     formData.get("id")           as string,
            systemName:             formData.get("systemName")   as string,
            isDefault:              (formData.get("isDefault") as string) === "on" ? true : false,
            doGrouping:             (formData.get("doGrouping") as string) === "on" ? true : false,
            groupCountVisibility:   (formData.get("groupCountVisibility") as string) === "on" ? true : false,
            // labels:             {
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
        const response = await DataContractService.updateSort(sort);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function createSortItem(formData: FormData, filterId: string, property: Property, indexValue: number) {
    try {
        const sortItem: RemoteSortItemForCreate = {
            propertySystemName: property.systemName,
            propertyId: property.id,
            isDescending: (formData.get("isDescending") as string) === "on" ? true : false,
            sortOnLabel: (formData.get("sortOnLabel") as string) === "on" ? true : false,
            itemIndex: indexValue,
        }
        const response: RemoteSortItem = await DataContractService.createSortItem(filterId, sortItem);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateSortItem(formData: FormData, sortItem_: RemoteSortItem) {
    try {
        const sortItem: RemoteSortItemForUpdate = {
            id:                 formData.get("id")           as string,
            isDescending:       (formData.get("isDescending") as string) === "on" ? true : false,
            sortOnLabel:        (formData.get("sortOnLabel") as string) === "on" ? true : false,
            propertySystemName: sortItem_.propertySystemName,
            propertyId:         sortItem_.propertyId,
            itemIndex:          1,
        }
        const response = await DataContractService.updateSortItem(sortItem);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}