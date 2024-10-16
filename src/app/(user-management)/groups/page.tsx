"use client";

import { ProfileService } from "@/services/Profile";
import { ReactNode, useEffect, useState } from "react";
import GroupDataTable from "./(components)/GroupDataTable";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from "@/app/(components)/_NextComponents/PageHeader/PageHeader";
import { Button } from "@/app/(components)/_IMSComponentLibary/components";
import GroupBaseForm from "./(components)/GroupBaseForm";
import { GridRowParams } from "@ims/component-library";
import { GroupMemberType, ProfileMemberType } from "@/models/Enums/Enums";
import GroupMembersForm from "./(components)/GroupMembersForm";
import { Group, GroupForCreate, GroupForUpdate } from "@/models/Entities/Group";
import { GroupService } from "@/services/Group";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

type Operation = "update" | "create";
export interface SubmitGroupType {
    data?: Group | GroupForUpdate;
    operation?: Operation;
}

export default function Groups() {

    const [allGroups, setAllGroups] = useState<Group[]>([]);
    const [modal, setModal] = useState<ReactNode>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { showToastAlert }    = useToast();

    const getAllGroups = async () => {
        setLoading(true);
        try {
            const data = await GroupService.getAllGroups();
            setAllGroups(data || []);
            setLoading(false);

        } catch (_) {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        getAllGroups();
    }, []);

    const onClose = (updatedGroup: Group) => {
        setModal(null);
        
        if (!updatedGroup) return; 

        const groupIndex = allGroups.findIndex(group => group.id === updatedGroup.id);
        if (groupIndex !== -1) {
            const updatedGroups = [...allGroups];
            updatedGroups[groupIndex] = {
                ...updatedGroups[groupIndex],
                gMemberUIs: updatedGroup.gMemberUIs
            };
            setAllGroups(updatedGroups);
        } 
    }
    const openMembersForm = (group: Group) => {
        setModal(<GroupMembersForm groupData={group} onClose={onClose} onSuccessfulSave={getAllGroups}/>)
    }
   
    const handleProfileModalClose = (data: SubmitGroupType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setAllGroups([...allGroups, data?.data as Group])
                break;
            case "update":
                // console.log("data:->:->" , data);
                // const updatedList = allGroups.map(item =>
                //     item.id === (data?.data as GroupForUpdate)?.id ? data?.data as GroupForUpdate : item
                // );
                getAllGroups();
                // setAllGroups(updatedList as Group[]);
                break;
        }
    }
    const deleteProfile = async (groupId: string) => {
        setLoading(true);
        try {
            await GroupService.deleteGroup({ id: groupId });
            showToastAlert(messages.deleteGroupSuccess.severity , messages.deleteGroupSuccess.content , messages.deleteGroupSuccess.title);
            // setAllGroups(prevItems => prevItems?.filter(x => x.id !== groupId));
            getAllGroups();
            setLoading(false);
        } catch (_) {
            showToastAlert(messages.deleteGroupError.severity , messages.deleteGroupError.content , messages.deleteGroupError.title);
            setLoading(false);
        }
    }


    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="Groups" />
                        <Button
                            label="Create group"
                            color="primary"
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<GroupBaseForm onClose={onClose} onSuccessfulFormSubmit={handleProfileModalClose} />)
                            }}
                        />
                    </div>
                    <GroupDataTable
                        deleteGroup={deleteProfile}
                        loading={loading}
                        onRowDoubleClick={(event: GridRowParams) => setModal(<GroupBaseForm onSuccessfulFormSubmit={handleProfileModalClose} onClose={onClose} groupData={event.row} />)}
                        groups={allGroups}
                        openMembersForm={openMembersForm}
                    />
                </div>
            </div>
            {
                modal
            }
        </>
    )
}
