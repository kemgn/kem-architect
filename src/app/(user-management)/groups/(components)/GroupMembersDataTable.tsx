import React, { ReactNode } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@ims/component-library';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { SubjectTypes } from '@/models/Enums/Enums';
import { MemberForTable } from '@/models/Entities/Profile';
import { getDisplayName, RenderDisplayName } from '../../(profile-group-common)/Helpers';

interface GroupMembersDataTableProps {
    deleteMember?: (memberId: string) => void;
    rows?: MemberForTable[];
    loading?: boolean;
}

export default function GroupMembersDataTable(props: GroupMembersDataTableProps) {
    const columns: GridColDef[] = [
        {
            field: "displayName",
            headerName: "Display name",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                const displayName = getDisplayName(params.row.domainName, params.row.displayName);
                switch ((params.row as MemberForTable).sourceMemberType) {
                    case SubjectTypes.group:
                        return (
                            <RenderDisplayName icon={<GroupsOutlinedIcon />} text={params.row.displayName} />
                        )
                    case SubjectTypes.iMSGroup:
                        return (
                            <RenderDisplayName icon={<PeopleOutlineOutlinedIcon />} text={params.row.displayName} />
                        )
                    case SubjectTypes.user:
                        return (
                            <RenderDisplayName icon={<PersonOutlineOutlinedIcon />} text={params.row.displayName} />
                        )
                    case SubjectTypes.property:
                        return (
                            <RenderDisplayName icon={<BadgeOutlinedIcon />} text={params.row.displayName} />
                        )
                }
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className={globalStyles.tableActionCell}>
                        <DeleteOutlineOutlinedIcon sx={{ color: "warning.main" }} onClick={() => props.deleteMember && props.deleteMember(params.row.id)} />
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                density='compact'
                rows={props.rows}
                height='420px'
                loading={props.loading}
            />
        </>
    )
}
