import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import { GridColDef, GridRenderCellParams, GridRowModel, GridRowParams } from '@ims/component-library';
import React, { ReactNode, SetStateAction } from 'react'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Subject } from '@/models/Entities/Subject';
import { SubjectDataTColsFields, SubjectDataTColsHeaders } from './SubjectDataTCols';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpireDateModal from './ExpireDateModal';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { SubjectSources } from '@/models/Enums/Enums';
import ChangePasswordModal from './ChangePasswordModal';

interface SubjectDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    subjects?: Subject[];
    loading?: boolean;
    deleteSubject?: Function;
    setModal: React.Dispatch<SetStateAction<ReactNode>>;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    setIsProcessFinished: React.Dispatch<SetStateAction<boolean>>;
}

const DeleteIconColor = "warning.main";
const EditIconColor   = "warning";
const local           = true;
 
export default function SubjectDataTable(props: SubjectDataTableProps ) {

    const columnVisibilityModel = {
        id: false,
        emailAddress: false,
        samAccountName: false,
    };

    const openExpireDateModal = (row: Subject) => {
        console.log("row:" , row);
        props.setModal(<ExpireDateModal setModal={props.setModal} local={row.isLocal} rowData={row} setLoading={props.setLoading}
            setIsProcessFinished={props.setIsProcessFinished} 
        />);
    }
    const openChangePasswordModal = (row: Subject) => {
        if(row.sourceType === SubjectSources.Local){
            props.setModal(<ChangePasswordModal rowData={row} setModal={props.setModal}/>);
        }
    }

    const columns: GridColDef[] = [
        {
            field: SubjectDataTColsFields.editFields,
            headerName: SubjectDataTColsHeaders.editFields,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <EditOutlinedIcon 
                            color={EditIconColor}
                            onClick={() => openExpireDateModal(params.row as Subject)}
                        />
                        <KeyOutlinedIcon 
                            color={EditIconColor}
                            onClick={() => openChangePasswordModal(params.row as Subject)}
                        />
                    </>
                )
            }
        },
        {
            field: SubjectDataTColsFields.id,
            headerName: SubjectDataTColsHeaders.id,
            flex: 1,
            minWidth: 100,
        },
        {
            field: SubjectDataTColsFields.displayName,
            headerName: SubjectDataTColsHeaders.displayName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: SubjectDataTColsFields.emailAddress,
            headerName: SubjectDataTColsHeaders.emailAddress,
            flex: 1,
            minWidth: 100,
        },
        {
            field: SubjectDataTColsFields.samAccountName,
            headerName: SubjectDataTColsHeaders.samAccountName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: SubjectDataTColsFields.domainName,
            headerName: SubjectDataTColsHeaders.domainName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: SubjectDataTColsFields.actions,
            headerName: SubjectDataTColsHeaders.actions,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteRoundedIcon sx={{
                            color: DeleteIconColor
                        }} onClick={() => props.deleteSubject && props.deleteSubject(params.row.id)} />
                    </>
                )
            }
        },
    ]

    return (
        <>
            <DataGrid
                columns={columns}
                rows={props.subjects}
                height='70vh'
                loading={props.loading}
                onRowClick={(event: GridRowParams) => props.onRowClick ? props.onRowClick(event.row as Subject) : () => { }}
                onRowDoubleClick={(event) => props.onRowDoubleClick && props.onRowDoubleClick(event.row as Subject)}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
