import React from 'react';
import { Button, DataGrid, GridColDef, GridRenderCellParams, GridRowParams, Toggle } from '@ims/component-library';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { OperatorEnum, PropertyType } from '@/models/Entities/Property';
import { RemoteFilter } from '@/models/Entities/RemoteFilter';

// interface FilterProperty {
//     id: number;
//     friendlyName: string;
//     available: boolean;
//     customFilter: string;
//     customizable: boolean;
//     labelCustomizable: boolean;
//     microFilters?: MicroFilters;
// }
// interface MicroFilters {
//     id: string;
//     property: PropertyType;
//     operator: OperatorEnum;
//     value?: string;
//     system: boolean;
// }
interface FiltersTableProps {
    filters?:   RemoteFilter[];
    loading?: boolean;
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    deleteFilter?: Function;
    setOpenMicroFilter: (open: boolean) => void;
}

export default function FiltersTable(props: FiltersTableProps) {
    const columns: GridColDef[] = [
        {
            field: "systemName",
            headerName: "Friendly name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isMandatory",
            headerName: "Is mandatory",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.isMandatory}
                        label=""
                        id={`available-${params.row.id}`}
                    />
                )
            }
        },
        {
            field: "showAsAvailableFilter",
            headerName: "Available in view",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.showAsAvailableFilter}
                        label=""
                        id={`available-${params.row.id}`}
                    />
                )
            }
        },
        {
            field: "customLogic",
            headerName: "Custom filter logic",
            flex: 1,
            minWidth: 100
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <DeleteRoundedIcon
                        sx={{ color: "warning.main" }}
                        onClick={() => props.deleteFilter ? props.deleteFilter(params.row.id) : () => { }}
                        className={globalStyles.iconHighlightCompact}
                    />
                )
            }
        }
    ];

    const onRowClick = (event: GridRowParams) => {
        props.setOpenMicroFilter(true);
        if (props.onRowClick) {
            props.onRowClick(event.row);
        }
    };

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.filters}
                height='222px'
                loading={props.loading}
                onRowClick={onRowClick}
                onRowDoubleClick={(event) => props.onRowDoubleClick ? props.onRowDoubleClick(event) : () => { }}
                columnVisibilityModel={{}}
                density="compact"
            />
        </>
    );
}
