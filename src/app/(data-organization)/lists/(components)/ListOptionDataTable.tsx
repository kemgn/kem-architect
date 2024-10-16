import React, { useState, useEffect, useContext } from 'react'
import { GridColDef, GridRenderCellParams, GridRowOrderChangeParams } from '@ims/component-library';
import { DataGrid } from '@/app/(components)/_IMSComponentLibary/components';
import styles from './list.module.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { updateListOption } from "../actions";
import { LanguagesContext } from '@/app/(components)/_Contexts/LanguagesContext';
interface ListOptionDataTableProps {
    clickedListRoot?: ListRoot;
    loading?: boolean;
    onRowDoubleClick: Function;
    deleteListOption?: Function;
}

export default function ListOptionDataTable(props: ListOptionDataTableProps) {
    const [rows, setRows] = useState(props.clickedListRoot?.listOptions || []);
    const [columnVisibilityModel] = useState({
        id: false,
        isCustomizable: false,
        isSystem: false,
        isLabelCustomizable: false,
        createTime: false,
        updateTime: false,
        listRootId: false,
        colorcode: false,
        lightColorcode: false,
        chartColorCode: false,
        darkColorcode: false,
        fontColor: false,
        iconPath: false,
        rowIndex: false,
        listOptionRefId: false,
    });
    useEffect(() => {
        setRows(props.clickedListRoot?.listOptions || []);
    }, [props.clickedListRoot]);

    //const labelFieldsPrefix = "listOptionLabel";
    //const languages = useContext(LanguagesContext);

    const handleRowOrderChange = async (params: GridRowOrderChangeParams) => {
        const updatedRows = [...rows];
        const movedRow = updatedRows.splice(params.oldIndex, 1)[0];
        updatedRows.splice(params.targetIndex, 0, movedRow);
        setRows(updatedRows);
        //  console.log("updatedRows",updatedRows);
        //   updatedRows.map(async (row)=>{
        //    await updateListOption(row,labelFieldsPrefix,languages)
        //   })
    }

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            minWidth: 100,
            maxWidth: 100,
        },
        {
            field: "systemName",
            headerName: "System name",
            flex: 1,
            minWidth: 100,
        },
        {
            field: "weight",
            headerName: "Weight",
            flex: 1,
            minWidth: 100,
        },
        // {
        //     field: "maxThreshold",
        //     headerName: "Max threshold",
        //     minWidth: 100,
        //     maxWidth: 100,
        // },
        // {
        //     field: "minThreshold",
        //     headerName: "Min threshold",
        //     minWidth: 200,
        //     maxWidth: 200,
        // },
        {
            field: "isCustomizable",
            headerName: "Is Customizable",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "isSystem",
            headerName: "Is System",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "isLabelCustomizable",
            headerName: "is Label Customizable",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "createTime",
            headerName: "Create Time",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "updateTime",
            headerName: "Update Time",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "listRootId",
            headerName: "List Root Id",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "colorcode",
            headerName: "Color Code",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "lightColorcode",
            headerName: "Light Color Code",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "chartColorCode",
            headerName: "Chart Color Code",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "darkColorcode",
            headerName: "Dark Color Code",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "fontColor",
            headerName: "Font Color Code",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "iconPath",
            headerName: "Icon Path",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "Row Index",
            headerName: "Row Index",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "listOptionRefId",
            headerName: "List Option RefId",
            minWidth: 200,
            maxWidth: 200,
        },
        {
            field: "",
            headerName: "Actions",
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <div className={globalStyles.tableActionCell}>
                        <DeleteOutlineOutlinedIcon sx={{ color: "warning.main" }} onClick={() => props.deleteListOption ? props.deleteListOption(params.row.id) : () => { }} className={globalStyles.iconHighlight}/>
                    </div>
                )
            }
        }
    ]

    return (
        <>
            <DataGrid
                // rowReordering
                handleRowOrderChange={handleRowOrderChange}
                columns={columns}
                rows={rows}
                height='35vh'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick(event)}
                columnVisibilityModel={columnVisibilityModel}
            />
        </>
    )
}
