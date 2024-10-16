import { Property, PropertyForDelete, PropertyForUpdate ,PropertyForCreate } from "@/models/Entities/Property";
import { ServiceCaller, CatchHttpError, Response } from "./Helpers";
import { Module, ModuleForCreate, ModuleForDelete, ModuleForUpdate } from "@/models/Entities/Module";

const BASE_URL = process.env.BASE_URL + "Modules/";

export const ModulesService = {

    getAllModules: async (): Promise<Module[]> => {
        try {
            const response = await ServiceCaller<Module[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Module", "fetching");
        }
    },
    getAllProperties: async (moduleId:string): Promise<Response<Property[]>> => {
        try {
            const response = await ServiceCaller<Property[]>(
                `${BASE_URL}getpropertiesasync?moduleUIId=${moduleId}`,
                {
                    method: "GET"
                }
            );
            return response;
        } catch (error) {
            throw CatchHttpError(error, "Property", "fetching");
        }
    },
    createModule: async (moduleForCreate: ModuleForCreate): Promise<ModuleForCreate> => {
        try {
            const response = await ServiceCaller<ModuleForCreate>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(moduleForCreate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Module", "creating");
        }
    },
    createProperty: async (PropertyForCreate: PropertyForCreate ): Promise<PropertyForCreate> => {
        try {
            const response = await ServiceCaller<PropertyForCreate>(
                `${BASE_URL}CreatePropertyAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(PropertyForCreate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Property", "creating");
        }
    },
    updateModule: async (moduleForUpdate: ModuleForUpdate): Promise<ModuleForUpdate> => {
        try {
            const response = await ServiceCaller<ModuleForUpdate>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(moduleForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "module", "updating");
        }
    },
    updateProperty: async (propertyForUpdate: PropertyForUpdate, moduleId: string): Promise<PropertyForUpdate> => {
        try {
            const response = await ServiceCaller<PropertyForUpdate>(
                `${BASE_URL}updatepropertyasync?xx=${moduleId}`,
                {
                    method: "PUT",
                    body: JSON.stringify(propertyForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "property", "updating");
        }
    },
    deleteModule: async (moduleForDelete: ModuleForDelete): Promise<ModuleForDelete> => {
        try {
            const response = await ServiceCaller<ModuleForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(moduleForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Module", "deleting");
        }
    },
    deleteProperty: async (propertyForDelete: PropertyForDelete): Promise<PropertyForDelete> => {
        try {
            const response = await ServiceCaller<PropertyForDelete>(
                `${BASE_URL}DeletePropertyAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(propertyForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Property", "deleting");
        }
    },

}

