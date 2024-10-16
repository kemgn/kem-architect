import { AutoComplete, Button, DataGrid, FormFooter, OptionType, Select } from '@/app/(components)/_IMSComponentLibary/components';
import { Group, GroupForUpdate, GroupMemberForCreate, GroupMemberForUpdate } from '@/models/Entities/Group';
import { GroupMemberType, ProfileMemberType, SelectedInputEnum, SubjectSources, SubjectTypes } from '@/models/Enums/Enums';
import { GroupService } from '@/services/Group';
import React, { ReactNode, useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { Subject } from '@/models/Entities/Subject';
import GroupMembersDataTable from './GroupMembersDataTable';
import { MemberForTable } from '@/models/Entities/Profile';
import { SubjectService } from '@/services/Subject';
import { Response } from "@/services/Helpers";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Property } from '@/models/Entities/Property';
import { getDisplayName, SubjectForAutoComplete } from '../../(profile-group-common)/Helpers';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';

interface GroupMembersFormProps {
    groupData: Group;
    onClose: Function;
    onSuccessfulSave: Function;
}


export default function GroupMembersForm(props: GroupMembersFormProps) {
    // const stopper = 0;
    const [open, setOpen] = useState(true);
    const [groupsData, setGroupsData] = useState<Group[]>([]);
    const [addedMembers, setAddedMembers] = useState<MemberForTable[]>([]);
    const [deletedMembers, setDeletedMembers] = useState<MemberForTable[]>([]);
    // const [allMembers, setAllMembers] = useState<MemberForTable[]>([]);

    const [selectedInput, setSelectedInput] = useState<SelectedInputEnum>(SelectedInputEnum.User);
    const [memberTableLoading, setMemberTableLoading] = useState<boolean>(false)

    const [existingMembers, setExistingMembers] = useState<MemberForTable[]>([]);
    const [subjectsData, setSubjectsData] = useState<SubjectForAutoComplete[]>([]);
    const [inputFetchLoading, setInputFetchLoading] = useState<boolean>(false);
    const [formSaveButtonLoading, setFormSaveButtonLoading] = useState<boolean>(false);

    const {showToastAlert} = useToast();

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
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedInput]);

    useEffect(() => {
        const addMembersToTable = async () => {
            setMemberTableLoading(true);
            try {
                await GroupService.getGroupMembers(props.groupData.id).then(result => {
                    let membersData: MemberForTable[] = [];
                    if (result.gMemberUIs) {
                        membersData = result.gMemberUIs?.map(member => {
                            const variable: MemberForTable = {
                                displayName: getDisplayName(member.domainName, member.displayName),
                                memberTypeInt: member.memberType,
                                domainName: member.domainName,
                                id: member.id,
                                referenceId: member.gMemberReferenceId,
                                sourceMemberType: member.types,
                                sources: member.source,
                                isUser: member.types === SubjectTypes.user
                            }
                            return variable;
                        })
                    }
                    setExistingMembers(membersData);
                    setAddedMembers(membersData);
                    setMemberTableLoading(false);
                });
            } catch (_) {
                setMemberTableLoading(false);
            }
        }
        addMembersToTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const handleGroupSelectChange = (value: string) => {
        if (addedMembers.find(x => x.id === value) || addedMembers.find(x => x.referenceId === value) || props.groupData?.groupReferenceId === value) {
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
        setSubjectsData([]);
        if (!addedMembers.find(x => x.referenceId === subject.id)) {
            setAddedMembers([...addedMembers, {
                id: subject.id,
                memberTypeInt: ProfileMemberType.Subject,
                displayName: getDisplayName(subject.domainName, subject.displayName),
                domainName: subject.domainName,
                referenceId: subject.id,
                sourceMemberType: subject.type,
                sources: subject.sourceType,
                isUser: subject.type === SubjectTypes.user
            }])
        }
    }

    const removeMemberFromTable = (memberId: string) => {
        const deletedMember = addedMembers.find(x => x.id === memberId);

        if (deletedMember) {
            setDeletedMembers([...deletedMembers, deletedMember]);
        }
        setAddedMembers(addedMembers.filter(x => x.id !== memberId));
    }

    const saveGroupMembers = async () => {
        if (!props.groupData) {
            return;
        }
        const postData: GroupForUpdate = {
            id: props.groupData.id,
            systemName: props.groupData.systemName,
            // labels: props.profileData.labels,
            gMemberUIs: {
                added: addedMembers
                    .filter((addedMember => !existingMembers.some(existingMembers => existingMembers === addedMember)))
                    .map(subject => {
                        debugger;
                        const addedMember: MemberForTable = {
                            id: subject.referenceId || subject.id,
                            memberTypeInt: subject.memberTypeInt !== undefined ? subject.memberTypeInt : ProfileMemberType.Subject,
                            displayName: subject.displayName,
                            referenceId: subject.referenceId,
                            sourceMemberType: subject.sourceMemberType,
                            sources: subject.sources,
                            isUser: subject.isUser,
                        }
                        return addedMember;
                    }),
                deleted: deletedMembers,
            },
            groupReferenceId: props.groupData.groupReferenceId
        }
        try {
            await GroupService.updateGroup(postData);
            showToastAlert(messages.updateGroupSuccess.severity  , messages.updateGroupSuccess.content , messages.updateGroupSuccess.title );
            onClose();
            props.onSuccessfulSave();
        } catch (error) {
            showToastAlert(messages.updateGroupError.severity , messages.updateGroupError.content , messages.updateGroupError.title);
            return;
        }
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
        }
    }
    const onClose = () => {
        setOpen(false);
        props.onClose()
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
                    <FormHeader title={`Edit members of ${props.groupData.systemName}`} variant="h5" />
                    <div>
                        <div className="flex justify-content-space-around mb-16">
                            <Button onClick={() => setSelectedInput(SelectedInputEnum.User)} label="Add user" style={{ width: "110px" }} />
                            <Button onClick={() => setSelectedInput(SelectedInputEnum.Group)} label="Add group" style={{ width: "110px" }} />
                        </div>
                        {renderInput()}
                    </div>
                    <GroupMembersDataTable loading={memberTableLoading} rows={addedMembers} deleteMember={removeMemberFromTable} />
                    <FormFooter cancelOnClick={onClose} saveOnClick={saveGroupMembers} />
                </Box>
            </Modal>
        </>
    )
}
