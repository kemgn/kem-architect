import { Profile } from '@/models/Entities/Profile';
import { ProfileService } from '@/services/Profile';
import { Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'


interface ProfileSelectProps {
    name?: string;
    handleChange?: (value: string) => void;
    label?: string;
    values?: Profile[];
}

export default function ProfileSelect(props: ProfileSelectProps) {

    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        const getProfiles = async () => {
            try {
                const result = await ProfileService.getAllProfiles();
                setProfiles(result);

            } catch (error) {
                throw new Error("Error getting profiles for select");
            }
        }
        getProfiles();
    }, [])
    return (
        <Select
            handleChange={props.handleChange}
            values={props.values || profiles}
            label={props.label || "Select a profile"}
            labelField="systemName"
            valueField="id"
            className="mb-16"
            name={props.name}
        />
    )
}
