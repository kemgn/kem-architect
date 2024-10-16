import React, { useState } from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FileInput, FormFooter, TextInput, Toggle } from '@ims/component-library';
import './IconModal.css';
import {  Icon, IconModalI, iconAndModal } from '@/models/Entities/Icon';
import FormHeader from '@/app/(components)/Form/FormHeader/FormHeader';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
};

export default function IconModal(props: iconAndModal) {
    const [image , setImage]   = useState<string>("");
    const [resize , setResize] = useState<boolean>(false);
    const [systemNametmp , setSystemNametmp] = useState<string>();
    const [browseName , setBrowseName] = useState<string>("");
    const [updating   , setUpdating] = useState<boolean>(false);
    const [open, setOpen] = React.useState(true);

    const isUpdate = !!props?.image 

    const getFile = (value: string, nameval: string, updating:boolean) => {
        console.log(value , "->image value");
        setImage(value);
        const iconName = nameval.split(".")[0];
        setSystemNametmp(iconName);
        setBrowseName(nameval);
        setUpdating(updating);
    }

    const resizeImage = () => {
        const checked = (document.getElementById("resizeimage") as HTMLInputElement).checked;
        setResize(checked);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSystemNametmp(event.target.value)
    }

    const exitModal = () => {
        props.setModal(null);
    }

    function returnIcon(image: string , browseName: string , resize: boolean , id?: string) {
        const idTmp = id ? id : Date.now().toString();
        const newIcon: Icon = {
            id: idTmp,
            browseName: browseName,
            image: image,
            resized: resize,
            systemName: (document.getElementById('systemName') as HTMLInputElement).value,
        }  
        return newIcon; 
    }

    const createIcon = async (image:string , browseName: string) => {
        console.log("asdasdasdassd");
        const checked = (document.getElementById("resizeimage") as HTMLInputElement).checked;
        let imageObj = image;
        if(checked) {
            imageObj = (await props.resizing(image) as string);
        }
        const newIcon: Icon = returnIcon(imageObj, browseName , checked);
        props.setIcons([...props.icons , newIcon]);
        exitModal();
    }

    const updateIcon = async () => {
        const checked = (document.getElementById("resizeimage") as HTMLInputElement).checked;
        let imageObj = image ? image : props.image ;
        if(checked && !props.resized && !!imageObj){
            imageObj = (await props.resizing(imageObj) as string);
        }
        const browseNametmp = browseName ? browseName : props.browseName;
        const id = props.id;
        console.log('browseNametmp , imageObj' , browseNametmp , imageObj)
        if(!!imageObj && !!browseNametmp && !!id){ 
            const newIcon: Icon = returnIcon(imageObj , browseNametmp , checked , id);
            const updatedIcons = props.icons.map((icon) => {
                if(icon.id === id){
                    return newIcon;
                }
                return icon;
            })
            props.setIcons(updatedIcons);
            exitModal();
        }
    }

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={exitModal}
            >
                <Box sx={style}>
                    <FormHeader title={isUpdate ? "Update icon" : "Create icon"} variant="h5" />
                    <FileInput sx={{}} getFile={getFile} id='chosenimage' label='Browse' defaultValue={props?.browseName} />
                    <Typography>
                        <TextInput id='systemName' label={!systemNametmp ? "System Name" : ''} defaultValue={systemNametmp ?? props?.systemName} onChange={handleInputChange} disabled={false} name='systemName' type="string" sx={{ margin: "10px 10px 0 0", width: "100%" }} size="medium"></TextInput>
                        <Toggle disabled={props?.resized} id='resizeimage' label={"Resize image"} onChange={() => resizeImage()}></Toggle>
                        {(image || props.image) && <img src={!updating && props.image ? props.image : image} alt="Uploaded image" className='imgdynamic' style={{ width: resize ? '16px' : '', height: resize ? '16px' : '' }} />}
                    </Typography>
                  <hr className='form-hr' />
                  <FormFooter cancelOnClick={exitModal} saveOnClick={() => { !props?.image ? createIcon(image, browseName) : updateIcon() }} className='icons-footer' />
              </Box>
          </Modal>
      </>
  )
}