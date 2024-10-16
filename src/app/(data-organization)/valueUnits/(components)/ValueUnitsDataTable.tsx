import React, { useState } from 'react'
import { GridColDef, GridRenderCellParams, GridRowOrderChangeParams } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";

interface ValueUnitsDataTableProps {
    clickedValueUnitType?: ValueUnitType;
    loading?: boolean;
    deleteValueUnit?: Function;
    onRowDoubleClick:Function;

}

export default function ValueUnitsDataTable(props: ValueUnitsDataTableProps) {
    const [columnVisibilityModel] = useState({
        id                        : false,
        createTime                : false,
        updateTime                : false,
        isLabelsCustomizable      : false,
    });
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            flex: 1
        },
        {
            field: "labels",
            headerName: "Labels",
            flex: 2,
            renderCell: (params: GridRenderCellParams) => {
                const labels = params.row.labels.map((label: Label) => label.label).join(', ');
                return (
                    <span>{labels}</span>
                );
            }
        },
        {
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteRoundedIcon sx={{ color: "warning.main" }} onClick={() => props.deleteValueUnit ? props.deleteValueUnit(params.row.id) : () => { }} className={globalStyles.iconHighlight}/>
                    </>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.clickedValueUnitType?.valueUnits || []}
                height='320px'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick(event)}
                columnVisibilityModel={columnVisibilityModel}
            />

        </>
    )
}
