import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import React, { useState } from 'react'
import { GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteButton from '@/app/(components)/DeleteButton/DeleteButton';
interface ValueUnitTypeDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    ValueUnitType?: ValueUnitType[];
    loading?: boolean;
    deleteValueUnitType?: Function;
}

export default function ValueUnitsDataTable(props: ValueUnitTypeDataTableProps) {
    const [columnVisibilityModel] = useState({
        id: false,
        createTime: false,
        updateTime: false,
        isCustomizable: false,
        isExtendable: false,
    });
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            flex: 1,
        },
        {
            field: "labels",
            headerName: "Labels",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const labels = params.row.labels.map((label: Label) => label.label).join(', ');
                return (
                    <span>{labels}</span>
                );
            }
        },
        {
            field: "createTime",
            headerName: "Create Time",
            flex: 1,
        },
        {
            field: "updateTime",
            headerName: "Update Time",
            flex: 1,
        },
        {
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <DeleteButton params={params} onClick={props.deleteValueUnitType}/>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.ValueUnitType}
                height="320px"
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick ? props.onRowClick(event.row as ValueUnitType) : () => { }}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}

