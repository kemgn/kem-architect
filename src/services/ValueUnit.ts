import { createValueUnit, updateValueUnit } from "@/app/(data-organization)/valueUnits/actions";
import { ServiceCaller, CatchHttpError } from "./Helpers";

const BASE_URL = process.env.BASE_URL + "ValueUnitType/";

export const ValueUnitService = {
    getValueUnitTypes: async (): Promise<ValueUnitType[]> => {
        try {
            const response = await ServiceCaller<ValueUnitType[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnitType", "fetching");
        }
    },
    createValueUnitType: async (valueUnitTypeForCreate: ValueUnitTypeForCreate): Promise<ValueUnitTypeForCreate> => {
    
        try {
            const response = await ServiceCaller<ValueUnitTypeForCreate>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(valueUnitTypeForCreate)
                } 
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnitType", "creating");
        }
    },
    updateValueUnitType: async (valueUnitTypeForUpdate: ValueUnitTypeForUpdate): Promise<ValueUnitTypeForUpdate> => {
        try {
            const response = await ServiceCaller<ValueUnitTypeForUpdate>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(valueUnitTypeForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnitType", "updating");
        }
    },
    deleteValueUnitType: async (valueUnitTypeForDelete: ValueUnitTypeForDelete): Promise<ValueUnitTypeForDelete> => {
        try {
            const response = await ServiceCaller<ValueUnitTypeForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(valueUnitTypeForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnitType", "deleting");
        }
    },

    /// VAL. UNIT ///
    getValueUnit: async (): Promise<ValueUnit[]> => {
        try {
            const response = await ServiceCaller<ValueUnit[]>(
                `${BASE_URL}GetAllValueUnitAsync`, //değişebilir
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnit", "fetching");
        }
    },


    createValueUnit: async (ValueUnitForCreate: ValueUnitForCreate): Promise<ValueUnitForCreate> => {
        try {
            const response = await ServiceCaller<ValueUnitForCreate>(
                `${BASE_URL}CreateValueUnitAsync?uiId=${ValueUnitForCreate.valueUnitTypeId}`,
                {
                    method: "POST",
                    body: JSON.stringify(ValueUnitForCreate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Value Unit", "creating");
        }
    },
  
    updateValueUnit: async (valueUnitForUpdate: ValueUnitForUpdate): Promise<ValueUnitForUpdate> => {
        try {
            const response = await ServiceCaller<ValueUnitForUpdate>(
                `${BASE_URL}updatevalueunitasync`,
                {
                    method: "PUT",
                    body: JSON.stringify(valueUnitForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnit", "updating");
        }
    },
    deleteValueUnit: async (valueUnitForDelete: ValueUnitForDelete): Promise<ValueUnitForDelete> => {
        try {
            const response = await ServiceCaller<ValueUnitForDelete>(
                `${BASE_URL}DeleteValueUnitAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(valueUnitForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "ValueUnit", "deleting");
        }
    },
    
}


