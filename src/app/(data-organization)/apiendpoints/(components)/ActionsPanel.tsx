import React, { SetStateAction, useEffect, useState } from 'react'
import { ActionsModal, SavedActionsModal } from './ActionsModal'
import { AutoComplete, Button, OptionType, TextInput, Toggle } from '@ims/component-library'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ActionsPanelFieldIds, ActionsPanelLabels, savedActionsPanelFieldIds, savedActionsPanelLabels } from './EPointDataTColFields';
import Radio from '@mui/material/Radio';
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Actions } from '@/models/Enums/Enums';
import localstyles from './ActionPanel.module.css';
import { Endpoint } from '@/models/Entities/Endpoint';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { loadingTrue, notLoading } from '../statics';

interface ActionsPanelProps {
    handleSubmitActions: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    actionType: Actions;
    actions: Action[];
    clickedRow: Endpoint;
    clickedRowHasAction: boolean;
}
const buttonType = 'submit';
const actionType = 'actionType';
const displayNone = "display-none";
const textInputLabel = "System name";
const size = "medium";
const autoCompleteClassname = "autoCompleteClassname";
const activeToggleLabel = "Active";

export default function ActionsPanel(props: ActionsPanelProps) {

    const [radio , setRadio] = useState(ActionsPanelLabels.createNewAction)
    const [buttonLoading , setButtonLoading] = useState(notLoading);

    const radioOnChangeFn = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        console.log("RADİO:" , value);
        setRadio(value);
    }

    const handleOnSaveClick = (event: React.FormEvent<HTMLFormElement>) => {
        setButtonLoading(loadingTrue);
        props.handleSubmitActions(event);
        setButtonLoading(notLoading);
    }
    
    const { apiActionID , apiEndpointID , id , isActive} =  
    props.actionType === Actions.Main ? props.clickedRow.Actions.main : 
    props.actionType === Actions.OnAfterSave ? props.clickedRow.Actions.onAfterSave : 
    props.clickedRow.Actions.onError;
    const actionSystemName = props.actions.find(a => a.id === apiActionID)?.systemName;

    const handleToggleChange = (event: React.SyntheticEvent<Element, Event>) => {       // yazılcak  (dinamik olarak aktifliğin toggle edildikçe dbde değişmesi)

    }

    const handleDeleteActionRelation = () => {      // actionun relationunu silme endpointi

    }


    return (
        <div>
             {
                !props.clickedRowHasAction ? 
                <Box sx={ActionsModal}>
                    <form onSubmit={handleOnSaveClick}>             
                        <Typography>
                            <div className={displayNone}> 
                                <TextInput id={actionType} defaultValue={props.actionType.toString()} name={actionType} />    
                            </div>
                            <RadioGroup onChange={radioOnChangeFn} defaultValue={ActionsPanelFieldIds.createNewAction}>
                                <FormControlLabel value={ActionsPanelFieldIds.createNewAction} control={<Radio />}
                                    label={ActionsPanelLabels.createNewAction} name={ActionsPanelFieldIds.createNewAction} />
                                <FormControlLabel value={ActionsPanelFieldIds.linkToExistingAction} control={<Radio />}
                                    label={ActionsPanelLabels.linkToExistingAction} name={ActionsPanelFieldIds.linkToExistingAction} />
                            </RadioGroup>
                            {radio === ActionsPanelFieldIds.linkToExistingAction ? 
                                <AutoComplete label={ActionsPanelLabels.selectAnAction} name={ActionsPanelFieldIds.selectAnAction}
                                    options={props.actions as unknown as OptionType[]} getOptionLabel={(option) => option.systemName} className={localstyles.autoCompleteClassname}/>
                                : <TextInput label={textInputLabel} size={size} name={ActionsPanelFieldIds.createNewActionTextField} id={ActionsPanelFieldIds.createNewActionTextField}/>
                            }
                            <div className={globalStyles.actionPanelsFooter}>  
                                <Toggle label={ActionsPanelLabels.active} id={ActionsPanelFieldIds.active} name={ActionsPanelFieldIds.active} />
                                <Button label={ActionsPanelLabels.save} type={buttonType} loading={buttonLoading}/>
                            </div>
                        </Typography>
                    </form>
                </Box>
                :
                <Box sx={SavedActionsModal}>
                    <div className={globalStyles.actionPanelsFooter}>
                        {actionSystemName}  
                        <DeleteOutlineOutlinedIcon onClick={handleDeleteActionRelation}/>
                    </div>
                    <div className={globalStyles.actionPanelsFooter}>
                          <Toggle label={savedActionsPanelLabels.active} id={savedActionsPanelFieldIds.active} name={savedActionsPanelFieldIds.active}
                            defaultChecked={isActive} onChange={(e) => handleToggleChange(e)}/>
                          <EditOutlinedIcon/>
                    </div>
                </Box> 
            }
            
        </div>
    )
}
