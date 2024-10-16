"use client"
import React, { useState } from 'react';
import { GridColDef, GridRenderCellParams, DataGrid, GridRowParams } from '@ims/component-library';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Module } from '@/models/Entities/Module';
import { ModulesModal } from './ModulesModal';

interface ModulesDataTableProps {
    onRowDoubleClick?: Function;
    modules?: Module[];
    loading?: boolean;
    deleteModule?: Function;
    setModal: Function;
    handleModuleModalClose: Function;
    onClose: Function;
    loadingModules: boolean;
}
export default function ModulesDataTable(props: ModulesDataTableProps) {
    const [columnVisibilityModel] = useState({
        id: false,
        createTime: false,
        updateTime: false,
    });
    const columns: GridColDef[] = [
        {
            field: "a",
            headerName: "Properties",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <InfoOutlinedIcon sx={{
                            color: 'info.main'
                        }}
                            className={globalStyles.iconHighlight}
                            // onClick={() => {
                            //     window.location.href = `/modules/${params.row.id}`;
                            // }}
                            onClick={() => {
                                debugger;
                                props.setModal(<ModulesModal onSuccessfulFormSubmit={props.handleModuleModalClose} onClose={props.onClose} moduleData={params.row} loadingModules={props.loadingModules} />)
                            }}
                        />
                    </>
                )
            }
        },
        {
            field: "id",
            headerName: "Id",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "systemName",
            headerName: "System Name",
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
                        <DeleteOutlineOutlinedIcon sx={{
                            color: "warning.main"
                        }} className={globalStyles.iconHighlight} onClick={() => props.deleteModule ? props.deleteModule(params.row.id) : () => { }}/>
                    </>
                )
            }
        }
    ]
    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.modules}
                height='70vh'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
