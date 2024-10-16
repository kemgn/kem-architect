import { Endpoint } from "@/models/Entities/Endpoint";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams, Toggle } from "@ims/component-library";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { EPointDataTColFields, EPointDataTColHeaders } from "./EPointDataTColFields";
import { SetStateAction } from "react";

interface EnPDataTableProps {
    rows:              Endpoint[];
    onRowClick:        Function;
    onRowDoubleClick:  Function;
    deleteEndPoint:    Function;
    loading:           boolean;
    setEndpoints:      React.Dispatch<SetStateAction<Endpoint[]>>;
}

const emptyStr = "";
const activetoggle = "activetoggle";

export default function EndpointsDataTable(props: EnPDataTableProps){
    
    const handleChange = (event: React.SyntheticEvent<Element, Event> , rowData: Endpoint) => {

    }

    const columns: GridColDef[] = [
        {
            field: EPointDataTColFields.endpointName,
            headerName: EPointDataTColHeaders.endpointName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: EPointDataTColFields.active,
            headerName: EPointDataTColHeaders.active,
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <Toggle id={activetoggle} label={emptyStr} name={activetoggle} defaultChecked={params.value} onChange={(e) => handleChange(e , params.row as Endpoint)}/>
                    </>
                )
            }
        },
        {
            field: "",
            headerName: EPointDataTColHeaders.actions,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteRoundedIcon sx={{color: "warning.main"}} onClick={() => props.deleteEndPoint && props.deleteEndPoint(params.row as Endpoint)}/>
                    </>
                )
            }
        },
    ]

    return (
        <>
            <DataGrid 
                columns={columns}
                rows={props.rows}
                height='250px'
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick && props.onRowClick((event.row as Endpoint))}
                onRowDoubleClick={(event) => props.onRowDoubleClick && props.onRowDoubleClick(event.row as Endpoint)}
            />
        </>
    )
}