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
import SortsTable from './SortsDataTable';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import SortForm from './SortForm';
import SortItemsDataTable from './SortItemsDataTable';
import SortItemForm from './SortItemForm';
import { DataContractService } from '@/services/DataContract';
import { RemoteSort } from '@/models/Entities/RemoteSort';


export default function Sorts() {

    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { remoteSorts, selectedView, refreshAllDataContracts, moduleId } = dataContractsContext;


    const [form, setForm] = useState<ReactNode>();
    const [clickedSort, setClickedSort] = useState<RemoteSort>();

    const [loadingSorts, setLoadingSorts] = useState<boolean>(false);

    const [loadingSortItems, setLoadingSortItems] = useState<boolean>(false);

    useEffect(() => {
        if (remoteSorts) {
            const currentSort = remoteSorts?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.remoteSorts.find(sort => sort.id === clickedSort?.id);
            if (currentSort) {
                setClickedSort(currentSort);
            } else {
                setClickedSort(undefined);
            }
        }
    }, [remoteSorts]);

    const deleteSort = async (sortId: string) => {
        try {
            setLoadingSortItems(true);
            setClickedSort(undefined);
            await DataContractService.deleteSort({ id: sortId });
            refreshAllDataContracts(moduleId);
            setLoadingSortItems(false);
        } catch (error) {
            setLoadingSortItems(false);
        }
    }
    const deleteRemoteSortItem = async (sortItemId: string) => {
        try {
            setLoadingSortItems(true);
            await DataContractService.deleteSortItem({ id: sortItemId });
            refreshAllDataContracts(moduleId);
            setLoadingSortItems(false);
        } catch (error) {
            setLoadingSortItems(false);
        }
    }
  
    const getIndex = (): number => {
        const sortItems = clickedSort?.remoteSortUIItems;
        
        if (!sortItems || sortItems.length === 0) {
            return 1;
        }
        const maxIndex = sortItems.reduce((max, item) => {
            return item.itemIndex > max ? item.itemIndex: max;
        }, 0);

        return maxIndex + 1;
    }

    const handleCloseModal = () => {
        setForm(undefined);
    };
    const handleSortClick = (data: RemoteSort) => {
        setLoadingSortItems(true);
        setClickedSort(data);
        setLoadingSortItems(false);
    }

    return (
        <>
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Sorts" />
                <Button
                    label="Create sort"
                    color="primary"
                    className={globalStyles.createButton}
                    onClick={() => setForm(<SortForm onClose={handleCloseModal} />)}
                />
            </div>
            <SortsTable
                sorts={remoteSorts?.find(x => x.dataContractId === selectedView?.dataContractReferenceId)?.remoteSorts}
                loading={loadingSorts}
                onRowClick={handleSortClick}
                onRowDoubleClick={(event: GridRowParams) => setForm(<SortForm onClose={handleCloseModal} sortData={event.row} />)}
                deleteSort={deleteSort}
            />
            <div className={globalStyles.headerButtonGroup}>
                <PageHeader pageTitle="Sort items" />
                <Button
                    label="Create sort item"
                    color="primary"
                    disabled={!clickedSort}
                    className={globalStyles.createButton}
                    onClick={() => setForm(<SortItemForm getIndex={getIndex} onClose={handleCloseModal} sortId={clickedSort?.id} />)}
                />

            </div>
            <SortItemsDataTable
                clickedSort={clickedSort}
                deleteRemoteSortItem={deleteRemoteSortItem}
                onRowDoubleClick={(event: GridRowParams) => setForm(<SortItemForm getIndex={getIndex} onClose={handleCloseModal} sortItemData={event.row} sortId={clickedSort?.id} />)}
            />
            {
                form
            }
        </>
    );
}
