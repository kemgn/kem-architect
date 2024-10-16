import { Button } from '@ims/component-library'
import React, { SetStateAction } from 'react'
import localstyle from '../Endpointstyle.module.css'

interface ActionsButtonProps {
    label: string;
    className: string | undefined;
}
const color   = "primary"
const clicked = true;

export default function ActionsButton(props:ActionsButtonProps) {

    return (
        <div>
            <Button
                label={props.label}
                color={color}
                className={props.className}
            />
        </div>
    )
}
