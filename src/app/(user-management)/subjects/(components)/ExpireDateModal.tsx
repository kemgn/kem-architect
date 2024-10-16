import React, { ReactNode, SetStateAction, useState } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalstyle } from '@/modalstyle';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import { FormFooter, TextInput, Toggle } from '@ims/component-library';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import localstyle from './ExpireDate.module.css'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css"
import { Subject, SubjectForUpdate } from '@/models/Entities/Subject';
import { AvailablePlatforms, SubjectStatus } from '@/models/Enums/Enums';
import { emptyString, isProcessFinished, loadingTrue, zeroBit } from './Statics';
import { updateSubject } from '../actions';
import dayjs from 'dayjs';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';
import { useToast } from '@/ToastAlertProvider';
import { messages } from '@/AlertMessages';

interface ExpireDateModalProps {
    setModal: React.Dispatch<SetStateAction<ReactNode>>;
    local: boolean;
    rowData: Subject;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    setIsProcessFinished: React.Dispatch<SetStateAction<boolean>>;
}

const forClose = false;
const localTitle = "Local User";
const activeFieldLabel = "Active";
const expireDateFieldLabel = "Expire Date";
const activeFieldID = "activeFieldID";
const activeStatusType = 0;
const webFiedLabel = "Web";
const webFieldID = "web";
const apiFieldLabel = "Api";
const apiFieldID = "api"
const datePickerField = "datePickerField";
const on = "on";

export default function ExpireDateModal(props: ExpireDateModalProps) {

    const [open, setOpen] = useState<boolean>(true);
    const title = props.rowData.displayName;
    const { showToastAlert } = useToast();
    const handleClose = () => {
        setOpen(forClose);
        props.setModal(null);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setLoading(loadingTrue);
        const formData = new FormData(event.currentTarget);
        const dateStr = formData.get(datePickerField)?.toString();
        const isActive = formData.get(activeFieldID) === on ? true : false;
        const statusTypeTmp = isActive ? SubjectStatus.active : SubjectStatus.passive;
        const apiToggle = formData.get(apiFieldID) === on ? true : false;
        const webToggle = formData.get(webFieldID) === on ? true : false;
        const webToggleStatus = webToggle ? AvailablePlatforms.Web : AvailablePlatforms.None;
        const apiToggleStatus = apiToggle ? AvailablePlatforms.Api : AvailablePlatforms.None;
        let availablePlatform = apiToggleStatus | webToggleStatus;
        let date: Date | undefined = undefined;
        if (!!dateStr) {
            const [month, day, year] = dateStr?.split('/');
            date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        }
        console.log('date', date);
        const subjectTmp = props.rowData;
        const subject: SubjectForUpdate = {
            id: subjectTmp.id,
            availablePlatformType: availablePlatform,
            expireDate: date,
            displayName: subjectTmp.displayName,
            displayText: subjectTmp.displayText,
            domainName: subjectTmp.domainName,
            emailAddress: subjectTmp.emailAddress ?? emptyString,
            isLocal: subjectTmp.isLocal,
            isUser: subjectTmp.isUser,
            samAccountName: subjectTmp.samAccountName,
            sourceType: subjectTmp.sourceType,
            statusType: statusTypeTmp,
            userPrincipalName: subjectTmp.userPrincipalName,
            subjectReferenceId: subjectTmp.subjectReferenceId,
        }
        const response = await updateSubject(subject);
        if (response.isSuccess) {
            showToastAlert(messages.updateSubjectSuccess.severity, messages.updateSubjectSuccess.content, messages.updateSubjectSuccess.title);
            props.setIsProcessFinished(isProcessFinished);
            handleClose();
        }
        else {
            showToastAlert(messages.updateSubjectError.severity, messages.updateSubjectError.content, messages.updateSubjectError.title);
        }
    }

    console.log(props.rowData.availablePlatformsType);

    return (
        <div>
            <ModalComponent handleClose={handleClose} modalOpen={open} modalTitle={title} onSubmit={handleSubmit}>
                <Toggle id={activeFieldID} label={activeFieldLabel} name={activeFieldID} defaultChecked={props.rowData.statusType === SubjectStatus.active} />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker className={localstyle.datePicker} label={expireDateFieldLabel} name={datePickerField}
                        defaultValue={props.rowData.expireDate ? dayjs(props.rowData.expireDate) : null} />
                </LocalizationProvider>
                <div className={localstyle.titlewithlines}>
                    <hr />
                    <span>Available Platforms</span>
                    <hr />
                </div>
                <Toggle id={webFieldID} name={webFieldID} label={webFiedLabel}
                    defaultChecked={(props.rowData.availablePlatformsType & AvailablePlatforms.Web) !== zeroBit} />
                <Toggle id={apiFieldID} name={apiFieldID} label={apiFieldLabel}
                    defaultChecked={(props.rowData.availablePlatformsType & AvailablePlatforms.Api) !== zeroBit} />
                <div className="display-none">
                    <TextInput defaultValue={props.rowData?.subjectReferenceId} name="subjectReferenceId" />
                </div>
                <FormFooter cancelOnClick={handleClose} />
            </ModalComponent>
        </div>
    )
}
