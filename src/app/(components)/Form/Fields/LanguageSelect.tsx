import { LanguageService } from '@/services/Language';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface LanguageSelectProps {
    name?: string;
    handleChange?: (value: string) => void;
    languageId?: string;
    label?: string;
}

export default function LanguageSelect(props: LanguageSelectProps) {

    const [languages, setLanguages] = useState<Language[]>([]);

    useEffect(() => {
        const getLanguages = async () => {
            try {
                const result = await LanguageService.getAllLanguages();
                setLanguages(result);

            } catch (error) {
                throw new Error("Error getting languages for select");
            }
        }
        getLanguages();
    }, [])
    return (
        <Select
            handleChange={props.handleChange}
            values={languages}
            label={props.label ? props.label : "Select a language"}
            labelField="name"
            valueField="languageReferenceId"
            className="mb-16"
            name={props.name}
            defaultValue={props.languageId}
        />
    )
}
