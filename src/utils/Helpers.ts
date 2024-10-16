import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { SelectValue } from "@ims/component-library";
import { useContext } from "react";

export function ConvertEnumToObject<T extends Record<string, any>>(enumType: T, func?: (value: any) => any): SelectValue[] {
    if (!enumType) {
        return [];
    }
    const enumAsObject_ = [];
    const keys = Object.keys(enumType).filter(key => isNaN(Number(key)));
    const values = Object.values(enumType).filter(value => !isNaN(Number(value)));

    for (let i = 0; i < values.length; i++) {
        const key = keys[i];
        const value = values[i];  //val değerine bu atanabilir
        enumAsObject_.push({
            label: func ? func(key) : key,
            value: func ? func(key) : key,
        });
    }

    return enumAsObject_;
}

export const GetEnumValue = (enumObj: any, enumKey: string): number | undefined => {
    try {
        const value = enumObj[enumKey as keyof typeof enumObj]
        if (value != null) {
            return value;
        }
    } catch (_) {
        return;
    }
}

export const GetEnumKey = (enumObj: any, value: number): string | undefined => {
    // Find the key based on the value
    if (value == undefined) {
        return
    }
    const entry = Object.entries(enumObj).find(([key, val]) => val === value);
    return entry ? entry[0] : undefined;
}

export  const ArrangeLabelsPack = (formData: FormData, labelFieldsPrefix: string, languages?: Language[]) => {
    if (!languages) {
        return { updated: [], added: [] };
    }

    const labelPack: LabelUpdated = { updated: [], added: [] };
    languages.forEach((language) => {
        const labelId = (formData.get(`${labelFieldsPrefix}${language.id}id`) as string);
        const labelStr = (formData.get(`${labelFieldsPrefix}${language.id}`) as string);

        if (labelId === "" || labelId == undefined) {
            labelPack.added!.push({
                Label: labelStr,
                LanguageID: language.id,
                Description: "",
            });
        } else {
            labelPack.updated.push({
                Id: labelId,
                Description: "",
                Label: labelStr,
                LanguageID: language.id
            });
        }
    });
    
    return labelPack;
}