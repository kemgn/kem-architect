import { Button, DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import { DataContractService } from '@/services/DataContract';
import React, { ReactNode, useContext, useState } from 'react'
import FormCreateForm from './FormCreateForm';
import { GridColDef, GridRenderCellParams, GridRowModel, GridRowParams } from '@ims/component-library';
import { DataContractsContext } from '@/app/(components)/_Contexts/ViewsDataContext';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { FormProperty, ViewProperty } from '@/models/Entities/DataContract';
import { FormsContext } from './FormsContext';
import DeleteButton from '@/app/(components)/DeleteButton/DeleteButton';

export default function FormLeftBar() {
    const dataContractsContext = useContext(DataContractsContext);
    const formsContext = useContext(FormsContext);

    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    if (!formsContext) {
        throw new Error("formsContext must be used within a FormsContextProvider");
    }

    const { formDataContracts, setViewDataContracts, selectedView, refreshAllDataContracts, moduleId, setDataContractsLoading } = dataContractsContext;
    const { selectedForm, setSelectedForm } = formsContext;

    const [modal, setModal] = useState<ReactNode>();

    const onClose = () => {
        setModal(null);
    }
    const createFormTableRow = () => {
        setModal(<FormCreateForm onClose={onClose} />)
    }
    const deleteForm = async (formId: string) => {
        setDataContractsLoading(true);
        try {
            if (!formDataContracts) {
                return;
            }
            await DataContractService.deleteDataContract({ id: formId });
            let index = -1;
            setViewDataContracts(formDataContracts?.filter((dc, index_) => {
                if (dc.id === formId) {
                    index = index_;
                }
                return dc.id !== formId;
            }));
            refreshAllDataContracts(moduleId);
            if (formDataContracts[index - 1]) {
                setSelectedForm(formDataContracts[index - 1]);
            } else if (formDataContracts[index + 1]) {
                setSelectedForm(formDataContracts[index + 1])
            } else {
                setSelectedForm(undefined);
            }
            setDataContractsLoading(false);
        } catch (error) {
            setDataContractsLoading(false);
        }
    }
    const columns: GridColDef[] = [
        {
            field: "systemName",
            headerName: "System name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <DeleteButton compact={true} params={params} onClick={deleteForm} />
                )
            }
        }
    ]
    return (
        <div style={{ width: !selectedForm ? "100%" : "20%", height: "59vh", boxShadow: "0px 2px 3px 1px rgba(0,0,0,0.5)", textAlign: "center" }}>
            <Button
                label="Create form"
                style={{ margin: "12px 0px", width: !selectedForm ? "20%" : "80%", }}
                onClick={createFormTableRow}
            // loading={dataContractsLoading}
            />
            <DataGrid
                columns={columns}
                height="53vh"
                rows={formDataContracts?.filter(x => x.parentDataContractId === selectedView?.dataContractReferenceId)}
                density="compact"
                onRowClick={(rowData: GridRowParams) => {
                    setSelectedForm(rowData.row);
                }}
                rowSelectionModel={[selectedForm?.id!]}
                onRowDoubleClick={(event: GridRowModel) => setModal(<FormCreateForm onClose={onClose} form={event.row} />)}
            />
            {modal}
        </div>
    )
}
