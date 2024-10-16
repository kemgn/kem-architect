"use client";

import React, { useContext } from 'react'
import { LanguagesContext } from '../../_Contexts/LanguagesContext';
import { TextInput } from '../../_IMSComponentLibary/components';

interface LabelFieldsProps {
    labels?: Label[];
    namePrefix: string;
    inputLabel?: string;
}
export default function LabelFields(props: LabelFieldsProps) {
    const languages = useContext(LanguagesContext);
    return (
        <>
            {
                languages?.map(language =>
                (<TextInput
                    name={`${props.namePrefix}${language.id}`}
                    id={`${props.namePrefix}${language.id}`}
                    key={language.id}
                    label={props.inputLabel ? `${language.name} ${props.inputLabel}` : `${language.name} Label`}
                    defaultValue={props.labels?.find(x => x.languageID === language.id)?.label}
                    size="medium"
                    sx={{width: "100%"}}
                />)
                )
            }
        </>
    )
}
