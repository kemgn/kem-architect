import { RemoteSort, RemoteSortItem, RemoteSortItemForUpdate } from "@/models/Entities/RemoteSort";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowOrderChangeParams, Toggle } from "@ims/component-library";
import React, { useContext } from "react"
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { DataContractService } from "@/services/DataContract";
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";

interface SortItemsDataTableProps {
    clickedSort?: RemoteSort;
    loading?: boolean;
    onRowDoubleClick: Function;
    deleteRemoteSortItem?: Function;
}

export default function SortItemsDataTable(props: SortItemsDataTableProps) {
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { refreshAllDataContracts, moduleId } = dataContractsContext;


    const columns: GridColDef[] = [
        // {
        //     field: "itemIndex",
        //     headerName: "#",
        //     width: 70,
        //     // renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
        // },
        {
            field: "propertySystemName",
            headerName: "Property system name",
            flex: 1
        },
        {
            field: "isDescending",
            headerName: "Sort descending",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.isDescending}
                        label=""
                        id={""}
                    />
                )
            }
        },
        {
            field: "sortOnLabel",
            headerName: "Sort on label",
            flex: 1,
            minWidth: 100,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Toggle
                        checked={params.row.sortOnLabel}
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
                        onClick={() => props.deleteRemoteSortItem ? props.deleteRemoteSortItem(params.row.id) : () => { }}
                        className={globalStyles.iconHighlightCompact}
                    />
                )
            }
        }
    ]

    const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
        // const sortedSortItems = [...(props.clickedSort?.remoteSortUIItems || [])]
        //     .sort((a, b) => a.itemIndex - b.itemIndex);

        // const targetIndexItem = sortedSortItems[params.targetIndex];
        // const oldIndexItem = sortedSortItems[params.oldIndex];
        
        // const targetIndex = targetIndexItem.itemIndex;
        // const oldIndex = oldIndexItem.itemIndex;

        // targetIndexItem.itemIndex = oldIndex;
        // oldIndexItem.itemIndex = targetIndex;
        
        // 
        // try {
        //     // yeni index
        //     await DataContractService.updateSortItem({
        //         id: targetIndexItem.id,
        //         isDescending: targetIndexItem.isDescending,
        //         itemIndex: targetIndexItem.itemIndex,
        //         propertyId: targetIndexItem.propertyId,
        //         propertySystemName: targetIndexItem.propertySystemName,
        //         sortOnLabel: targetIndexItem.sortOnLabel
        //     });
        //     //eski index
        //     await DataContractService.updateSortItem({
        //         id: oldIndexItem.id,
        //         isDescending: oldIndexItem.isDescending,
        //         itemIndex: oldIndexItem.itemIndex,
        //         propertyId: oldIndexItem.propertyId,
        //         propertySystemName: oldIndexItem.propertySystemName,
        //         sortOnLabel: oldIndexItem.sortOnLabel
        //     });
        //     refreshAllDataContracts(moduleId);
        // } catch (error) {

        // }

    }

    return (
        <>
            <DataGrid
                columns={columns}
                rows={
                    [...(props.clickedSort?.remoteSortUIItems || [])]
                        .sort((a, b) => a.itemIndex - b.itemIndex)
                }
                height="222px"
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick(event)}
                density="compact"
                // rowReordering
                handleRowOrderChange={handleRowOrderChange}
            />
        </>
    )
}
