import { Button, DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library'
import React, { ReactNode, useEffect, useState } from 'react'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropertyModal from './propertyModal'
import { useRouter } from 'next/router';
import { ModulesService } from '@/services/Modules';
import { Property, PropertyForCreate, PropertyForUpdate, PropertyType } from '@/models/Entities/Property';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import { Module } from '@/models/Entities/Module';
import { propertyColFields } from './propertyColFields';
import { propertyColHeaders } from './propertyColHeaders';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';
type Operation = "update" | "create";
export interface SubmitProperty {
    data?: PropertyForCreate | PropertyForUpdate;
    operation?: Operation;
}
interface PropertiesDataTableProps {

}

const initialColuldNotVisible = {
    id: false,
    createTime: false,
    updateTime: false,
    isSystem: false,
    schema: false,
    virtual: false,
    labelsCustomizable: false,
    formula: false,
}

export default function Properties(props: PropertiesDataTableProps) {

    const [columnVisibilityModel] = useState(initialColuldNotVisible);
    const [properties, setProperties] = useState<Module[]>([]);
    const [moduleId, setModuleId] = useState<string>("");
    const [modal, setModal] = useState<ReactNode>();
    const [loading, setLoading] = useState<boolean>(false)

    const { showToastAlert } = useToast();

    const deleteIconColor = "warning.main";
    const moduleLink = "/modules";
    const pageTitle = "Properties";
    const createPropertyButtonLabel = "Create property";
    const createPropertyButtonColor = "primary";
    const dataGridHeight = "70vh";
    const urlRegex = /modules\/([a-zA-Z0-9-]+)/


    useEffect(() => {
        getAllProperties();
    }, []);

    // const getAllProperties = async () => {
    //     try {
    //         const url = window.location.href;
    //         const idMatch = url.match(urlRegex);
    //         if (idMatch) {
    //             setModuleId(idMatch[1]);
    //             const response = await ModulesService.getAllProperties(idMatch[1]);
    //             if(response.isSuccess){        
    //                 setProperties(response.data);
    //             }
    //         }
    //     } catch (_) {

    //     }
    // }
    const getAllProperties = async () => {
        setLoading(true);
        try {
            const url = window.location.href;
            const idMatch = url.match(urlRegex);
            if (idMatch) {
                setModuleId(idMatch[1]);
                const response = await ModulesService.getAllProperties(idMatch[1]);
                if (response.isSuccess) {
                    const updatedProperties = response.data.map((property: any) => ({
                        ...property,
                        type: PropertyType[property.type]
                    }));
                    setProperties(updatedProperties);
                    setLoading(false);

                }
            }
        } catch (_) {
            setLoading(false);
        }
    }

    const columns: GridColDef[] = [
        {
            field: propertyColFields.id,
            headerName: propertyColHeaders.id,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.type,
            headerName: propertyColHeaders.type,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.systemName,
            headerName: propertyColHeaders.systemName,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.isSystem,
            headerName: propertyColHeaders.isSystem,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.schema,
            headerName: propertyColHeaders.schema,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.virtual,
            headerName: propertyColHeaders.virtual,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.labelsCustomizable,
            headerName: propertyColHeaders.labelsCustomizable,
            flex: 1,
            minWidth: 100,
        },
        // {
        //     field: propertyColFields.unique,
        //     headerName: propertyColHeaders.unique,
        //     flex: 1,
        //     minWidth: 100,
        // },
        {
            field: propertyColFields.formula,
            headerName: propertyColHeaders.formula,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.createTime,
            headerName: propertyColHeaders.createTime,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.updateTime,
            headerName: propertyColHeaders.updateTime,
            flex: 1,
            minWidth: 100,
        },
        {
            field: propertyColFields.empty,
            headerName: propertyColHeaders.actions,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteOutlineOutlinedIcon
                            sx={{ color: deleteIconColor }} className={globalStyles.iconHighlight} onClick={() => deleteProperty(params.id as string)} />
                    </>
                )
            }
        }
    ]

    const deleteProperty = async (propertyId: string) => {
        //const Id = propertyId.split(":").slice(0, -1).join(":");
        try {
            await ModulesService.deleteProperty({ id: propertyId });
            setProperties(prevItems => prevItems?.filter(x => x.id !== propertyId));
        } catch (_) {
        }
    }



    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <Link href={moduleLink}><ArrowBackRoundedIcon /></Link>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle={pageTitle} />
                        <Button
                            label={createPropertyButtonLabel}
                            color={createPropertyButtonColor}
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<PropertyModal onClose={() => { setModal(undefined) }} moduleId={moduleId} onSuccessfulFormSubmit={() => { getAllProperties() }} />)
                            }}
                            loading={loading}
                        />
                    </div>
                    <DataGrid
                        columns={columns}
                        rows={properties}
                        height={dataGridHeight}
                        onRowDoubleClick={(event: any) => {
                            setModal(<PropertyModal onClose={() => { setModal(undefined) }} moduleId={moduleId} onSuccessfulFormSubmit={() => { getAllProperties() }} propertyData={event.row} />)
                        }}
                        columnVisibilityModel={columnVisibilityModel}
                        loading={loading}
                    />
                </div>
            </div>
            {modal}
        </>
    )
}