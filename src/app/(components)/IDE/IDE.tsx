"use client";
import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useIde } from "../../../../public/IDE/IDEContext";
import { Button } from "@ims/component-library";
import "./ide.css";
import styles from "./ide.module.css";

const IdeModal: React.FC = () => {
    const { isOpen, closeIde } = useIde();

    const handleSave = () => {
        closeIde();
    }
    
    return (
        <Modal open={true} onClose={closeIde} sx={{ display: isOpen ? "flex" : "none" }}>
            <div style={{ width: "100vw" }}>
                <div id="ims-ide">

                </div>
                <div className={`${styles.buttonsContainer} flex justify-content-center align-items-center`} >
                    <Button onClick={handleSave} label="Save" className={`${styles.ideButton} mr-32`}/>
                    <Button onClick={closeIde} label="Cancel" className={`${styles.ideButton} ${styles.ideCancelButton}`} />
                </div>
            </div>
        </Modal>
    );
};

export default IdeModal;
