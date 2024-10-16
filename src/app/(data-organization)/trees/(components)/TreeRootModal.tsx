import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormFooter, Select, TextInput, Toggle, Button } from "@ims/component-library";
import "./tree.module.css";
import { TreeNode, TreeNodeModalProps, TreeRoot, TreeRootCreate, TreeRootModalProps, TreeRootUpdate } from "@/models/Entities/Tree";
import { useContext, useState } from "react";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { TreeService } from "@/services/Tree";
import { Response, ServiceCaller } from "@/services/Helpers";
import { createNode, createTreeRoot, updateNode, updateTreeRoot } from "../actions";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import { style } from "../style";
import ModalComponent from "@/app/(components)/ModalComponent/ModalComponent";
import { useToast } from "@/ToastAlertProvider";
import { messages } from "@/AlertMessages";

const rootLabelFieldsPrefix = "TreeRootLabel";

export function TreeRootModal(props: TreeRootModalProps) {

    const [open, setOpen] = useState<boolean>(true);
    const languages = useContext(LanguagesContext);
    const isUpdate = !!props.systemName
    const [loading, setLoading] = useState(false);

    const { showToastAlert } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            let result: Response<TreeRoot> | {
                isSuccess: boolean;
                error: unknown;
            }
            if (isUpdate) {
                result = await updateTreeRoot(formData, rootLabelFieldsPrefix, languages);
                showToastAlert(messages.updateTreeRootSuccess.severity, messages.updateTreeRootSuccess.content, messages.updateTreeRootSuccess.title);
                if (!result.isSuccess) {
                    showToastAlert(messages.updateTreeRootError.severity, messages.updateTreeRootError.content, messages.updateTreeRootError.title);
                }
            }
            else {
                result = await createTreeRoot(formData, rootLabelFieldsPrefix, languages);
                showToastAlert(messages.createTreeRootSuccess.severity, messages.createTreeRootSuccess.content, messages.createTreeRootSuccess.title);
                if (!result.isSuccess) {
                    showToastAlert(messages.createTreeRootError.severity, messages.createTreeRootError.content, messages.createTreeRootError.title);
                }
            }
            if (result.isSuccess) {
                props.setModal(null);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);

        }
    }

    const handleClose = () => {
        props.setModal(null)
        setOpen(false)
    }

    return (
        <div>
            <ModalComponent handleClose={handleClose} modalOpen={true} modalTitle={!!props.systemName ? " Update tree Root" : "Create tree Root"}
                onSubmit={handleSubmit}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="inputContainer">
                        <TextInput id="systemName" disabled={!!props.systemName ? true : false} label="System Name" name="systemName" type="string"
                            size="medium" defaultValue={props.systemName} />
                        {/* <Toggle id="isSystem" label="Is System" defaultChecked={props.isSystem} name="isSystem" />
                        <Toggle id="isCustomizable" label="Is Customizable" defaultChecked={props.IsCustomizable} name="isCustomizable" />
                        <Toggle id="isExtendable" label="Is Extendable" defaultChecked={props.isExtendable} name="isExtendable" />
                        <Toggle id="isLabelCustomizable" label="Is Label Customizable" defaultChecked={props.isLabelCustomizable} name="isLabelCustomizable" /> */}
                        {/* <TextInput id="description" label="Description" defaultValue={props.description} size="medium" type="string" name="description" /> */}
                        <LabelFields namePrefix={rootLabelFieldsPrefix} labels={props.labels} />
                    </div>
                </Typography>
                <div className="display-none">
                    <TextInput id="id" defaultValue={props.id} name="id" />
                </div>
                <div className="display-none">
                    {languages?.map(language => (
                        <TextInput key={language.id} id={language.id} defaultValue={props.labels?.find(x => x.languageID === language.id)?.id} name={rootLabelFieldsPrefix + language.id + "id"} />
                    ))}
                </div>
                <FormFooter cancelOnClick={() => { props.setModal(null) }} loading={loading} />
            </ModalComponent >
        </div >
    );
}
//                    <FormFooter saveOnClick={props.systemName ? updateTreeRoot : createTreeRoot} cancelOnClick={()=>{props.setModal(null)}} />  


