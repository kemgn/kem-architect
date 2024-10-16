/* eslint-disable react-hooks/exhaustive-deps */
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import { AutoComplete, Button, FormFooter, OptionType, Select } from "@/app/(components)/_IMSComponentLibary/components";
import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { ProfileMemberType, SelectedInputEnum, SubjectSources, SubjectTypes } from "@/models/Enums/Enums";
import { GroupService } from "@/services/Group";
import { Profile, MemberForTable, ProfileForUpdate, ProfileForDisplay } from "@/models/Entities/Profile";
import { Group } from "@/models/Entities/Group";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Subject } from "@/models/Entities/Subject";
import { SubjectService } from "@/services/Subject";
import { Response } from "@/services/Helpers";
import ProfileMembersDataTable from "./ProfileMembersDataTable";
import { ProfileService } from "@/services/Profile";
import { ModulesService } from "@/services/Modules";
import { Property, PropertyType } from "@/models/Entities/Property";
import { getDisplayName, SubjectForAutoComplete } from "../../(profile-group-common)/Helpers";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";
import ProfileSelect from "@/app/(components)/Form/Fields/ProfileSelect";

interface ProfileMembersFormProps {
    profileData: Profile;
    onClose: Function;
    onSuccessfulSave: Function;
}

interface PropertyForAutoControl extends OptionType, Property {
    moduleName: string;
}
export default function ProfileMembersForm(props: ProfileMembersFormProps) {

    const [open, setOpen] = useState(true);
    const [addedMembers, setAddedMembers] = useState<MemberForTable[]>([]);
    const [deletedMembers, setDeletedMembers] = useState<MemberForTable[]>([]);

    const [selectedInput, setSelectedInput] = useState<SelectedInputEnum>(SelectedInputEnum.User);
    const [inputFetchLoading, setInputFetchLoading] = useState<boolean>(false);
    const [formSaveButtonLoading, setFormSaveButtonLoading] = useState<boolean>(false);
    // const [inputValue, setInputValue] = useState<string>("");
    const [memberTableLoading, setMemberTableLoading] = useState<boolean>(false)

    const [existingMembers, setExistingMembers] = useState<MemberForTable[]>([]);

    const [subjectsData, setSubjectsData] = useState<SubjectForAutoComplete[]>([]);
    const [groupsData, setGroupsData] = useState<Group[]>([]);
    const [profilesData, setProfilesData] = useState<Profile[]>([]);
    const [propertiesData, setPropertiesData] = useState<PropertyForAutoControl[]>([]);
    const { showToastAlert } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            switch (selectedInput) {
                case SelectedInputEnum.Group: {
                    try {
                        const result = await GroupService.getAllGroups();
                        setGroupsData(result);

                    } catch (error) {
                        throw new Error("Error getting groups for dropdown");
                    }
                    break;
                }
                case SelectedInputEnum.Profile: {
                    try {
                        const result = await ProfileService.getAllProfiles();
                        setProfilesData(result);

                    } catch (error) {
                        throw new Error("Error getting profiles for dropdown");
                    }
                    break;
                }
                case SelectedInputEnum.Property: {
                    try {
                        await ModulesService.getAllModules().then(result => {
                            let modulesData: PropertyForAutoControl[] = [];
                            modulesData = result?.flatMap(module =>
                                module.properties?.filter(property => property.type === PropertyType.SubjectLink).map(property => {
                                    return { ...property, moduleName: module.systemName };
                                }) ?? []
                            ) ?? [];
                            setPropertiesData(modulesData);
                        });
                    } catch (error) {

                    }


                    break;
                }
            }
        }
        fetchData();
    }, [selectedInput]);

    useEffect(() => {
        if (!props.profileData) {
            return;
        }

        const addMembersToTable = async () => {
            setMemberTableLoading(true);
            try {
                await ProfileService.getProfileMembers(props.profileData.id).then(result => {
                    let membersData: MemberForTable[] = [];
                    if (result.pMemberUIs) {
                        membersData = result.pMemberUIs?.map(member => {
                            let domainName;
                            if (member.domainName) {
                                domainName = member.domainName;
                            } else {
                                switch (member.memberType) {
                                    case ProfileMemberType.Profile:
                                        domainName = "Profiles"
                                        break;
                                    case ProfileMemberType.Group:
                                        domainName = "Local groups"
                                        break;
                                }
                            }
                            const variable: MemberForTable = {
                                displayName: getDisplayName(member.domainName, member.displayName),
                                memberTypeInt: member.memberType,
                                domainName: domainName,
                                id: member.id,
                                referenceId: member.pMemberReferenceId,
                                sourceMemberType: member.memberType === ProfileMemberType.Profile ? SubjectTypes.profile : member.types,
                                sources: member.source,
                                isUser: member.types === SubjectTypes.user
                            }
                            return variable;
                        })
                    }
                    setExistingMembers([...addedMembers, ...membersData]);
                    setAddedMembers([...addedMembers, ...membersData]);
                    setMemberTableLoading(false);
                });
            } catch (_) {
                setMemberTableLoading(false);
            }
        }
        addMembersToTable()
    }, [])

    const onClose = () => {
        props.onClose();
        setOpen(false);
    }
    const handleGroupSelectChange = (value: string) => {

        if (addedMembers.find(x => x.id === value) || props.profileData?.id === value) {
            return;
        }
        setAddedMembers([...addedMembers, {
            id: value,
            memberTypeInt: ProfileMemberType.Group,
            displayName: getDisplayName("Local group", groupsData.find(x => x.id === value)?.systemName || ""),
            domainName: "",
            referenceId: "",
            sourceMemberType: SubjectTypes.iMSGroup,
            sources: SubjectSources.Local,
            isUser: false
        }])
    }

    const handleSubjectInputChange = async (_: React.SyntheticEvent<Element, Event>, query: string) => {
        setInputFetchLoading(true);
        if (!query.trim()) {
            setSubjectsData([]);
            setInputFetchLoading(false);
            return;
        }
        const subjects: Response<Subject[]> = await SubjectService.searchSubjects(query);
        const updatedSubjects = subjects.data.map(subject => {
            if (subject.domainName === "") {
                return { ...subject, domainName: "Local groups" };
            }
            return subject;
        });
        setSubjectsData(updatedSubjects);
        setInputFetchLoading(false);
    }

    const subjectSelected = (_: React.SyntheticEvent<Element, Event>, subject: Subject) => {
        debugger;
        setSubjectsData([]);
        if (!addedMembers.find(x => x.referenceId === subject.id)) {
            setAddedMembers([...addedMembers, {
                id: subject.id,
                memberTypeInt: ProfileMemberType.Subject,
                displayName: getDisplayName(subject.domainName, subject.displayName),
                domainName: subject.domainName,
                referenceId: subject.id,
                // referenceId: subject.subjectReferenceId || subject.id,
                sourceMemberType: subject.type,
                sources: subject.sourceType,
                isUser: subject.type === SubjectTypes.user
            }])
        }
    }

    const handlePropertyInputChange = async (_: React.SyntheticEvent<Element, Event>, query: string) => {
        setInputFetchLoading(true);
        if (!query.trim()) {
            setSubjectsData([]);
            setInputFetchLoading(false);
            return;
        }
        // setInputValue(query);
        const subjects: Response<Subject[]> = await SubjectService.searchSubjects(query);
        setSubjectsData(subjects.data);
        setInputFetchLoading(false);
    }

    const propertySelected = (_: React.SyntheticEvent<Element, Event>, property: Property) => {
        setPropertiesData([]);
        if (!addedMembers.find(x => x.referenceId === property.id)) {
            setAddedMembers([...addedMembers, {
                id: property.id,
                memberTypeInt: ProfileMemberType.Subject,
                displayName: property.systemName,
                domainName: "",
                referenceId: property.id,
                sourceMemberType: SubjectTypes.property,
                sources: SubjectSources.None,
                isUser: false,
            }])
        }
    }
    const profileSelected = (value: string) => {
        if (addedMembers.find(x => x.id === value) || props.profileData?.id === value) {
            return;
        }
        setAddedMembers([...addedMembers, {
            id: value,
            memberTypeInt: ProfileMemberType.Profile,
            displayName: profilesData.find(x => x.id === value)?.systemName || "",
            domainName: "Profile",
            referenceId: "",
            sourceMemberType: SubjectTypes.profile,
            sources: SubjectSources.None,
            isUser: false,
        }])
    }
    const renderInput = () => {
        switch (selectedInput) {
            case SelectedInputEnum.User:
                return <AutoComplete
                    id={"subjectSearch"}
                    label="Add Member"
                    placeholder="Type to search subjects"
                    startIcon={<SearchOutlinedIcon />}
                    onInputChange={handleSubjectInputChange}
                    loading={inputFetchLoading}
                    onChange={subjectSelected}
                    options={subjectsData}
                    groupBy={option => option.domainName}
                    getOptionLabel={option => option.displayName}
                    defaultValue=""
                    className="mb-16"
                    clearAfterSelect
                />
            case SelectedInputEnum.Group:
                return <Select
                    id="iMSGroupSelect"
                    handleChange={handleGroupSelectChange}
                    values={groupsData}
                    label="Select a group"
                    labelField="systemName"
                    valueField="id"
                    className="mb-16"
                />
            case SelectedInputEnum.Property: {
                return <AutoComplete
                    id={"propertySearch"}
                    label="Select a property"
                    placeholder="Type to search properties"
                    startIcon={<SearchOutlinedIcon />}
                    onInputChange={handlePropertyInputChange}
                    loading={inputFetchLoading}
                    onChange={propertySelected}
                    options={propertiesData}
                    groupBy={option => option.moduleName}
                    getOptionLabel={option => option.systemName}
                    className="mb-16"
                />
            }
            case SelectedInputEnum.Profile: {
                return <ProfileSelect handleChange={profileSelected} />
            }
        }
    }
    // const handleKeyDownForProperties = (event: React.KeyboardEvent<HTMLDivElement>) => {
    //     if (event.key === 'ArrowDown' && !inputValue) {

    //     }
    // }
    const saveProfileMembers = async () => {
        setFormSaveButtonLoading(true);
        if (!props.profileData) {
            return;
        }
        const postData: ProfileForUpdate = {
            id: props.profileData.id,
            systemName: props.profileData.systemName,
            // labels: props.profileData.labels,
            pMemberUIs: {
                added: addedMembers
                    .filter((addedMember => !existingMembers.some(existingMembers => existingMembers === addedMember)))
                    .map(subject => {
                        const addedMember: MemberForTable = {
                            id: subject.referenceId || subject.id,
                            memberTypeInt: subject.memberTypeInt != undefined ? subject.memberTypeInt : ProfileMemberType.Subject,
                            displayName: subject.displayName,
                            referenceId: subject.referenceId,
                            sourceMemberType: subject.sourceMemberType,
                            sources: subject.sources,
                            isUser: subject.isUser
                        }
                        // if (subject.sourceMemberType === SubjectTypes.group) {
                        //     addedMember.memberTypeInt = ProfileMemberType.Group;
                        // }
                        return addedMember;
                    }),
                deleted: deletedMembers,
            }
        }
        try {
            await ProfileService.updateProfile(postData);
            showToastAlert(messages.updateProfileSuccess.severity, messages.updateProfileSuccess.content, messages.updateProfileSuccess.title);
            setFormSaveButtonLoading(false);
            onClose();
            props.onSuccessfulSave();
        } catch (error) {
            showToastAlert(messages.updateProfileError.severity, messages.updateProfileError.content, messages.updateProfileError.title);
            setFormSaveButtonLoading(false);
            return;
        }
    }

    const removeMemberFromTable = (memberId: string) => {
        const deletedMember = addedMembers.find(x => x.id === memberId);
        if (deletedMember) {
            setDeletedMembers([...deletedMembers, deletedMember]);
        }
        setAddedMembers(addedMembers.filter(x => x.id !== memberId));
    }
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={globalStyles.muiModal} sx={{ width: "700px !important" }}>
                    <FormHeader title={`Edit members of ${props.profileData.systemName}`} variant="h5" />
                    <div className="profile-member-input-container">
                        <div className="flex justify-content-space-around mb-16">
                            <Button onClick={() => setSelectedInput(SelectedInputEnum.User)} label="Add user" style={{ width: "110px" }} />
                            <Button onClick={() => setSelectedInput(SelectedInputEnum.Group)} label="Add group" style={{ width: "110px" }} />
                            <Button onClick={() => setSelectedInput(SelectedInputEnum.Profile)} label="Add profile" style={{ width: "110px" }} />
                            {/* <Button onClick={() => setSelectedInput(SelectedInputEnum.Property)} label="Add property" style={{ width: "110px" }} /> */}
                        </div>
                        {renderInput()}
                    </div>
                    <ProfileMembersDataTable profileMembers={addedMembers} loading={memberTableLoading} deleteMember={removeMemberFromTable} />
                    <FormFooter cancelOnClick={onClose} loading={formSaveButtonLoading} saveOnClick={saveProfileMembers} />
                </Box>
            </Modal>
        </>
    )
}
