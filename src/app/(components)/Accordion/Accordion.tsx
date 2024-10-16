import React from 'react';
import styles from './accordion.module.css';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
interface PropsAccordion {
    uniqueKey?: string;
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    ariaLabel?: string;
    content?: React.ReactElement;
    id: string;
}

export default function Accordion(props: PropsAccordion) {
    return (
        <div className={styles.accordion}>
            <input type='checkbox' id={props.id} className={styles.accordionInput}></input>
            <label htmlFor={props.id} className={styles.accordionLabel}>
                <div className={styles.accordionTitleContainer}>
                    <span className={styles.iconContainer}>
                        <i className={styles.icon}>{props.icon && props.icon}</i></span>
                    {props.title}
                    <div className={styles.arrowUpIcon}>
                        <KeyboardArrowUpRoundedIcon />
                    </div>
                    <div className={styles.arrowDownIcon}>
                        <KeyboardArrowDownRoundedIcon />
                    </div>
                </div>
            </label>
            <div className={styles.accordionContent}>
                {props.content}
            </div>
        </div>
    );
}

// style={{display: props.expanded ? "block" :"none"}}
