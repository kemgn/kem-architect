import { PropertyForTreeForUpdate } from '@/models/Entities/Property';
import { TreeRoot } from '@/models/Entities/Tree';
import { TreeService } from '@/services/Tree';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface TreeRootSelectProps {
    name?: string;
    defaultValue?: string;
}

export default function TreeRootSelect(props: TreeRootSelectProps) {
        const [treeRoot, setTreeRoot] = useState<TreeRoot[]>([]);

        useEffect(() => {
            const getAllTreeRoots = async () => {
                try {
                    const response = await TreeService.getTreeRoots();
                    setTreeRoot(response || []);
                } catch (error) {
                    console.log(error + "error fetching Tree roots");
                }
            }
            getAllTreeRoots();
        }, [])
        return (
            <>
                <Select 
                    label="Tree root" 
                    values={treeRoot.map(root => ({ value: root.id, label: root.systemName }))} 
                    name={props.name}
                    defaultValue={props.defaultValue}/>
            </>
        )
}
