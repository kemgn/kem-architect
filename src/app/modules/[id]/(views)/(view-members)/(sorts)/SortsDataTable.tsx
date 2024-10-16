import React from 'react';
import { Button, DataGrid, GridColDef, GridRenderCellParams, GridRowParams, Toggle } from '@ims/component-library';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { OperatorEnum, PropertyType } from '@/models/Entities/Property';
import { RemoteFilter } from '@/models/Entities/RemoteFilter';
import { RemoteSort } from '@/models/Entities/RemoteSort';

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
interface SortsTableProps {
    sorts?: RemoteSort[];
    loading?: boolean;
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    deleteSort?: Function;
}

export default function SortsTable(props: SortsTableProps) {
    const columns: GridColDef[] = [
        {
            field: "systemName",
            headerName: "Friendly name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "isDefault",
            headerName: "Default",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.isDefault}
                        label=""
                        id={""}
                    />
                )
            }
        },
        {
            field: "doGrouping",
            headerName: "Group first entry",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.doGrouping}
                        label=""
                        id={""}
                    />
                )
            }
        },
        {
            field: "groupCountVisibility",
            headerName: "Show group count",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.groupCountVisibility}
                        label=""
                        id={""}
                    />
                )
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <DeleteRoundedIcon
                        sx={{ color: "warning.main" }}
                        onClick={() => props.deleteSort ? props.deleteSort(params.row.id) : () => { }}
                        className={globalStyles.iconHighlightCompact}
                    />
                )
            }
        }
    ];

    const onRowClick = (event: GridRowParams) => {
        if (props.onRowClick) {
            props.onRowClick(event.row);
        }
    };

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.sorts}
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
