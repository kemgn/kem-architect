import { Button, DataGrid, GridColDef, GridRenderCellParams, GridRowModel, GridRowParams } from "@ims/component-library"
import React, { ReactNode, useContext, useEffect, useState } from "react"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";
import ViewCreateForm from "./ViewCreateForm";
import { DataContractService } from "@/services/DataContract";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";
import DeleteButton from "@/app/(components)/DeleteButton/DeleteButton";
import { DataContractForUpdate } from "@/models/Entities/DataContract";

interface ViewLeftBarProps {
}

export default function ViewLeftBar(props: ViewLeftBarProps) {
    const [modal, setModal] = useState<ReactNode>();
    const [createLoading, setCreateLoading] = useState<boolean>();
    const dataContractsContext = useContext(DataContractsContext);

    const { showToastAlert } = useToast();

    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }

    const { viewDataContracts, setViewDataContracts: setDataContracts, setSelectedRow, selectedView: selectedRow, dataContractsLoading, setDataContractsLoading } = dataContractsContext;
    const onClose = () => {
        setModal(null);
    }
    const createViewTableRow = () => {
        setModal(<ViewCreateForm onClose={onClose} />)
    }
    const deleteView = async (viewId: string) => {
        try {
            setDataContractsLoading(true);
            if (!viewDataContracts) {
                return;
            }
            await DataContractService.deleteDataContract({ id: viewId });
            showToastAlert(messages.deleteViewSuccess.severity, messages.deleteViewSuccess.content, messages.deleteViewSuccess.title);
            let index = -1;
            setDataContracts(viewDataContracts?.filter((dc, index_) => {
                if (dc.id === viewId) {
                    index = index_;
                }
                return dc.id !== viewId;
            }));

            if (viewDataContracts[index - 1]) {
                setSelectedRow(viewDataContracts[index - 1]);
            } else if (viewDataContracts[index + 1]) {
                setSelectedRow(viewDataContracts[index + 1])
            } else {
                setSelectedRow(undefined);
            }
            setDataContractsLoading(false);

        } catch (error) {
            showToastAlert(messages.deleteViewError.severity, messages.deleteViewError.content, messages.deleteViewError.title);
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
                    <DeleteButton compact={true} params={params} onClick={deleteView} />
                )
            }
        }
    ]
    return (
        <>
            <div style={{ width: !selectedRow ? "100%" : "20%", height: "70vh", boxShadow: "0px 2px 3px 1px rgba(0,0,0,0.5)", textAlign: "center" }}>
                <Button
                    label="Create view"
                    style={{ margin: "12px 0px", width: !selectedRow ? "20%" : "80%", }}
                    onClick={createViewTableRow}
                    loading={dataContractsLoading}
                />
                <DataGrid
                    columns={columns}
                    height="64vh"
                    rows={viewDataContracts}
                    density="compact"
                    onRowClick={(rowData: GridRowParams) => {
                        setSelectedRow(rowData.row);
                    }}
                    onRowDoubleClick={(event: GridRowModel) => setModal(<ViewCreateForm onClose={onClose} dataContract={event.row}/>)}
                    rowSelectionModel={selectedRow?.id}
                />
            </div>
            {modal}
        </>
    )
}
