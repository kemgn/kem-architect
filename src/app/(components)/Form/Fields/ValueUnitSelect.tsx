import { PropertyForIntegerForUpdate } from '@/models/Entities/Property';
import { ValueUnitService } from '@/services/ValueUnit';
import { Toggle, Select } from '@ims/component-library';
import React, { useEffect, useState } from 'react'

interface ValueUnitSelectProps {
    name?: string;
    defaultValue?: string;
}


export default function ValueUnitSelect(props: ValueUnitSelectProps) {
    const [valueUnitsData, setValueUnitsData] = useState<ValueUnit[]>([]);
    useEffect(() => {
        const setAllValueUnits = async () => {
            try {
                const data = await ValueUnitService.getValueUnit();
                setValueUnitsData(data);
            } catch (_) {
            }
        }
        setAllValueUnits();
    }, [])
    return (
        <>
            <Select label="Value units" defaultValue={props.defaultValue} values={valueUnitsData?.map(root => ({ value: root.id, label: root.labels?.[0]?.label }))} name={props.name} />
        </>
    )
}
