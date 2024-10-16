import { updateLanguage } from "@/app/languages/action";
import { ServiceCaller, CatchHttpError } from "./Helpers";

const BASE_URL = process.env.BASE_URL + "language/";

export const LanguageService = {

    getAllLanguages: async (): Promise<Language[]> => {
        try {            
            const response = await ServiceCaller<Language[]>(
                `${BASE_URL}GetAllAsync`,
                {
                    method: "GET"
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Language", "fetching");
        }
    },

    createLanguage: async (languageForCreate: LanguageForCreate): Promise<LanguageForCreate> => {
        try {
            const response = await ServiceCaller<LanguageForCreate>(
                `${BASE_URL}CreateAsync`,
                {
                    method: "POST",
                    body: JSON.stringify(languageForCreate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Language", "creating");
        }
    },

    updateLanguage: async (languageForUpdate: LanguageForUpdate): Promise<LanguageForUpdate> => {
        try {
            const response = await ServiceCaller<LanguageForUpdate>(
                `${BASE_URL}UpdateAsync`,
                {
                    method: "PUT",
                    body: JSON.stringify(languageForUpdate)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "language", "updating");
        }
    },


    deleteLanguage: async (languageForDelete: LanguageForDelete): Promise<LanguageForDelete> => {
        try {
            const response = await ServiceCaller<LanguageForDelete>(
                `${BASE_URL}DeleteAsync`,
                {
                    method: "DELETE",
                    body: JSON.stringify(languageForDelete)
                }
            );
            return response.data;
        } catch (error) {
            throw CatchHttpError(error, "Language", "deleting");
        }
    },

}

