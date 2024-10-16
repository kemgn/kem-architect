import React, { useContext, useState } from "react"
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Button, TabPanel } from "@ims/component-library";
import ViewLeftBar from "./(view-left-bar)/ViewLeftBar";
import BasicSettings from "./(view-members)/BasicSettings";
import ViewProperties from "./(view-members)/ViewProperties";
// import Filters from "./(view-members)/Filters";
import Forms from "./(view-members)/(forms)/Forms";
import styles from "./(view-members)/views.module.css";
import Sorting from "./(view-members)/Sorting";
import AccessControl from "./(view-members)/AccessControl";
import { DataContractsContext } from "@/app/(components)/_Contexts/ViewsDataContext";
import { DataContractService } from "@/services/DataContract";
import { FormsProvider } from "./(view-members)/(forms)/FormsContext";
import { ViewProperty } from "@/models/Entities/DataContract";
import Filters from "./(view-members)/(filters)/Filters";
import Sorts from "./(view-members)/(sorts)/Sorts";
import LoadingOverlay from "@/app/(components)/LoadingOverlay/LoadingOverlay";

export default function ViewPage() {
    const dataContractsContext = useContext(DataContractsContext);
    if (!dataContractsContext) {
        throw new Error("useDataContracts must be used within a DataContractsProvider");
    }
    const { viewDataContracts: dataContracts, setViewDataContracts: setDataContracts, selectedView: selectedRow, setSelectedRow, moduleId, dataContractsLoading } = dataContractsContext;

    return (
        <>
            <div className={globalStyles.container}>
                <div className={globalStyles.headerButtonGroup}>
                    {/* <Button
                        label="Save"
                        color="primary"
                        className={`${globalStyles.createButton} ${styles.saveButton}`}
                        disabled={!selectedRow}
                        onClick={async () => {
                            if (dataContracts) {
                                await DataContractService.updateManyDataContract(dataContracts.map(contract => {
                                    const viewProperties = [];
                                    const formProperties = [];

                                    //contract.dataContractRefId olsa gerek. bug olabilir. şimdilik kullanılmıyor burası.
                                    const initialContractsProperties = initialDataContractState
                                        .find(dcPropObj => dcPropObj.dataContractId === contract.id);

                                    const modifiedDCProperties = initialContractsProperties
                                        ?.dataContractProperties
                                        .map(dcProp => {
                                            if ((dcProp as ViewProperty).summaryFunction) {
                                                viewProperties.push(dcProp);
                                            } else {
                                                formProperties.push(dcProp);
                                            }
                                        });
                                    //viewdir
                                    if (!contract.parentDataContractId) {
                                        if (contract.dataContractUIProperties) {
                                            const propIdArray = initialContractsProperties?.dataContractProperties.map(z => (z as ViewProperty).propertyId);
                                            contract.dataContractUIProperties.added = contract?.dataContractUIProperties?.added?.filter(x => !propIdArray?.includes((x as ViewProperty).propertyId));
                                        }
                                    }

                                    // contract?.dataContractUIProperties?.added?.forEach(addedProperty => {

                                    // });
                                    // contract?.dataContractUIProperties?.deleted?.forEach(deletedProperty => {

                                    // });
                                    return contract;
                                }));
                                const var_ = await DataContractService.getAllDataContracts(moduleId);
                                setDataContracts(var_.map(x=> {
                                    initialDataContractState.push({
                                        dataContractId: x.dataContractReferenceId,
                                        dataContractProperties: x.dataContractUIProperties,
                                    })
                                    return {
                                        ...x,
                                        dataContractUIProperties: undefined
                                    }
                                }));
                            }
                        }}
                    /> */}
                </div>
                <div className="flex">
                    <ViewLeftBar />
                    {
                        selectedRow && (
                            <div className={styles.contentContainer}>
                                <TabPanel
                                    containerClassName={styles.tabContainer}
                                    tabs={[
                                        { label: "Basic settings", renders: <BasicSettings /> },
                                        { label: "View properties", renders: <ViewProperties /> },
                                        { label: "Forms", renders: <FormsProvider><Forms /></FormsProvider> },
                                        { label: "Filters", renders: <Filters /> },
                                        { label: "Sorting", renders: <Sorts /> },
                                        { label: "Access control", renders: <AccessControl /> },
                                    ]}
                                />
                            </div>
                        )
                    }
                </div>
                <LoadingOverlay open={dataContractsLoading}/>
            </div>
        </>
    )
}
