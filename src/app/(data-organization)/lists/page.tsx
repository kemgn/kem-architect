"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import ListRootDataTable from './(components)/ListRootDataTable';
import ListOptionDataTable from './(components)/ListOptionDataTable';
import styles from '../lists/(components)/list.module.css';
import { Button } from "@/app/(components)/_IMSComponentLibary/components";
import { GridRowParams } from '@ims/component-library';
import { ListRootModal } from './(components)/ListRootModal';
import { ListOptionModal } from './(components)/ListOptionModal';
import { ListService } from '@/services/List';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ListRoot, ListRootForUpdate, ListOptionForCreate, ListOptionForUpdate, ListOption } from '@/models/Entities/List';

type Operation = "update" | "create";
export interface SubmitListRootType {
    data?: ListRoot | ListRootForUpdate;
    operation?: Operation;
}
export interface SubmitListOptionType {
    data?: ListOptionForCreate | ListOptionForUpdate;
    operation?: Operation;
}

export default function ListsPage() {

    const [listRoots, setListRoots] = useState<ListRoot[]>([]);
    const [loadingListRoots, setLoadingListRoots] = useState<boolean>(true);

    const [clickedListRoot, setClickedListRoot] = useState<ListRoot>();
    const [loadingListOptions, setLoadingListOptions] = useState<boolean>(false);
    const [proccessSuccess , setProcessSuccess] = useState<boolean>(true);
    const [modal, setModal] = useState<ReactNode>();

    useEffect(() => {
        if(!!proccessSuccess){
            console.log("GETTİNGALLLİST");
            setProcessSuccess(false);
            getAllListRoots();
        }
    }, [modal]);

    const getAllListRoots = async () => {
        try {
            const response = await ListService.getListRoots();
            setListRoots(response.data || []);
            setLoadingListRoots(false);
        } catch (error) {
            // await new Promise((res) => setTimeout(res, 1000));
            console.log(error + "error fetching list roots");
            setLoadingListRoots(false);
        }
    }
    const deleteListRoot = async (listRootId: string) => {
        setLoadingListRoots(true);
        try {
            await ListService.deleteListRoot({ id: listRootId });
            setListRoots(prevItems => prevItems?.filter(x => x.id !== listRootId));
            if (clickedListRoot?.id === listRootId) {
                setClickedListRoot(undefined);
            }
            setLoadingListRoots(false);
        } catch (_) {
            setLoadingListRoots(false);
        }
    }


    const handleListOptionModalClose = (data: SubmitListOptionType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setListRoots(prevState =>
                    prevState.map(listRoot => {
                        if (listRoot.id === (data.data as ListOption).id.split(":")[0]) {
                            const listRoot_ = { ...listRoot, listOptions: [...(listRoot.listOptions || []), data.data as ListOption] }
                            setClickedListRoot(listRoot_);
                            return listRoot_;
                        }
                        else {
                            return listRoot;
                        }
                    }
                    )
                );
                break;
            case "update":
                setListRoots(prevState =>
                    prevState.map(listRoot => {
                        if (listRoot.id === (data.data as ListOptionForUpdate).id.split(":")[0]) {
                            const listRoot_ = {
                                ...listRoot,
                                listOptions: listRoot.listOptions?.map(option => {
                                    if (option.id === (data.data as ListOptionForUpdate).id) {
                                        return data.data as ListOption;
                                    } else {
                                        return option;
                                    }
                                }
                                )
                            }
                            setClickedListRoot(listRoot_);
                            return listRoot_;
                        } else {
                            return listRoot
                        }
                    }
                    )
                );
                break;
            default:
                break;
        }
        // setListOptionFormSubmitData(data);
    }
    const deleteListOption = async (listOptionId: string) => {
        setLoadingListOptions(true);
        try {
            await ListService.deleteListOption({ id: listOptionId });
            setListRoots(prevItems =>
                prevItems?.map(listRoot => {
                    if (listRoot.id === listOptionId.split(":")[0]) {
                        const listRoot_ = {
                            ...listRoot,
                            listOptions: listRoot.listOptions?.filter(listOption => listOption.id !== listOptionId)
                        }
                        setClickedListRoot(listRoot_);
                        return listRoot_;
                    } else {
                        return listRoot;
                    }
                }));
            setLoadingListOptions(false);
        } catch (_) {
            setLoadingListOptions(false);
        }
    }

    const onClose = () => {
        setModal(null);
    }

    const handleListRootClick = (data: ListRoot) => {
        setLoadingListOptions(true);
        setClickedListRoot(data);
        setLoadingListOptions(false);
    }
    
    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="List roots" />
                        <Button
                            label="Create list root"
                            color="primary"
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<ListRootModal  setModal={setModal} setProcessSuccess={setProcessSuccess}/>)
                            }}
                            loading={loadingListRoots}
                        />
                    </div>
                    <ListRootDataTable
                        onRowClick={(listRoot: ListRoot) => {
                            handleListRootClick(listRoot);
                        }}
                        listRoots={listRoots}
                        deleteListRoot={deleteListRoot}
                        loading={loadingListRoots}
                        onRowDoubleClick={(event: GridRowParams) => setModal(<ListRootModal  listRootData={event.row} setModal={setModal} setProcessSuccess={setProcessSuccess}/>)}
                    />
                </div>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="List options" />
                        <Button
                            label="Create list option"
                            color="primary"
                            className={globalStyles.createButton}
                            disabled={!clickedListRoot}
                            onClick={() => setModal(<ListOptionModal onSuccessfulFormSubmit={handleListOptionModalClose} listRootId={clickedListRoot?.id} onClose={onClose} />)}
                            loading={loadingListOptions}
                        />
                    </div>
                    <ListOptionDataTable
                        clickedListRoot={clickedListRoot}
                        loading={loadingListOptions}
                        deleteListOption={deleteListOption}
                        onRowDoubleClick={(event: GridRowParams) => setModal(<ListOptionModal onSuccessfulFormSubmit={handleListOptionModalClose} onClose={onClose} listOptionData={event.row} />)}
                    />
                </div>
            </div>

            {
                modal
            }

        </>
    )
}