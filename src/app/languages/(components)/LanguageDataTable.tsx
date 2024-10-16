import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import React, { useEffect, useState } from 'react'
import { GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { LanguageService } from '@/services/Language';
import { Languages } from 'next/dist/lib/metadata/types/alternative-urls-types';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";


interface LanguageDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    languages?: Language[];
    loading?: boolean;
    deleteLanguage?: Function;
}

export default function LanguageDataTable(props: LanguageDataTableProps) {
    const [columnVisibilityModel] = useState({
        id                  : false,
        createTime          : false,
        updateTime          : false,
    });
  
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "abbreviation",
            headerName: "Abbreviation",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "cultureName",
            headerName: "Culture name",
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
                    <>
                        <DeleteRoundedIcon sx={{
                            color: "warning.main"
                        }} onClick={() => props.deleteLanguage ? props.deleteLanguage(params.row.id) : () => { }} className={globalStyles.iconHighlight}/>
                    </>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.languages}
                height="70vh"
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick ? props.onRowClick(event.row as Language) : () => { }}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
