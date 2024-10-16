import { Subject, SubjectForCreate, SubjectForUpdate } from '@/models/Entities/Subject';
import React, { ReactNode, SetStateAction, useState } from 'react'
import Box from "@mui/material/Box";
import { modalstyle } from '@/modalstyle';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import Modal from "@mui/material/Modal";
import { FormFooter, PasswordInput, Select, SelectValue, TextInput, Toggle } from '@ims/component-library';
import { SubjectDataTColsFields, SubjectDataTColsHeaders } from './SubjectDataTCols';
import { AvailablePlatforms, SubjectSources, SubjectStatus } from '@/models/Enums/Enums';
import { ConvertEnumToObject } from '@/utils/Helpers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import localstyle from './SubjectModal.module.css'
import { createSubject, updateSubject } from '../actions';
import { Response } from '@/services/Helpers';
import { isProcessFinished, loadingTrue, notLoading, Web } from './Statics';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';

interface SubjectModalProps {
    subject?: Subject;
    setModal: React.Dispatch<SetStateAction<ReactNode>>;
    setIsProcessFinished: React.Dispatch<SetStateAction<boolean>>;
    setLoadingDataGrid: React.Dispatch<SetStateAction<boolean>>;
}

const updateHeader = "Update user";
const createHeader = "Create user";
const variant = 'h5';
const close = false
const stringTextInput = "string"
const smallSize = 'medium';
const defaultDomainValue = "Local";
const disabled = true;
const selfEnrollmentLb = 'Self Enrollment';
const selfEnrollmentId = 'selfEnrollment';
const passwordField = 'passwordField';
const sourceTypeLocal = 3;
const isLocal = true;
const domainName = "Local";
const isUser = true; // user , group manasında mı
const StatusType = 0; // 0 for active
const typeInt = 0; // 0 for user
const emptyStr = "";

export default function SubjectModal(props: SubjectModalProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [selfEnrollment, setSelfEnrollment] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const { showToastAlert } = useToast();

    const sourceType = props.subject && parseInt(props.subject?.sourceType.toString())

    const handleClose = () => {
        setOpen(close);
        props.setModal(null);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        debugger;
        try {
            setButtonLoading(loadingTrue);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            props.setLoadingDataGrid(loadingTrue);
            let result: Response<Subject> | {
                data: null;
                isSuccess: boolean;
            }
    
            const displayNameTmp = formData.get(SubjectDataTColsFields.displayName) as string;
            const displayText = displayNameTmp.split(" ")[0];
            const samAccountNameTmp = formData.get(SubjectDataTColsFields.samAccountName) as string;
            const emailAddressTmp = formData.get(SubjectDataTColsFields.emailAddress) as string;
            const password = formData.get("password") as string;
            // const selfEnrollment_ = selfEnrollment;

            if (!!props.subject) {
                const updatingSubject = props.subject;
                const subject: SubjectForUpdate = {
                    id: updatingSubject.id,
                    displayName: displayNameTmp,
                    samAccountName: updatingSubject.samAccountName,
                    emailAddress: emailAddressTmp,
                    availablePlatformType: updatingSubject.availablePlatformsType,
                    displayText: updatingSubject.displayText,
                    domainName: updatingSubject.domainName,
                    isLocal: updatingSubject.isLocal,
                    sourceType: updatingSubject.sourceType,
                    isUser: updatingSubject.isUser,
                    statusType: updatingSubject.statusType,
                    userPrincipalName: updatingSubject.userPrincipalName,
                    subjectReferenceId: updatingSubject.subjectReferenceId,
                    password: updatingSubject.password,
                    // selfEnrollment: updateSubject.selfEnrollment,
                }
                result = await updateSubject(subject);
                showToastAlert(messages.updateSubjectSuccess.severity, messages.updateSubjectSuccess.content, messages.updateSubjectSuccess.title);
                if (!result.isSuccess) {
                    showToastAlert(messages.updateSubjectError.severity, messages.updateSubjectError.content, messages.updateSubjectError.title);
                }
            }
            else {
                const subject: SubjectForCreate = {
                    displayName: displayNameTmp,
                    samAccountName: samAccountNameTmp,
                    emailAddress: emailAddressTmp,
                    sourceTypeInt: sourceTypeLocal,
                    AvailablePlatformsTypeInt: AvailablePlatforms.None,
                    displayText: displayText,
                    isLocal: isLocal,
                    domainName: domainName,
                    isUser: isUser,
                    statusTypeInt: StatusType,
                    typeInt: typeInt,
                    userPrincipalName: emptyStr,
                    password: password,
                    selfEnrollment: selfEnrollment,
                }
                result = await createSubject(subject);
                showToastAlert(messages.createSubjectSuccess.severity, messages.createSubjectSuccess.content, messages.createSubjectSuccess.title);
                if (!result.isSuccess) {
                    showToastAlert(messages.createSubjectError.severity, messages.createSubjectError.content, messages.createSubjectError.title);
                    props.setLoadingDataGrid(false);
                    setButtonLoading(false);
                }
            }
            if (result.isSuccess) {
                setButtonLoading(notLoading);
                props.setModal(null);
                props.setIsProcessFinished(isProcessFinished);
            }
        } catch (error) {
            props.setLoadingDataGrid(false);
            setButtonLoading(false);
            // props.setIsProcessFinished(isProcessFinished);
        }
    }

    const handleToggleChange = (event: React.SyntheticEvent) => {
        const checked = (event.target as HTMLInputElement).checked;
        setSelfEnrollment(checked);
    }

    const domains: SelectValue[] = ConvertEnumToObject(SubjectSources);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle}>
                    <FormHeader title={!!props.subject ? updateHeader : createHeader} variant={variant} />
                    <form onSubmit={handleSubmit}>
                        <div className="inputContainer">
                            <TextInput defaultValue={props.subject && props.subject.displayName} name={SubjectDataTColsFields.displayName}
                                id={SubjectDataTColsFields.displayName} label={SubjectDataTColsHeaders.displayName} type={stringTextInput} size={smallSize} />
                            <TextInput defaultValue={props.subject && props.subject.samAccountName} name={SubjectDataTColsFields.samAccountName}
                                id={SubjectDataTColsFields.samAccountName} label={SubjectDataTColsHeaders.samAccountName} type={stringTextInput} size={smallSize}
                                disabled={!!props.subject} />
                            <TextInput defaultValue={props.subject && props.subject.emailAddress} name={SubjectDataTColsFields.emailAddress}
                                id={SubjectDataTColsFields.emailAddress} label={SubjectDataTColsHeaders.emailAddress} type={stringTextInput} size={smallSize} />
                            {/* <Select values={domains} defaultValue={domains.find((val) => val.value === defaultDomainValue)?.value} disabled={disabled}></Select> */}
                            {
                                !props.subject &&
                                <>
                                    <Toggle disabled={props.subject} value={selfEnrollment} checked={selfEnrollment} id={selfEnrollmentId} name={"selfEnrollment"} onChange={handleToggleChange} label={selfEnrollmentLb} />
                                    {

                                        !selfEnrollment &&
                                        <PasswordInput name={"password"} />
                                    }
                                </>
                            }
                            <div className="display-none">
                                <TextInput defaultValue={props.subject?.subjectReferenceId} name="subjectReferenceId" />
                            </div>
                            <FormFooter cancelOnClick={handleClose} loading={buttonLoading} />
                        </div>
                    </form>
                </Box>
            </Modal>
        </div >
    )
}
