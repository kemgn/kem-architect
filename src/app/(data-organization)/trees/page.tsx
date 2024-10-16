"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import TreeRootDataTable from './(components)/TreeRootDataTable';
import TreeNodeDataTable from './(components)/TreeNodeDataTable';
import { Button } from "@/app/(components)/_IMSComponentLibary/components";
import { GridRowParams, GridValidRowModel } from '@ims/component-library';
import { TreeRootModal } from './(components)/TreeRootModal';
import styles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { TreeService } from '@/services/Tree';
import { TreeNode, TreeRoot } from '@/models/Entities/Tree';
import { IForDelete, deleteResponse } from '@/models/Entities/Service';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { TreeNodeModal } from './(components)/TreeNodeModal';
import { useToast } from '@/ToastAlertProvider';
import { alertSeverity } from '@/models/Enums/Enums';
import { messages } from '@/AlertMessages';


export default function TreesPage() {

    const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);
    const [treeRoots, setTreeRoots] = useState<TreeRoot[]>([]);
    const [loadingTreeNodes, setLoadingTreeNodes] = useState<boolean>();
    const [modal, setModal] = useState<ReactNode>();
    const [parentId, setParentId] = useState<string>("");
    const [processFinished, setProcessFinished] = useState<boolean>(false);
    const [loadingTreeRoots, setLoadingTreeRoots] = useState<boolean>(true);

    const { showToastAlert } = useToast();

    useEffect(() => {
        transition();
    }, [modal])

    const transition = () => {
        getAllTreeRoots();
        if (!!parentId && processFinished) {
            const rootnode = treeRoots.find(n => n.id === parentId);
            if (rootnode) {
                arrangeNodes(rootnode);
                setProcessFinished(false);
            }
        }
        setLoadingTreeRoots(false);
    }

    function arrangeNodes(rootNode: TreeNode | TreeRoot) {
        try {
            setLoadingTreeNodes(true);
            let treeNodesTmp: TreeNode[] = [];
            const nodesTmp = modifyTreeNodes(rootNode?.nodeUIs);
            treeNodesTmp = flattenNodes(nodesTmp);
            setTreeNodes(treeNodesTmp);
            setLoadingTreeNodes(false);
        } catch (error) {
            setLoadingTreeNodes(false);

        }

    }

    const getAllTreeRoots = async () => {
        try {
            const data = await TreeService.getTreeRoots();
            console.log("fetched data:->", data);
            setTreeRoots(data);
        }
        catch (error) {
        }
    }

    const onClose = () => {
        setModal(null);
    }

    const modifyTreeNodes = (treeNodes?: TreeNode[], hierarchy: Array<string> = []) => {
        return treeNodes?.map(treeNode => {
            const newHierarchy = [...hierarchy, treeNode.systemName];
            treeNode.Hierarchy = newHierarchy;

            modifyTreeNodes(treeNode.nodeUIs, newHierarchy);

            return treeNode;
        });
    }

    const flattenNodes = (nodes: TreeNode[] | undefined) => {
        let result: TreeNode[] = []; // Burada nodes'umuz TreeNode arrayi ancak arrayde her zaman tıkladığımız eleman yani tek bir eleman bulunur
        if (!!nodes) {
            nodes.forEach((node) => {
                result.push({
                    Hierarchy: node?.Hierarchy,
                    createTime: node?.createTime,
                    id: node?.id!,
                    isCustomizable: node?.isCustomizable!,
                    isLabelCustomizable: node?.isLabelCustomizable!,
                    isSystem: node?.isSystem!,
                    labels: node?.labels,
                    nodeReferenceId: node?.nodeReferenceId!,
                    systemName: node?.systemName!,
                    updateTime: node?.updateTime,
                    weight: node?.weight,
                    nodeUIs: node?.nodeUIs
                })

                if (node?.nodeUIs && node.nodeUIs.length > 0) {
                    result = result.concat(flattenNodes(node.nodeUIs));
                }
            })
        }
        return result;
    }

    const handleRowClick = (rowData: TreeRoot) => {
        if (!rowData) {
            return;
        }
        console.log("rowData.id", rowData.id);
        setParentId(rowData.id);
        arrangeNodes(rowData);

    }

    const handleNodeRowDoubleClick = (rowData: TreeNode) => {
        setModal(<TreeNodeModal modal={modal} setModal={setModal} nodes={treeNodes} setNodes={setTreeNodes} setTreeRoots={setTreeRoots}
            setProcessFinished={setProcessFinished} systemName={rowData.systemName} IsCustomizable={rowData.isCustomizable}
            isSystem={rowData.isSystem} isLabelCustomizable={rowData.isLabelCustomizable} labels={rowData.labels} id={rowData.id}
            weight={rowData.weight} />)
    }

    const handleRowDoubleClick = (rowData: TreeRoot) => {
        console.log('rowData', rowData);
        setModal(<TreeRootModal modal={modal} setModal={setModal} treeRoots={treeRoots} setTreeRoots={setTreeRoots} IsCustomizable={rowData.isCustomizable}
            description={rowData.description} isExtendable={rowData.isExtendable} isLabelCustomizable={rowData.isLabelCustomizable} isSystem={rowData.isSystem}
            labels={rowData.labels} systemName={rowData.systemName} id={rowData.id} />)
    }

    const deleteTreeRoot = async (treeRoot: string) => {
        try {
            setLoadingTreeRoots(true);
            const deleteTree: IForDelete = {
                id: treeRoot
            }
            const response = await TreeService.deleteTreeRoot(deleteTree);
            console.log(response, "response");
            showToastAlert(alertSeverity.success, messages.deleteTreeRootSuccess.content, messages.deleteTreeRootSuccess.title);
            setLoadingTreeRoots(false);
            await getAllTreeRoots();
        } catch (error) {
            showToastAlert(alertSeverity.error, messages.deleteTreeRootError.content, messages.deleteTreeRootError.title);

        }
    }

    const handleAddNodeClick = (rowData: TreeNode) => {
        console.log("rowData ", rowData);
        setModal(<TreeNodeModal modal={modal} setModal={setModal} nodes={treeNodes} setNodes={setTreeNodes} rootId={rowData.id}
            setTreeRoots={setTreeRoots} setProcessFinished={setProcessFinished} />)
    }

    const handleDeleteClick = async (rowData: TreeNode) => {
        try {
            setLoadingTreeNodes(true);
            const deleteNode: IForDelete = {
                id: rowData.id
            }
            const response = await TreeService.deleteNode(deleteNode);
            const data = await TreeService.getTreeRoots();
            const treeRoot = data.find(d => d.id === parentId);
            if (treeRoot)
                handleRowClick(treeRoot);
            setLoadingTreeNodes(false);
        } catch (error) {
            setLoadingTreeNodes(false);

        }
    }

    return (
        <>
            <div className={globalStyles.container} >
                <div className={styles.tableHeaderContainer}>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="Tree roots" />
                        <Button
                            label="Create tree root"
                            color="primary"
                            className={styles.createButton}
                            onClick={() => {
                                console.log("Create Tree Root Clicked");
                                setModal(<TreeRootModal modal={modal} setModal={setModal} setTreeRoots={setTreeRoots} treeRoots={treeRoots} />)
                            }}
                        />
                    </div>
                    <TreeRootDataTable
                        loading={loadingTreeRoots}
                        onRowClick={handleRowClick}
                        onRowDoubleClick={handleRowDoubleClick}
                        // onRowDoubleClick={(event: GridRowParams) => setModal(<TreeRootModal onClose={onClose} rootData={event}/>)}
                        rows={treeRoots}
                        deleteTreeRoot={deleteTreeRoot}
                    />
                </div>
            </div>
            <div className={styles.tableHeaderContainer}>
                <div className={globalStyles.headerButtonGroup}>
                    <PageHeader pageTitle="Tree nodes" />
                    <Button
                        label="Create tree node"
                        color="primary"
                        disabled={!parentId}
                        className={styles.createButton}
                        onClick={() => setModal(<TreeNodeModal modal={modal} setModal={setModal} setNodes={setTreeNodes} nodes={treeNodes}
                            rootId={parentId} setTreeRoots={setTreeRoots} setProcessFinished={setProcessFinished} />)}
                    />
                </div>
                <TreeNodeDataTable
                    rows={treeNodes}
                    loading={loadingTreeNodes}
                    onRowDoubleClick={handleNodeRowDoubleClick}
                    handleAddNodeClick={handleAddNodeClick}
                    handleDeleteClick={handleDeleteClick}
                />
            </div>
            {modal}
        </>
    )
}
