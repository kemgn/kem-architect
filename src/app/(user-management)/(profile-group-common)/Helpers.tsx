import { Subject } from '@/models/Entities/Subject';
import { OptionType } from '@ims/component-library';
import React, { ReactNode } from 'react'

export default function Helpers() {
    return (
        <div>

        </div>
    )
}

export function getDisplayName(domainName: string, displayName: string) {
    if (!domainName) {
        return displayName;
    } else  {
        return `[${domainName}]\\${displayName}`;
    }
}

export function RenderDisplayName(props: { icon: ReactNode, text: string }) {
    return (
        <div className="flex align-items-center gap-12">
            {props.icon}<span>{props.text}</span>
        </div>
    )
}

export interface SubjectForAutoComplete extends OptionType, Subject {

}