"use client";
import { getInitColorSchemeScript } from '@mui/material/styles';

export default function SSRFlickerFix() {
    return (
        <div>
            {getInitColorSchemeScript()}
        </div>
    )
}
