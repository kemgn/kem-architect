import { FilterCriteria, RemoteFilter, RemoteFilterItem } from '@/models/Entities/RemoteFilter';
import { DataGrid, GridColDef, GridRenderCellParams } from '@ims/component-library';
import React, { useContext, useState } from 'react'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { OperatorEnum, PropertyForListForCreate, PropertyForListForUpdate, PropertyType } from '@/models/Entities/Property';
import { GetEnumKey, GetEnumValue } from '@/utils/Helpers';
import { ArchitectDataContext } from '@/app/(components)/_Contexts/ArchitectDataContext';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import { SubjectService } from '@/services/Subject';

interface FilterItemsDataTableProps {
    clickedFilter?: RemoteFilter;
    loading?: boolean;
    onRowDoubleClick: Function;
    deleteRemoteFilterItem?: Function;
}

export default function FilterItemsDataTable(props: FilterItemsDataTableProps) {

    const architectDataContext = useContext(ArchitectDataContext);
    const dataContractsContext = useContext(DataContractsContext);

    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    if (!architectDataContext) {
        throw new Error("useArchitectData must be used within a ArchitectDataProvider");
    }
    const { moduleId } = dataContractsContext;
    const { modules, lists, trees } = architectDataContext;
    const properties = modules.find(x => x.id === moduleId)?.properties;
    const columns: GridColDef[] = [
        {
            field: "identifier",
            headerName: "Identifier",
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "propertySystemName",
            headerName: "Property system name",
            flex: 1
        },
        {
            field: "operator",
            headerName: "Operator",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <span>{GetEnumKey(FilterCriteria, params.row.operator)}</span>
                )
            }
        },
        {
            field: "propertyValue",
            headerName: "Value",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [subjectDisplayName, setSubjectDisplayName] = useState<string>("");
                const propType = GetEnumValue(PropertyType, params.row?.propertyId?.split(":")[2]);
                const property = properties?.find(x => x.id === params.row.propertyId);
                const getCellValue = () => {
                    if (!params.row.propertyValue) {
                        return "-";
                    }
                    switch (propType) {
                        case PropertyType.AutoCode:
                        case PropertyType.Bool:
                        case PropertyType.Chat:
                        case PropertyType.DateTime:
                        case PropertyType.DataLink:
                        case PropertyType.Integer:
                        case PropertyType.Float:
                        case PropertyType.Time:
                        case PropertyType.String:
                            return params.row.propertyValue;
                        case PropertyType.List:
                            const targetOption = lists.flatMap(l => l.listOptions)?.find(option => option?.listOptionRefId === params.row.propertyValue);
                            return targetOption?.systemName;
                        case PropertyType.ObjectLink:
                            return property?.systemName;
                        case PropertyType.Tree:
                            const targetNode = trees.flatMap(l => l.nodeUIs)?.find(node => node?.nodeReferenceId === params.row.propertyValue);
                            return targetNode?.systemName;
                        case PropertyType.SubjectLink:
                            SubjectService.getSubjectByGuid(params.row.propertyValue).then(result => setSubjectDisplayName(result.displayName));
                            return subjectDisplayName;
                    }
                }
                return (
                    <>
                        {
                            getCellValue()
                        }
                    </>
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
                        onClick={() => props.deleteRemoteFilterItem ? props.deleteRemoteFilterItem(params.row.id) : () => { }}
                        className={globalStyles.iconHighlightCompact}
                    />
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.clickedFilter?.remoteFilterUItems}
                height='222px'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick(event)}
                density="compact"
            />
        </>
    )
}
