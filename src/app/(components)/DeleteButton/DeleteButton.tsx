import React from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { GridRenderCellParams } from '@ims/component-library';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";

interface DeleteButtonProps {
    params: GridRenderCellParams;
    onClick?: Function;
    compact?: boolean;
}

export default function DeleteButton(props: DeleteButtonProps) {
    return (
        <>
            <DeleteRoundedIcon
                sx={{ color: "warning.main" }}
                onClick={(event) => {
                    event.stopPropagation();
                    if (props.onClick) {
                        props.onClick(props.params.row.id);
                    }
                }}
                className={props.compact ? globalStyles.iconHighlightCompact : globalStyles.iconHighlight}
            />
        </>
    );
}