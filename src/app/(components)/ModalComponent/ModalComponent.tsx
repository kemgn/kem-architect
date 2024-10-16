import React, { ReactNode } from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormHeader from '../Form/FormHeader/FormHeader';
import { modalstyle } from '@/modalstyle';
import styles from "./modalcomponent.module.css";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";

interface ModalComponentProps {
    children: ReactNode;
    handleClose: () => void;
    modalOpen: boolean;
    modalTitle: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}
export default function ModalComponent(props: ModalComponentProps) {
    return (
        <>
            <Modal
                open={props.modalOpen}
                onClose={props.handleClose}
            >
                <Box className={globalStyles.muiModal}>
                    <FormHeader title={props.modalTitle} />
                    <form onSubmit={props.onSubmit} className={styles.form}>
                        {props.children}
                    </form>
                </Box>
            </Modal>
        </>
    )
}
