import { GridColDef, GridRenderCellParams, DataGrid, GridRowParams } from '@ims/component-library';
import React, { useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Profile } from '@/models/Entities/Profile';
interface ProfileDataTableProps {
    onRowDoubleClick?: Function;
    profiles?: Profile[];
    loading?: boolean;
    deleteProfile?: Function;
    openMembersForm?: Function;
}
export default function ProfileDataTable(props: ProfileDataTableProps) {
    const [columnVisibilityModel] = useState({
        id                  : false,
        isSystem            : false,
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
                        {(params.row as Profile).pMemberUIs?.length || 0}
                    </>
                )
            }
        },
        {
            field: "isSystem",
            headerName: "Is System",
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
                        <DeleteOutlineOutlinedIcon sx={{ color: "warning.main" }} onClick={() => props.deleteProfile ? props.deleteProfile(params.row.id) : () => { }} />
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.profiles}
                height='70vh'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
