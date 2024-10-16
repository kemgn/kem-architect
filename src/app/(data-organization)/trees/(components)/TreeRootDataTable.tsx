import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import React, { useEffect, useState } from 'react'
import { GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from './tree.module.css';
import { DataTableColumnsFields, DataTableColumnsHeaders } from '../DataTableColumns';
import { TreeRoot } from '@/models/Entities/Tree';
import DeleteButton from '@/app/(components)/DeleteButton/DeleteButton';

interface TreeRootDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    rows?: TreeRoot[];
    loading?: boolean;
    deleteTreeRoot?: Function;
}

export default function TreeRootDataTable(props: TreeRootDataTableProps) {

    const columns: GridColDef[] = [
        {
            field: DataTableColumnsFields.SystemName,
            headerName: DataTableColumnsHeaders.SystemName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "",
            headerName: DataTableColumnsHeaders.Actions,
            renderCell: (params: GridRenderCellParams) => {
                return (
                   <DeleteButton params={params} onClick={props.deleteTreeRoot} compact={true}/>
                )
            }
        }
    ]


    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.rows}
                height="250px"
                density="compact"
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick && props.onRowClick((event.row as TreeRoot))}
                onRowDoubleClick={(event) => props.onRowDoubleClick && props.onRowDoubleClick(event.row as TreeRoot)}
            />
        </>
    )
}
