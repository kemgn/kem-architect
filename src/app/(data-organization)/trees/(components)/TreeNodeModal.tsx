import { LanguagesContext } from "@/app/(components)/_Contexts/LanguagesContext";
import { TreeNode, TreeNodeModalProps } from "@/models/Entities/Tree";
import React, { useContext, useState } from "react";
import { createNode, updateNode } from "../actions";
import { TreeService } from "@/services/Tree";
import { FormFooter, TextInput, Toggle } from "@ims/component-library";
import FormHeader from "@/app/(components)/Form/FormHeader/FormHeader";
import Typography from "@mui/material/Typography";
import LabelFields from "@/app/(components)/Form/LabelFields/LabelFields";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "../style";
import { Response } from "@/services/Helpers";
import ModalComponent from "@/app/(components)/ModalComponent/ModalComponent";
import { useToast } from "@/ToastAlertProvider";
import { alertSeverity } from "@/models/Enums/Enums";
import { messages } from "@/AlertMessages";

const nodeLabelFieldsPrefix = "TreeNodeLabel";

export function TreeNodeModal(props: TreeNodeModalProps) {
    const [open, setOpen] = React.useState(true);
    const languages = useContext(LanguagesContext);
    const [loading, setLoading] = useState<boolean>(false);
    const isUpdate = !!props.systemName;

    const { showToastAlert } = useToast();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoading(true);
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            console.log("formData", formData, "props.rootId", props.rootId);
            let result: Response<TreeNode> | {
                isSuccess: boolean;
                error: unknown;
            } | undefined
            if (isUpdate) {
                result = await updateNode(formData, nodeLabelFieldsPrefix, languages);
                showToastAlert(alertSeverity.success, messages.updateTreeNodeSuccess.content, messages.createTreeNodeSuccess.title);
                if (!result.isSuccess) {
                    showToastAlert(alertSeverity.error, messages.updateTreeNodeError.content, messages.createTreeNodeError.title);
                }
            }
            else {
                if (!!props.rootId) {
                    result = await createNode(formData, nodeLabelFieldsPrefix, languages, props.rootId);
                    showToastAlert(alertSeverity.success, messages.createTreeNodeSuccess.content, messages.createTreeNodeSuccess.title);
                    if (!result?.isSuccess) {
                        showToastAlert(alertSeverity.error, messages.createTreeNodeError.content, messages.createTreeNodeError.title);
                    }
                }
            }
            if (result?.isSuccess) {
                const response = await TreeService.getTreeRoots();
                props.setTreeRoots(response);
                setLoading(false);
                props.setProcessFinished(true);
                props.setModal(null);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const handleClose = () => {
        props.setModal(null);
        setOpen(false);
    }

    return (
        <div>
            <ModalComponent handleClose={handleClose} modalOpen={open} modalTitle={props.systemName ? "Update tree node" : " Create tree node"}
                onSubmit={handleSubmit}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="inputContainer">
                        <TextInput id="systemName" label="System Name" disabled={props.systemName ? true : false}
                            name="systemName" type="string" size="medium" defaultValue={props.systemName} />
                        <TextInput id="weight" label="Weight" name="weight" type="number" size="medium" defaultValue={props.weight} />
                        {/* <Toggle    id="isSystem" label="Is System" name="isSystem" defaultChecked={props.isSystem}/>
                        <Toggle    id="isCustomizable" label="Is Customizable" name="isCustomizable" defaultChecked={props.IsCustomizable}/>
                        <Toggle    id="isLabelCustomizable" label="Is Label Customizable" name="isLabelCustomizable"
                         defaultChecked={props.isLabelCustomizable}/> */}
                        <LabelFields namePrefix={nodeLabelFieldsPrefix} labels={props.labels} />
                    </div>
                </Typography>
                <div className="display-none">
                    <TextInput id="id" defaultValue={props.id} name="id" />
                    {languages?.map(language => (
                        <TextInput key={language.id} id={language.id} defaultValue={props.labels?.find(x => x.languageID === language.id)?.id} name={nodeLabelFieldsPrefix + language.id + "id"} />
                    ))}
                </div>
                <FormFooter cancelOnClick={() => { props.setModal(null) }} loading={loading} />
            </ModalComponent>
        </div>
    );
}