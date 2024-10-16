import { Button, DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@ims/component-library'
import React, { ReactNode, useEffect, useState } from 'react'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PropertyModal from './propertyModal'
import PropertyModalTmp from './PropertyModalTmp';
import { useRouter } from 'next/router';
import { ModulesService } from '@/services/Modules';
import { Property, PropertyForCreate, PropertyForUpdate, PropertyType } from '@/models/Entities/Property';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Link from 'next/link';
import { Module } from '@/models/Entities/Module';
import { propertyColFields } from './propertyColFields';
import { propertyColHeaders } from './propertyColHeaders';
type Operation = "update" | "create";
export interface SubmitProperty {
    data?: PropertyForCreate | PropertyForUpdate;
    operation?: Operation;
}
interface PropertiesDataTableProps {
    onRowClick?: Function;
    onRowDoubleClick?: Function;
    properties?: object[];
    loading?: boolean;
    deleteProperty?: Function;
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

export default function PropertiesDataTable(props: PropertiesDataTableProps) {

    const [columnVisibilityModel] = useState(initialColuldNotVisible);
    const [id, setId] = useState('');
    const [loadingProperty, setLoadingProperty] = useState<boolean>(false);
    const [property, setProperty] = useState<Property[]>([]);
    const [moduleId, setModuleId] = useState<string>("");
    const [modal, setModal] = useState<ReactNode>();

    const deleteIconColor = "warning.main";
    const moduleLink = "/modules";
    const pageTitle = "Properties";
    const createPropertyButtonLabel = "Create property";
    const createPropertyButtonColor = "primary";
    const dataGridHeight = "70vh";

    useEffect(() => {
        //   const url = window.location.href;
        //   const idMatch = url.match(/modules\/([a-zA-Z0-9-]+)/);
        //   if (idMatch) {
        //     setId(idMatch[1]);
        //     console.log(idMatch[1],id,":UrlID");
        //     getAllProperty();
        //   }
        getAllProperties();
    }, []);

    const getAllProperties = async () => {
        setLoadingProperty(true);
        try {
            const url = window.location.href;
            const idMatch = url.match(/modules\/([a-zA-Z0-9-]+)/);
            if (idMatch) {
                setModuleId(idMatch[1]);
                const data = await ModulesService.getAllProperties(idMatch[1]);
                setProperty(data.data);
                setLoadingProperty(false);
                console.log(data, "propertyDat");
            }
        } catch (_) {
            setLoadingProperty(false);
        }
        setLoadingProperty(false);
    }

    // const rows = [
    //     {
    //         id: "1111",
    //         type: "type",
    //         systemName: "SystemName",
    //         isSystem: true,
    //         unique: false,
    //         createTime: "01.21.2000",
    //         updateTime: "01.21.2000"
    //     }
    // ]

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
                        <DeleteOutlineOutlinedIcon sx={{
                            color: deleteIconColor
                        }} className={globalStyles.iconHighlight} onClick={() => props.deleteProperty ? props.deleteProperty(params.row.id) : () => { }} />
                    </>
                )
            }
        }
    ]
    const handlePropertyTypeModalClose = (data: SubmitProperty) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setProperty([...property, data.data as Property])
                break;
            case "update":
                const updateProperty = property.map(item =>
                    item.id === (data.data as PropertyForUpdate).id ? data?.data as PropertyForUpdate : item
                );
                setProperty(updateProperty as Property[]);
                break;
            default:
                break;
        }
    }

    const onClose = () => {
        setModal(null);
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
                                setModal(<PropertyModal
                                    onClose={onClose}
                                    moduleId={moduleId}
                                    onSuccessfulFormSubmit={() => { }} />)
                            }}
                        />
                    </div>
                    <DataGrid
                        columns={columns}
                        rows={property}
                        height={dataGridHeight}
                        loading={false}
                        onRowClick={(event: GridRowParams) => props.onRowClick ? props.onRowClick(event.row as PropertyType) : () => { }}
                        onRowDoubleClick={(event) => {
                            {
                                setModal(<PropertyModal
                                    onClose={onClose}
                                    moduleId={moduleId}
                                    onSuccessfulFormSubmit={() => { handlePropertyTypeModalClose }}
                                    propertyData={event.row} 
                                    />)
                            }
                           
                        }
                        }
                        columnVisibilityModel={columnVisibilityModel}
                    />
                </div>
            </div>
            {modal}
        </>
    )
}
