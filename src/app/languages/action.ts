'use server';
import { LanguageService } from "@/services/Language";
export async function createLanguage(formData: FormData) {
    try {
        const language: LanguageForCreate = {
            name:                         formData.get("name")                as string,
            abbreviation:                 formData.get("abbreviation")        as string,
            cultureName:                  formData.get("cultureName")         as string,
        }
        const createdLanguage: LanguageForCreate = await LanguageService.createLanguage(language);
        return { isSuccess: true, createdLanguage };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}
export async function updateLanguage(formData: FormData) {
    try {
        const language: LanguageForUpdate = {
            id:                           formData.get("id")                  as string,
            abbreviation:                 formData.get("abbreviation")        as string,
            cultureName:                  formData.get("cultureName")         as string,
        }
        const updatedLanguage: LanguageForUpdate = await LanguageService.updateLanguage(language);
        return { isSuccess: true, updatedLanguage };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}

export async function deleteLanguage(formData: FormData) {
    try {
        const language: LanguageForDelete = {
            id:                           formData.get("id")                  as string,
        }
        const deletedLanguage: LanguageForDelete = await LanguageService.deleteLanguage(language);
        return { isSuccess: true, deletedLanguage };
    } catch (error) {
        return { isSuccess: false, null: null };
    }
}


