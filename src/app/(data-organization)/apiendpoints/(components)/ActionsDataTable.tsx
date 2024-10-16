import { Endpoint } from "@/models/Entities/Endpoint";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from "@ims/component-library";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { ActionDataTColFields, ActionDataTColHeaders } from "./ActionDataTColFields";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface ActionsDataTableProps {
    rows: Action[];
    onRowClick: Function;
    onRowDoubleClick: Function;
    deleteAction: Function;
    loading: boolean;
}
const iconColor = "warning.main";

export function ActionsDataTable(props: ActionsDataTableProps) {

    const columns: GridColDef[] = [
        {
            field:      ActionDataTColFields.arrange,
            headerName: ActionDataTColHeaders.arrange,
            flex:       1,
            minWidth:   100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <EditOutlinedIcon sx={{color: iconColor}} onClick={() => props.onRowDoubleClick}/>
                    </>
                )
            }
        },
        {
            field: ActionDataTColFields.systemName,
            headerName: ActionDataTColHeaders.systemName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: ActionDataTColFields.active,
            headerName: ActionDataTColHeaders.active,
            flex: 1,
            minWidth: 100,
        },
        {
            field: "",
            headerName: ActionDataTColHeaders.actions,
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteRoundedIcon sx={{ color:  iconColor}} onClick={() => props.deleteAction && props.deleteAction(params.row as Action)} />
                    </>
                )
            }
        }
    ]

    return (
        <div>
            <DataGrid
                columns={columns}
                rows={props.rows}
                height='250px'
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick && props.onRowClick((event.row as Action))}
                onRowDoubleClick={(event) => props.onRowDoubleClick && props.onRowDoubleClick(event.row as Action)}
            />
        </div>
    )
}