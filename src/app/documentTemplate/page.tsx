"use client"
import React, { useState } from 'react';
import DocumentTemplate from "./(components)/DocumentTemplate";
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import PageHeader from '../(components)/_NextComponents/PageHeader/PageHeader';
import { Button } from '@ims/component-library';

interface FileData {
    id: string;
    systemName: string;
    file: File;
}

export default function Page() {
    const [files, setFiles] = useState<FileData[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files ?? []).map(file => ({
            id: file.name, // or any unique id
            systemName: file.name,
            file: file
        }));
        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    };

    return (
        <>
            <div className={globalStyles.container}>
                <div>
                    <div className={globalStyles.headerButtonGroup}>
                        <PageHeader pageTitle="Document Template Management" />
                        <input
                            type="file"
                            multiple
                            id="fileUpload"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        <Button
                            label="New Template"
                            color="primary"
                            className={globalStyles.createButton}
                            onClick={() => document.getElementById('fileUpload')?.click()}
                            loading={false}
                        />
                    </div>
                    <DocumentTemplate files={files} />
                </div>
            </div>
        </>
    );
}