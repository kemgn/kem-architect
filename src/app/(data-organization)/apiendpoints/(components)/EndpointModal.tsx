import React, { useState } from 'react'
import Modal from "@mui/material/Modal";
import { EndPointModalForUpdate, EndPointModalProps, Endpoint } from '@/models/Entities/Endpoint';
import Box from "@mui/material/Box";
import { modalstyle } from '@/modalstyle';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';
import Typography from "@mui/material/Typography";
import { FormFooter, Select, TextInput, Toggle } from '@ims/component-library';
import { formFieldIDs, loadingTrue, notLoading } from '../statics';
import { EPointDataTColFields, EPointDataTColHeaders } from './EPointDataTColFields';
import { HTTPMethods, logType, loggerMode } from '@/models/Enums/Enums';
import ModalComponent from '@/app/(components)/ModalComponent/ModalComponent';

const updateHeader = "Update endpoint";
const createHeader = "Create endpoint";
const GET          = "GET";
const POST         = "POST";
const PUT          = "PUT";
const PATCH        = "PATCH";
const DELETE       = "DELETE";
const emptyStr     = "";
const actionactive = false;

export default function EndpointModal(props: EndPointModalProps) {
    const [open, setOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const isUpdate = !!props.endpoint;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButtonLoading(loadingTrue);
        const formData = new FormData(event.currentTarget);
        const endpointID = (formData.get(EPointDataTColFields.id) as string) ? (formData.get(EPointDataTColFields.id) as string) : Date.now().toString();
        const active = (formData.get(formFieldIDs.active) as string === "on" ? true : false);
        const endpointName = (formData.get(formFieldIDs.endpointName) as string) ? (formData.get(formFieldIDs.endpointName) as string) : props.endpoint?.systemName;
        const httpMethod = (formData.get(formFieldIDs.httpMethod) as unknown as HTTPMethods);
        const loggerMode = (formData.get(formFieldIDs.loggerMode) as unknown as loggerMode);
        const logType = (formData.get(formFieldIDs.logType) as unknown as logType);
        const useDefaultValues = (formData.get(formFieldIDs.useDefaultValues) as string === "on" ? true : false);
        const postfix = (formData.get(formFieldIDs.postfix) as string);
        const infix =  (formData.get(formFieldIDs.infix) as string);
        const description = (formData.get(formFieldIDs.description) as string );
        
        const endpointObj: Endpoint = {
            isActive:        active,
            Actions:       {
                main: props.endpoint ? props.endpoint?.Actions.main : {
                    apiActionID:    emptyStr,
                    apiEndpointID:  Date.now().toString() + "xy",
                    id:             Date.now().toString(),
                    isActive:       actionactive,
                    relationType:   1
                },
                onAfterSave: props.endpoint ? props.endpoint?.Actions.onAfterSave : {
                    apiActionID:    emptyStr,
                    apiEndpointID:  Date.now().toString() + "yz",
                    id:             Date.now().toString(),
                    isActive:       actionactive,
                    relationType:   2
                },
                onError: props.endpoint ? props.endpoint?.Actions.onError : {
                    apiActionID:    emptyStr,
                    apiEndpointID:  Date.now().toString() + "lm",
                    id:             Date.now().toString(),
                    isActive:       actionactive,
                    relationType:   3
                }
            },
            systemName:         endpointName!,
            method:             httpMethod,      
            id:                 endpointID,
            loggerMode:         loggerMode,
            logType:            logType,
            infix:              infix,
            postfix:            postfix,
            useDefaultValues:   useDefaultValues,
            description:        description 
        }
        console.log("OurEndpoint: -> -> _-_-_>", endpointObj);

        if(isUpdate){
            const endpointsTmp = props.endpoints.map((e) => {
                    if(e.id === endpointID){
                        return endpointObj
                    }
                    return e
                }) 
            props.setEndpoints(endpointsTmp);
        }
        else{
            props.setEndpoints([...props.endpoints , endpointObj])
        }
        setButtonLoading(notLoading);
        props.setModal(null);
    }

    const handleClose = () => {
        props.setModal(null);
        setOpen(false);
    }

    return (
        <div>
            <ModalComponent handleClose={handleClose} modalOpen={open} modalTitle={isUpdate ? updateHeader : createHeader} onSubmit={handleSubmit}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextInput disabled={props.endpoint && !!props.endpoint.systemName} defaultValue={props.endpoint && props.endpoint.systemName} 
                            type='string' id={formFieldIDs.endpointName} name={formFieldIDs.endpointName}     label={EPointDataTColHeaders.endpointName} size='medium'/>
                            <Select label={EPointDataTColHeaders.httpMethod} defaultValue={props.endpoint && props.endpoint.method.toString()}
                                values={[
                                    { value: HTTPMethods.GET.toString(), label: GET },       { value: HTTPMethods.POST.toString(), label: POST },
                                    { value: HTTPMethods.DELETE.toString(), label: DELETE }, { value: HTTPMethods.PATCH.toString(), label: PATCH },
                                    { value: HTTPMethods.PUT.toString(), label: PUT }
                                ]}
                                name={formFieldIDs.httpMethod} id={formFieldIDs.httpMethod}
                            />
                            <Select label={EPointDataTColHeaders.logType} defaultValue={props.endpoint && props.endpoint.logType.toString()} 
                                values={[
                                    { value: logType.Unified.toString() , label: "Unified"} , { value: logType.Seperated.toString() , label: "Seperated"}
                                ]}
                                name={formFieldIDs.logType} id={formFieldIDs.logType}
                            />
                            <Select label={EPointDataTColHeaders.loggerMode} defaultValue={props.endpoint && props.endpoint.loggerMode.toString()} 
                                values={[
                                    { value: loggerMode.Default.toString() , label: "Default"} , { value: loggerMode.Full.toString() , label: "Full"},
                                    { value: loggerMode.Off.toString() , label: "Off"} ,         { value: loggerMode.Standard.toString() , label: "Standard"}    
                                ]}
                                name={formFieldIDs.loggerMode} id={formFieldIDs.loggerMode}
                            />
                            <Toggle label={EPointDataTColHeaders.active} defaultChecked={props.endpoint && props.endpoint.isActive} id={formFieldIDs.active}
                             name={formFieldIDs.active}/>
                            <Toggle label={EPointDataTColHeaders.useDefaultValues} defaultChecked={props.endpoint && props.endpoint.useDefaultValues} 
                                id={formFieldIDs.useDefaultValues} name={formFieldIDs.useDefaultValues}/>
                             <TextInput defaultValue={props.endpoint && props.endpoint.infix} type='string' id={formFieldIDs.infix} name={formFieldIDs.infix}
                                label={EPointDataTColHeaders.infix} size='medium'/>
                             <TextInput defaultValue={props.endpoint && props.endpoint.postfix} type='string' id={formFieldIDs.postfix} name={formFieldIDs.postfix}
                                label={EPointDataTColHeaders.postfix} size='medium'/>
                             <TextInput defaultValue={props.endpoint && props.endpoint.description} type='string' id={formFieldIDs.description} name={formFieldIDs.description}
                                label={EPointDataTColHeaders.description} size='medium'/>
                        </Typography>
                        <div className="display-none">
                            <TextInput id={EPointDataTColFields.id} defaultValue={props.endpoint && props.endpoint.id} name={EPointDataTColFields.id} />
                        </div>
                        <FormFooter loading={buttonLoading} cancelOnClick={() => props.setModal(null)} />
            </ModalComponent>
        </div>
    )
}
