/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { AutoComplete, Button, DataGrid, GridColDef, GridRenderCellParams, GridRowParams, OptionType, Toggle } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { OperatorEnum, Property, PropertyType } from '@/models/Entities/Property';
import { ModulesService } from '@/services/Modules';
import { SelectedInputEnum } from '@/models/Enums/Enums';
import FiltersTable from './FiltersDataTable';
import { RemoteFilter, RemoteFilterForCreate, RemoteFilterForUpdate, RemoteFilterItemForCreate, RemoteFilterItemForUpdate } from '@/models/Entities/RemoteFilter';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import FilterForm from './FilterForm';
import FilterItemsDataTable from './FilterItemsDataTable';
import FilterItemForm from './FilterItemForm';
import { DataContractService } from '@/services/DataContract';

// interface FiltersDataTableProps {
//     onRowClick?: Function;
//     onRowDoubleClick?: Function;
//     // filters?: FilterProperty[];
//     loading?: boolean;
//     deleteLanguage?: Function;
// }
interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}
const columnsMikroFilter: GridColDef[] = [
    {
        field: "friendlyName",
        headerName: "Friendly name",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "identifier",
        headerName: "Identifier",
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Toggle
                    defaultChecked={params.row.available}
                    label=""
                    id={`identifier-${params.row.id}`}
                />
            )
        }
    },
    {
        field: "property",
        headerName: "Property",
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <>
                    {`property-${params.row.id}`}
                </>
            )
        }
    },
    {
        field: "value",
        headerName: "Value",
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <>
                    {`value-${params.row.id}`}
                </>
            )
        }
    },
];
type Operation = "update" | "create";
export interface SubmitFilterType {
    data?: RemoteFilterForCreate | RemoteFilterForUpdate;
    operation?: Operation;
}
export interface SubmitFilterItemType {
    data?: RemoteFilterItemForCreate | RemoteFilterItemForUpdate;
    operation?: Operation;
}
export default function Filters() {

    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { remoteFilters, selectedView,refreshAllDataContracts, moduleId } = dataContractsContext;


    const [openFilterItem, setOpenFilterItem] = useState(false);
    const [form, setForm] = useState<ReactNode>();

    const [loadingFilters, setLoadingFilters] = useState<boolean>(false);

    const [clickedFilter, setClickedFilter] = useState<RemoteFilter>();
    const [loadingFilterItems, setLoadingFilterItems] = useState<boolean>(false);

    useEffect(() => {
        if (remoteFilters) {
            const currentFilter = remoteFilters?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.remoteFilters.find(sort => sort.id === clickedFilter?.id);
            if (currentFilter) {
                setClickedFilter(currentFilter);
            } else {
                setClickedFilter(undefined);
            }
        }
    }, [remoteFilters]);

    const onSuccessfulFormSubmit = () => {

    }
    const deleteFilter = async (filterId: string) => {
        try {
            setLoadingFilterItems(true);
            setClickedFilter(undefined);
            await DataContractService.deleteFilter({ id: filterId });
            refreshAllDataContracts(moduleId);
            setLoadingFilterItems(false);
        } catch (error) {
            setLoadingFilterItems(false);
        }
    }
    const deleteRemoteFilterItem = async (filterItemId: string) => {
        try {
            setLoadingFilterItems(true);
            await DataContractService.deleteFilterItem({ id: filterItemId });
            refreshAllDataContracts(moduleId);
            setLoadingFilterItems(false);
        } catch (error) {
            setLoadingFilterItems(false);
        }
    }


    const handleOpenModal = () => {
        // setOpenModal(true);
    };

    const handleCloseModal = () => {
        setForm(undefined);
    };
    const handleFilterClick = (filter: RemoteFilter) => {
        setLoadingFilterItems(true);
        setClickedFilter(filter);
        setLoadingFilterItems(false);
    }

    const getIdentifier = (): number => {
        const filterItems = clickedFilter?.remoteFilterUItems;
        if (!filterItems || filterItems.length === 0) {
            return 1;
        }
        const maxIdentifier = filterItems.reduce((max, item) => {
            return item.identifier > max ? item.identifier : max;
        }, 0);

        return maxIdentifier + 1;
    }

    return (
        <>
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Filters" />
                <Button
                    label="Create filter"
                    color="primary"
                    className={globalStyles.createButton}
                    onClick={() => setForm(<FilterForm onClose={handleCloseModal} />)}
                />
            </div>
            <FiltersTable
                filters={remoteFilters?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.remoteFilters}
                loading={loadingFilters}
                onRowClick={handleFilterClick}
                onRowDoubleClick={(event: GridRowParams) => setForm(<FilterForm onClose={handleCloseModal} filterData={event.row} />)}
                deleteFilter={deleteFilter}
                setOpenMicroFilter={setOpenFilterItem}
            />
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Filter items" />
                <Button
                    label="Create filter item"
                    color="primary"
                    disabled={!clickedFilter}
                    className={globalStyles.createButton}
                    onClick={() => setForm(<FilterItemForm onClose={handleCloseModal} getIdentifier={getIdentifier} filterId={clickedFilter?.id} />)}
                />

            </div>
            <FilterItemsDataTable
                clickedFilter={clickedFilter}
                deleteRemoteFilterItem={deleteRemoteFilterItem}
                onRowDoubleClick={(event: GridRowParams) => setForm(<FilterItemForm onClose={handleCloseModal} filterItemData={event.row} getIdentifier={getIdentifier} filterId={clickedFilter?.id} />)}
            />
            {
                form
            }
        </>
    );
}
