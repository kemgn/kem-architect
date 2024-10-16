/* eslint-disable react-hooks/exhaustive-deps */
import { PropertyForTreeForUpdate } from '@/models/Entities/Property';
import { TreeRoot } from '@/models/Entities/Tree';
import { ListService } from '@/services/List';
import { TreeService } from '@/services/Tree';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface ListOptionSelectProps {
    listRootId: string;
    name?: string;
    defaultValue?: string;
}

export default function ListOptionSelect(props: ListOptionSelectProps) {
        const [listOptions, setListOptions] = useState<ListOption[]>([]);

        useEffect(() => {
            const getOptions = async () => {
                try {
                    const response = await ListService.getListRoot(props.listRootId);
                    setListOptions(response?.data?.listOptions || []);
                } catch (error) {
                    console.log(error + "error fetching list options");
                }
            }
            getOptions();
        }, [])
        return (
            <>
                <Select 
                    label="List options" 
                    values={listOptions.map(root => ({ value: root.listOptionRefId, label: root.systemName }))} 
                    name={props.name}
                    defaultValue={props.defaultValue}
                />
            </>
        )
}
