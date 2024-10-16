import { DataGrid, GridColDef, GridRowParams } from '@ims/component-library';
import React from 'react';

interface FileData {
  id: string;
  systemName: string;
  file: File;
}

interface DocumentTemplateProps {
  files: FileData[];
}

export default function DocumentTemplate({ files }: DocumentTemplateProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "systemName",
      headerName: "System Name",
      flex: 1,
      minWidth: 100,
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const fileData = files.find(file => file.id === params.row.id);
    if (fileData) {
      const fileURL = URL.createObjectURL(fileData.file);
      window.open(fileURL);
    }
  };

  return (
    <div>
      <DataGrid rows={files} columns={columns} onRowClick={handleRowClick} />
    </div>
  );
}