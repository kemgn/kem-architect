/* eslint-disable react-hooks/exhaustive-deps */
import { PropertyForTreeForUpdate } from '@/models/Entities/Property';
import { TreeNode, TreeRoot } from '@/models/Entities/Tree';
import { ListService } from '@/services/List';
import { TreeService } from '@/services/Tree';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface TreeNodeSelectProps {
    treeRootId: string;
    name?: string;
    defaultValue?: string;
    label?: string;
}

export default function TreeNodeSelect(props: TreeNodeSelectProps) {
    const [treeNodes, setTreeNodes] = useState<TreeNode[]>([]);

    useEffect(() => {
        const getOptions = async () => {
            try {
                debugger;
                if(!props.treeRootId) {
                    return;
                }
                
                const response = await TreeService.getTreeRoot(props.treeRootId);
                setTreeNodes(response?.nodeUIs || []);
            } catch (error) {
                console.log(error + "error fetching tree nodes");
            }
        }
        getOptions();
    }, [props.treeRootId])
    return (
        <>
            <Select
                label={props.label || "Tree nodes"}
                values={treeNodes.map(root => ({ value: root.id, label: root.systemName }))}
                name={props.name}
                defaultValue={props.defaultValue} />
        </>
    )
}
