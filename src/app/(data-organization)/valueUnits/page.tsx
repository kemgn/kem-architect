"use client"
import { Button, GridRowParams } from '@ims/component-library';
import React, { ReactNode, useEffect, useState } from 'react'
import styles from './(components)/valueUnit.module.css'
import ValueUnitTypeDataTable from './(components)/ValueUnitTypeDataTable';
import ValueUnitsDataTable from './(components)/ValueUnitsDataTable';
import { ValueUnitTypeModal } from './(components)/ValueUnitTypeModal';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import { ValueUnitService } from '@/services/ValueUnit';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ValueUnitModal } from './(components)/ValueUnitModal';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';

type Operation = "update" | "create";
export interface SubmitValueUnitTypeType {
    data?: ValueUnitTypeForCreate | ValueUnitTypeForUpdate;
    operation?: Operation;
}
export interface SubmitValueUnitType {
    data?: ValueUnitForCreate | ValueUnitForUpdate;
    operation?: Operation;
}




export default function Page() {
    const [modal, setModal] = useState<ReactNode>();
    const [valueUnitTypes, setValueUnitTypes] = useState<ValueUnitType[]>([]);
    const [loadingValueUnitType, setLoadingValueUnitType] = useState<boolean>(false);
    const [loadingValueUnits, setLoadingValueUnits] = useState<boolean>(false);
    const [clickedValueUnitType, setClickedValueUnitType] = useState<ValueUnitType>();

    const { showToastAlert } = useToast();

    const onClose = () => {
        setModal(null);
    }
    useEffect(() => {
        getAllValueUnitTypes();
    }, []);

    const getAllValueUnitTypes = async () => {
        setLoadingValueUnitType(true);
        try {
            const data = await ValueUnitService.getValueUnitTypes();
            setValueUnitTypes(data || []);
            setLoadingValueUnitType(false);
        } catch (_) {
            
        }
    }

    const deleteValueUnitType = async (valueUnitTypeId: string) => {
        setLoadingValueUnitType(true);
        try {
            await ValueUnitService.deleteValueUnitType({ id: valueUnitTypeId });
            showToastAlert(messages.deleteValueUnitTypeSuccess.severity , messages.deleteValueUnitTypeSuccess.content , messages.deleteValueUnitTypeSuccess.title);
            setValueUnitTypes(prevItems => prevItems?.filter(x => x.id !== valueUnitTypeId));
            debugger
            if (clickedValueUnitType?.id === valueUnitTypeId) {
                setClickedValueUnitType(undefined);
            }
            setLoadingValueUnitType(false);
        } catch (_) {
            showToastAlert(messages.deleteValueUnitTypeError.severity , messages.deleteValueUnitTypeError.content , messages.deleteValueUnitTypeError.title);
            setLoadingValueUnitType(false);
        }
    }

    const deleteValueUnit = async (valueUnitId: string) => {
        setLoadingValueUnits(true);
        try {
            await ValueUnitService.deleteValueUnit({ id: valueUnitId });
            setValueUnitTypes(prevItems =>
                prevItems?.map(valueUnitType => {
                    if (valueUnitType.id === valueUnitId.split(":")[0]) {
                        const valueUnitType_ = {
                            ...valueUnitType,
                            valueUnits: valueUnitType.valueUnits?.filter(valueUnit => valueUnit.id !== valueUnitId)
                        }
                        setClickedValueUnitType(valueUnitType_);
                        return valueUnitType_;
                    } else {
                        return valueUnitType;
                    }
                }));
            showToastAlert(messages.deleteValueUnitSuccess.severity , messages.deleteValueUnitSuccess.content , messages.deleteValueUnitSuccess.title);
            setLoadingValueUnits(false);
        } catch (_) {
            setLoadingValueUnits(false);
        }
    }



    const handleValueUnitTypeModalClose = (data: SubmitValueUnitType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setValueUnitTypes([...valueUnitTypes, data.data as ValueUnitType])
                break;
            case "update":
                const updatedValueUnitType = valueUnitTypes.map(item =>
                    item.id === (data.data as ValueUnitTypeForUpdate).id ? data?.data as ValueUnitTypeForUpdate : item
                );
                setValueUnitTypes(updatedValueUnitType as ValueUnitType[]);
                break;
            default:
                break;
        }
    }

    const handleValueUnitModalClose = (data: SubmitValueUnitType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setValueUnitTypes(prevState =>
                    prevState.map(valueUnitType => {
                        if (valueUnitType.id === (data.data as ValueUnit).id.split(":")[0]) {
                            const valueUnitType_ = { ...valueUnitType, valueUnits: [...(valueUnitType.valueUnits || []), data.data as ValueUnit] }
                            setClickedValueUnitType(valueUnitType_);
                            return valueUnitType_;
                        }
                        else {
                            return valueUnitType;
                        }
                    }
                    )
                );
                break;
            case "update":
                setValueUnitTypes(prevState =>
                    prevState.map(valueUnitType => {
                        if (valueUnitType.id === (data.data as ValueUnitForUpdate).id.split(":")[0]) {
                            const valueUnitType_ = {
                                ...valueUnitType,
                                valueUnits: valueUnitType.valueUnits?.map(valueUnit => {
                                    if (valueUnit.id === (data.data as ValueUnitForUpdate).id) {
                                        return data.data as ValueUnit;
                                    } else {
                                        return valueUnit;
                                    }
                                }
                                )
                            }
                            setClickedValueUnitType(valueUnitType_);
                            return valueUnitType_;
                        } else {
                            return valueUnitType;
                        }
                    }
                    )
                );
                break;
            default:
                break;
        }
    }



    return (
        <>
            <div className={styles.container} >
                <div className={styles.tableHeaderContainer}>
                    <div className={styles.headerButtonGroup}>
                        <PageHeader pageTitle="Value Unit Type" />
                        <Button
                            label="Create value unit type"
                            color="primary"
                            className={styles.createButton}
                            onClick={() => {
                                setModal(<ValueUnitTypeModal onClose={onClose} onSuccessfulFormSubmit={handleValueUnitTypeModalClose} />)
                            }}
                            loading={loadingValueUnitType}
                        />
                    </div>
                    <ValueUnitTypeDataTable
                        onRowClick={(valueUnitType: ValueUnitType) => {
                            setLoadingValueUnits(true);
                            setClickedValueUnitType(valueUnitType);
                            setLoadingValueUnits(false);
                        }}
                        onRowDoubleClick={(event: GridRowParams) => setModal(<ValueUnitTypeModal onSuccessfulFormSubmit={handleValueUnitTypeModalClose} onClose={onClose} valueUnitTypeData={event.row} loadingValueUnitType={loadingValueUnitType}/>)}
                        ValueUnitType={valueUnitTypes}
                        deleteValueUnitType={deleteValueUnitType}
                        loading={loadingValueUnitType}
                    />
                </div>
            </div>
            <div className={styles.tableHeaderContainer}>
                <div className={globalStyles.headerButtonGroup}>
                    <PageHeader pageTitle="Value unit" />
                    <Button
                        label="Create value unit"
                        color="primary"
                        className={styles.createButton}
                        disabled={!clickedValueUnitType}
                        onClick={() => setModal(<ValueUnitModal onSuccessfulFormSubmit={handleValueUnitModalClose} valueUnitTypeId={clickedValueUnitType?.id} onClose={onClose} />)}
                        loading={loadingValueUnits}
                    />
                </div>
                <ValueUnitsDataTable
                    clickedValueUnitType={clickedValueUnitType}
                    loading={loadingValueUnits}
                    deleteValueUnit={deleteValueUnit}
                    onRowDoubleClick={(event: GridRowParams) => setModal(<ValueUnitModal onSuccessfulFormSubmit={handleValueUnitModalClose} onClose={onClose} valueUnitData={event.row} />)}
                />
            </div>

            {
                modal
            }
        </>
    )
}
