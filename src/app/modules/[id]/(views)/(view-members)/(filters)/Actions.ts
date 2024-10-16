"use server";

import { Property } from "@/models/Entities/Property";
import { FilterCriteria, RemoteFilter, RemoteFilterForCreate, RemoteFilterForUpdate, RemoteFilterItem, RemoteFilterItemForCreate, RemoteFilterItemForUpdate } from "@/models/Entities/RemoteFilter";
import { DataContractService } from "@/services/DataContract";
import { ArrangeLabelsPack } from "@/utils/Helpers";



export async function createFilter(formData: FormData, labelFieldsPrefix: string, languages?: Language[], dataContractId: string) {
    try {
        const filter: RemoteFilterForCreate = {
            systemName:         formData.get("systemName")   as string,
            customLogic:        formData.get("customLogic")  as string,
            isMandatory:        (formData.get("isMandatory") as string) === "on" ? true : false,
            labels:             languages?.map(language => {
                return {
                    LanguageID  : language.id,
                    Label       : (formData.get(`${labelFieldsPrefix}${language.id}`) as string),
                    Description : "",
                }
            }) || [],
            showAsAvailableFilter: (formData.get("showAsAvailableFilter") as string) === "on" ? true : false,
        }
        const response: RemoteFilter = await DataContractService.createFilter(dataContractId, filter);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateFilter(formData: FormData, labelFieldsPrefix: string, languages?: Language[]) {
    try {
        const filter: RemoteFilterForUpdate = {
            id:                 formData.get("id")           as string,
            systemName:         formData.get("systemName")   as string,
            customLogic:        formData.get("customLogic")  as string,
            isMandatory:        (formData.get("isMandatory") as string) === "on" ? true : false,
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
            showAsAvailableFilter: (formData.get("showAsAvailableFilter") as string) === "on" ? true : false,
        }
        const response = await DataContractService.updateFilter(filter);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function createFilterItem(formData: FormData, filterId: string, property: Property, propertyValue: string) {
    try {
        const filter: RemoteFilterItemForCreate = {
            identifier: parseInt(formData.get("identifier")   as string),
            propertySystemName: property.systemName,
            propertyId: property.id,
            operator: parseInt(formData.get("operator")   as string),
            propertyValue: formData.get("propertyValue")   as string || propertyValue
        }
        if (filter.propertyValue === "on") {
            filter.propertyValue = "true";
        } else if (filter.propertyValue === "off") {
            filter.propertyValue = "false";
        }
        
        const response: RemoteFilterItem = await DataContractService.createFilterItem(filterId, filter);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function updateFilterItem(formData: FormData, property: Property, propertyValue: string) {
    try {
        const operator = parseInt(formData.get("operator")   as string);
        let propValue: string | null = formData.get("propertyValue")   as string || propertyValue;
        switch (operator) {
            case FilterCriteria.NotFiltered:
            case FilterCriteria.Empty:
            case FilterCriteria.IsCurrentUser:
            case FilterCriteria.NotEmpty:
                propValue = null;
                break;
        }
        const filter: RemoteFilterItemForUpdate = {
            id: formData.get("id")   as string,
            identifier: parseInt(formData.get("identifier")   as string),
            propertySystemName: property.systemName,
            propertyId: property.id,
            operator: operator,
            propertyValue: propValue
        }
        const response = await DataContractService.updateFilterItem(filter);
        return { isSuccess: false, response }
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}