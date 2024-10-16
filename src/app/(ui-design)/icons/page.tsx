'use client'
import { Button, DataGrid, DialogModal} from "@ims/component-library";
import { ReactNode, useEffect, useState } from "react";
import IconModal from "./(components)/IconModal";
import { Icon, IconModalI, iconAndModal } from "@/models/Entities/Icon";
import { IconFields, IconHeaders } from "./IconColumns";
import AspectRatioRoundedIcon from '@mui/icons-material/AspectRatioRounded';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PageHeader from '@/app/(components)/_NextComponents/PageHeader/PageHeader';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import ToastAlert, { useToast } from "@/ToastAlertProvider";
import { alertSeverity } from "@/models/Enums/Enums";

const createButtonColor = "primary"


export default function Page() {
  
    const [modal  , setModal] = useState<ReactNode>();
    const [icons  , setIcons] = useState<Icon[]>([]);
    const [dialogVisible , setDialogVisible] = useState<boolean>();
    const [dialogModal   , setDialogModal]   = useState<ReactNode>();
    const { showToastAlert } = useToast();

    async function resizing(image: string) {
        let resizedImageSrc = await new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx    = canvas.getContext('2d');
            canvas.width = 16;
            canvas.height = 16;

            const img = new Image();
            img.onload = () => {
                ctx?.drawImage(img , 0 , 0 , canvas.width , canvas.height);
                resolve(canvas.toDataURL()); // Resized image'ı resolve ile döndür
            }
            img.onerror = reject;
            img.src     = image; // bu img.onload'u tetikler
        })
        return resizedImageSrc;
    }

    function handleIconClickBinder(rowData: Icon) {
        setDialogVisible(true);
        setDialogModal(<DialogModal handleResize={async (resize) => (await handleIconClick(rowData , resize))}/>)
    }

    const handleIconClick = async (rowData: Icon , resize: boolean) => {
        setDialogVisible(false);
        if(resize && rowData.image){
            const resizedImage: string = (await resizing(rowData.image) as string);
            const updatedImages = icons.map((icon) => {
                if(icon.id === rowData.id){
                    return {...icon , image: resizedImage , resized: !icon.resized}
                }
                return icon;
            })
            setIcons(updatedImages);
        }
        setDialogModal(null);
    }

    const deleteElement = (rowData: Icon) => {
        const updatedIcons = icons.filter(i => i.id !== rowData.id);
        setIcons(updatedIcons);
        showToastAlert(alertSeverity.success , "Deleted Successfully" , "Success"); 
    }

    const handleRowDoubleClick = (rowData: Icon) => {
        console.log("Double clicked row is:->->" , rowData);
        setModal(<IconModal iconmodal={modal} setModal={setModal} icons={icons} setIcons={setIcons} resizing={resizing} 
            browseName={rowData.browseName} id={rowData.id} image={rowData.image} systemName={rowData.systemName} resized={rowData.resized}/>);
    }

    return (
    <div>
      <div className="data-grid-header">
        <PageHeader pageTitle="Icons and Images" />
        <Button
            label="New icon"
            color={createButtonColor}
            className={globalStyles.createButton}
            onClick={() => {
                setModal(<IconModal iconmodal={modal} icons={icons} setIcons={setIcons} setModal={setModal} resizing={resizing}/>)
            }}
        />
      </div>
      <DataGrid columns={[{field: IconFields.id , headerName: IconHeaders.id , width:150} , 
        {field: IconFields.resized , headerName: IconFields.resized , width:150 , editable:false  , renderCell: (params) => params.row.resized ? <DoDisturbAltRoundedIcon/> : <div title="Resize it"><AspectRatioRoundedIcon onClick={() => handleIconClickBinder(params.row)}/></div>  },
        {field: IconFields.image , headerName: IconHeaders.image , width:150 , editable:false , renderCell:(params) => <img src={params.value} style={{maxHeight: '45px' , maxWidth: '45px' , textAlign: "center" }}/>  } , 
        {field: IconFields.name , headerName: IconHeaders.name , width:150 , editable:false} ,
        {field: IconFields.delete, headerName: IconHeaders.delete , width:50 , editable:false , renderCell:(params) => (<DeleteRoundedIcon onClick={() => deleteElement(params.row)}/>)}]} 
        rows={icons} toolbar={true} onRowDoubleClick={(rows) => handleRowDoubleClick(rows.row)}/>
        {modal}
        {dialogVisible && dialogModal}
    </div>
  )
}