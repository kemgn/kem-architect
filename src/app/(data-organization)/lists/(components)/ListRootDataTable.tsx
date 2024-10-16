import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import React, { useEffect, useState } from 'react'
import { GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import styles from './list.module.css';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ListRoot } from '@/models/Entities/List';
import DeleteButton from '@/app/(components)/DeleteButton/DeleteButton';




interface ListRootDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    listRoots?: ListRoot[];
    loading?: boolean;
    deleteListRoot?: Function;
}

export default function ListRootDataTable(props: ListRootDataTableProps) {
    const [columnVisibilityModel] = useState({
        id                  : false,
        isThresholdDuration : false,
        createTime          : false,
        updateTime          : false,
        sortOptionsByType   : false,
    });
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "id",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "systemName",
            headerName: "System name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "sortOptionsByType",
            headerName: "Sort options by",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isThresholdDuration",
            headerName: "Is Threshold Duration",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "createTime",
            headerName: "Create Time",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "updateTime",
            headerName: "Update Time",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <DeleteButton params={params} onClick={props.deleteListRoot} compact={true}/>
                )
            }
        }
    ]
    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.listRoots}
                height="35vh"
                density="compact"
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick ? props.onRowClick(event.row as ListRoot) : () => { }}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}

            />
        </>
    )
}

