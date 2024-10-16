import React from 'react'
import Typography from "@mui/material/Typography";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";

type Variant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline';

interface FormHeaderProps {
    title: string;
    variant?: Variant
}

export default function FormHeader(props: FormHeaderProps) {
    return (
        <>
            <Typography id="modal-title" variant={props.variant || "h5"} sx={{ marginBottom: "12px" }}>
                {props.title}
            </Typography>
            <div className={globalStyles.hrContainerForForm}> {/* Counter the padding of 24px (p: 6) */}
                <hr className={`${globalStyles.hr} mb-16`} />
            </div>
        </>
    )
}
