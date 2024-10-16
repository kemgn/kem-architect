"use client";

import { ProfileService } from "@/services/Profile";
import { ReactNode, useEffect, useState } from "react";
import ProfileDataTable from "./(components)/ProfileDataTable";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from "@/app/(components)/_NextComponents/PageHeader/PageHeader";
import { Button } from "@/app/(components)/_IMSComponentLibary/components";
import ProfileBaseForm from "./(components)/ProfileBaseForm";
import { GridRowParams } from "@ims/component-library";
import { ProfileMemberType } from "@/models/Enums/Enums";
import ProfileMembersForm from "./(components)/ProfileMembersForm";
import { ProfileForCreate, ProfileForUpdate, Profile } from "@/models/Entities/Profile";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

type Operation = "update" | "create";
export interface SubmitProfileType {
    data?: ProfileForCreate | Profile;
    operation?: Operation;
}

export default function Profiles() {

    const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
    const [modal, setModal] = useState<ReactNode>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { showToastAlert } = useToast();

    useEffect(() => {
        getAllProfiles();
    }, []);

    const onClose = () => {
        setModal(null);
    }
    
    const openMembersForm = (profile: Profile) => {
        //getAllProfiles çağrısı kötü kod. düzeltilecek.
        setModal(<ProfileMembersForm profileData={profile} onClose={onClose} onSuccessfulSave={getAllProfiles}/>)
    }
    const getAllProfiles = async () => {
        setLoading(true);
        try {
            const data = await ProfileService.getAllProfiles();
            setAllProfiles(data || []);
            setLoading(false);

        } catch (_) {
            setLoading(false)
        }
    }
    const handleProfileModalClose = (data: SubmitProfileType) => {
        if (!data?.operation) {
            return;
        }
        switch (data?.operation) {
            case "create":
                setAllProfiles([...allProfiles, data?.data as Profile])
                break;
            case "update":
                const updatedList = allProfiles.map(item =>
                    item.id === (data?.data as ProfileForUpdate).id ? data?.data as ProfileForUpdate : item
                );
                setAllProfiles(updatedList as Profile[]);
                break;
        }
    }
    const deleteProfile = async (profileId: string) => {
        setLoading(true);
        try {
            await ProfileService.deleteProfile({ id: profileId });
            showToastAlert(messages.deleteProfileSuccess.severity , messages.deleteProfileSuccess.content , messages.deleteProfileSuccess.title);
            // setAllProfiles(prevItems => prevItems?.filter(x => x.id !== profileId));
            getAllProfiles();
            setLoading(false);
        } catch (_) {
            showToastAlert(messages.deleteProfileError.severity , messages.deleteProfileError.content , messages.deleteProfileError.title);
            setLoading(false);
        }
    }


    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="Profiles" />
                        <Button
                            label="Create profile"
                            color="primary"
                            className={globalStyles.createButton}
                            onClick={() => {
                                setModal(<ProfileBaseForm onClose={onClose} onSuccessfulFormSubmit={handleProfileModalClose} />)
                            }}
                        />
                    </div>
                    <ProfileDataTable
                        deleteProfile={deleteProfile}
                        loading={loading}
                        onRowDoubleClick={(event: GridRowParams) => setModal(<ProfileBaseForm onSuccessfulFormSubmit={handleProfileModalClose} onClose={onClose} profileData={event.row} />)}
                        profiles={allProfiles}
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
