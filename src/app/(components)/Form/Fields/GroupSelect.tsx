import { Group } from '@/models/Entities/Group';
import { GroupService } from '@/services/Group';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface GroupSelectProps {
    name?: string;
    handleChange?: (value: string) => void;
    groupId?: string;
}

export default function GroupSelect(props: GroupSelectProps) {

    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const getGroups = async () => {
            try {
                const result = await GroupService.getAllGroups();
                setGroups(result);

            } catch (error) {
                throw new Error("Error getting groups for select");
            }
        }
        getGroups();
    }, [])
    return (
        <Select
            handleChange={props.handleChange}
            values={groups}
            label="Select a group"
            labelField="systemName"
            valueField="groupReferenceId"
            className="mb-16"
            name={props.name}
        />
    )
}
