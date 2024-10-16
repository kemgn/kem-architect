import { SystemSettings, SystemSettingsForUpdate } from "@/models/Entities/SystemSettings";
import { CatchHttpError, Response, ServiceCaller } from "./Helpers";
import SystemSettings from "@/app/systemsettings/(components)/systemsettings";

const BASE_URL = process.env.BASE_URL + "SystemSettings/";

export const SystemSettingsService = {
    getSystemSettings: async (): Promise<Response<SystemSettings>> => {
        try{
            const response = await ServiceCaller<SystemSettings>(
                BASE_URL +  'GetAsync'  ,
                {
                    method: "GET"
                }
            )
            return response
        }
        catch(error){
            throw CatchHttpError(error, "SystemSettings", "fetch");
        }
    },

    updateSystemSettings: async (systemSettingForUpdate: SystemSettingsForUpdate): Promise<Response<SystemSettings>> => {
        try{
            debugger
            const response = await ServiceCaller<SystemSettings>(
                BASE_URL + 'UpdateAsync' ,
                {
                    method: 'PUT',
                    body: JSON.stringify(systemSettingForUpdate)
                }
            )
            return response
       }
        catch(error){
            throw CatchHttpError(error, "SystemSettings", "update");
        }
    }
    
}