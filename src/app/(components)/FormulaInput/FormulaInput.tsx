/* eslint-disable react-hooks/exhaustive-deps */
import { TextInput } from '@ims/component-library'
import React, { useEffect, useState } from 'react'
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { useIde } from '../../../../public/IDE/IDEContext';
interface FormulaInputProps {
    label?: string;
    disabled?: boolean;
}


export default function FormulaInput(props: FormulaInputProps) {
    const { closeIde, openIde, isOpen, getCode }= useIde();
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (!isOpen) {
            setInputValue(getCode());
        }
    }, [isOpen])
    
    const onIconClick = () => {
        openIde();
    }
    return (
        <>
            <TextInput
                label={props.label}
                size="medium"
                endAdornment={<CodeOutlinedIcon onClick={!props.disabled ? onIconClick : () => { }} />}
                disabled={props.disabled}
                value={inputValue}
            />
        </>
    )
}
