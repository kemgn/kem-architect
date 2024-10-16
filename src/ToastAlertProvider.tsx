'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { alertSeverity, alertVariant } from './models/Enums/Enums';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides, AlertPropsVariantOverrides} from '@mui/material/Alert';
import styles from './toastAlert.module.css';
import { createContext , useContext , useState , ReactNode} from "react";

export interface ToastAlertMessageFormat {
    severity:   alertSeverity;
    content:    string;
    title:      string;  
}

const vertical          = 'bottom';
const horizontal        = 'right';
const variant           = 'standard';
const alertWidth        = '100%';
const closeReason       = 'clickaway';
const alertContainer    = 'alertContainer';
const emptystring       = '';

interface ToastContextProps {
    showToastAlert: (severity:alertSeverity , content:string , title:string) => void;
}

const ToasAlertContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
    const context = useContext(ToasAlertContext);
    if(!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export interface ToastAlertProps extends ToastAlertMessageFormat{
    open?:        boolean;       
    variant?:    alertVariant;
}

export default function ToastAlertProvider({children}: {children: ReactNode}) {
const [toast, setToast] = useState<ToastAlertProps>({
    open: false,
    content: emptystring,
    severity: alertSeverity.info,
    title: emptystring
});

  const showToastAlert = (severity:alertSeverity , content:string , title:string ) => {
      setToast({
        open:true , content , title , severity
      });
      setTimeout(() => setToast({
        open:false , severity: alertSeverity.info , content: emptystring , title: emptystring
      }), 3000)
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === closeReason) {
      return;
    }

    setToast({
        open:false , severity: alertSeverity.info , content: emptystring , title: emptystring 
    })
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        // sx={{position: 'relative' , top: '20px'}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function getAlertSeverity (severityLevel: alertSeverity) {
        const severity:OverridableStringUnion<AlertColor, AlertPropsColorOverrides> = severityLevel;
        return severity;
  }

  function getAlertVariant (variantType: alertVariant) {
    const variant:OverridableStringUnion<"standard" | "filled" | "outlined", AlertPropsVariantOverrides> | undefined = variantType;
    return variant;
  }

  return (
    <ToasAlertContext.Provider value={{showToastAlert: showToastAlert}}>
        {children}
    <div>
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        // message="Note archived"
        anchorOrigin={{ vertical , horizontal}}  
        // className={styles.snackbar}       
      >
                <Alert severity={toast.severity && getAlertSeverity(toast.severity)} variant={toast.variant ? getAlertVariant(toast.variant) : variant} 
                 action={action} className={styles.alertContainer} >
                    <AlertTitle className={styles.alertTitle}>{toast.title}</AlertTitle>
                        {toast.content}
                </Alert>

      </Snackbar>
    </div>
    </ToasAlertContext.Provider>
  );
}