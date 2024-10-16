import { GridColDef, GridRenderCellParams, DataGrid, GridRowParams } from '@ims/component-library';
import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Group } from '@/models/Entities/Group';
interface GroupDataTableProps {
    onRowDoubleClick?: Function;
    groups?: Group[];
    loading?: boolean;
    deleteGroup?: Function;
    openMembersForm?: Function;
}
export default function GroupDataTable(props: GroupDataTableProps) {
    const [columnVisibilityModel] = useState({
        id                  : false,
        createTime          : false,
        updateTime          : false,
        labels              : false,
    });
    const columns: GridColDef[] = [
        {
            field: "members",
            headerName: "Edit members",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className={globalStyles.tableActionCell}>
                        <GroupOutlinedIcon onClick={() => props.openMembersForm ? props.openMembersForm(params.row) : () => { }} className={globalStyles.iconHighlight}/>
                    </div>
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
            headerName: "System name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "memberCount",
            headerName: "Member count",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        {(params.row as Group).gMemberUIs?.length}
                    </>
                )
            }
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
            field: "labels",
            headerName: "Labels",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className={globalStyles.tableActionCell}>
                        <DeleteOutlineOutlinedIcon sx={{ color: "warning.main" }} onClick={() => props.deleteGroup ? props.deleteGroup(params.row.id) : () => { }} className={globalStyles.iconHighlight}/>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.groups}
                height='70vh'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
