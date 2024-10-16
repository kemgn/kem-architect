import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components'
import React, { useEffect, useState } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library';
import { MemberForTable } from '@/models/Entities/Profile';
import { getDisplayName, RenderDisplayName } from '../../(profile-group-common)/Helpers';
import { SubjectTypes } from '@/models/Enums/Enums';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface ProfileMembersDataTableProps {
    // onRowDoubleClick?: Function;
    profileMembers?: MemberForTable[];
    loading?: boolean;
    deleteMember?: Function;

}
export default function ProfileMembersDataTable(props: ProfileMembersDataTableProps) {

    const [columnVisibilityModel] = useState({
        id: false,
    });
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            flex: 1,
            minWidth: 100,
        },{
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
                    case SubjectTypes.profile:
                        return (
                            <RenderDisplayName icon={<GroupAddIcon />} text={displayName} />
                        )
                    case SubjectTypes.iMSGroup:
                        return (
                            <RenderDisplayName icon={<PeopleOutlineOutlinedIcon />} text={displayName} />
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
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteOutlineOutlinedIcon sx={{
                            color: "warning.main"
                        }} className={globalStyles.iconHighlightCompact} onClick={() => props.deleteMember ? props.deleteMember(params.row.id) : () => { }} />
                    </>
                )
            }
        }
    ]
    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.profileMembers}
                height='420px'
                density='compact'
                loading={props.loading}
                // onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
