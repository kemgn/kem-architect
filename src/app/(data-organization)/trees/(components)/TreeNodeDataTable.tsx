import React from 'react'
import { DataGridTree, GridColDef, GridRenderCellParams } from '@ims/component-library';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from './tree.module.css';
import { TreeNodeFields, TreeNodeHeaders } from '../TreeNodeCols';
import { TreeNode } from '@/models/Entities/Tree';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const groupingKey = 'Hierarchy';

interface TreeNodeDataTableProps {
    rows?: TreeNode[];
    loading?: boolean;
    onRowDoubleClick: Function;
    onRowClick?: Function;
    handleAddNodeClick?: Function;
    handleDeleteClick?: Function;
}

export default function TreeNodeDataTable(props: TreeNodeDataTableProps) {

    const columns: GridColDef[] = [
        {
            field: TreeNodeFields.AddNode,
            headerName: TreeNodeHeaders.AddNode,
            renderCell: (params: GridRenderCellParams) => {
                return (<AddCircleOutlineOutlinedIcon onClick={(event) => {
                    event.stopPropagation(); event.preventDefault(); props.handleAddNodeClick &&
                        props.handleAddNodeClick(params.row as TreeNode)
                }} />)
            },
            flex: 1
        },
        {
            field: TreeNodeFields.systemName,
            headerName: TreeNodeHeaders.systemName,
            width: 150,
            flex: 1,
        },
        {
            field: TreeNodeFields.weight,
            headerName: TreeNodeHeaders.weight,
            width: 150,
            flex: 1
        },
        {
            field: TreeNodeFields.Actions,
            headerName: TreeNodeHeaders.Actions,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <>
                        <DeleteRoundedIcon sx={{ color: "warning.main" }} onClick={(event) => props.handleDeleteClick && props.handleDeleteClick(params.row as TreeNode)} />
                    </>
                )
            }
        }
    ]

    return (
        <>
            <DataGridTree
                rowKey={groupingKey}
                columns={columns}
                rows={props.rows || []}
                className={styles.dataGrid}
                height='350px'
                loading={props.loading}
                onRowDoubleClick={(event) => props.onRowDoubleClick(event.row as TreeNode)}
            />
        </>
    )
}
