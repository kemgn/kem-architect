import React, { useState } from 'react'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import { Button, TextInput, Toggle, Select } from '@ims/component-library';
import styles from './conditional.module.css'
export default function conditionalFormater() {
    const tableHeader = ["View", "Form", "Module"];
    const row = "CF";
    const [targetOpen, setTargetOpen] = useState(false);
    return (
        <>
            <div className={globalStyles.container}>
                <div className={styles.conditionalcontainer}>
                    <div className='viewLeftbar' >
                        <div className={styles.viewbarTableContainer}>
                            <Button label='Create' className='createbtn' onClick={() => console.log("createViewTableRow")}></Button>
                            <table className={styles.viewbartable}>
                                <thead>
                                    <tr>
                                        <th>Friendly Name</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableHeader.map((header, index) => {
                                        return (
                                            <>
                                                <tr className="section-header">
                                                    <td colSpan={2}>{header}</td>
                                                </tr>
                                                {tableHeader.map((rows, i) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{row}{i}</td>
                                                                <td className="checkmark">✔</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })}
                                            </>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='tabPanel'>
                        <div className={styles.cardContainer}>
                            <div>
                                <div className={styles.conditionCard}>
                                    {/*gri */}
                                    <h2><b>On what condition?</b></h2>
                                    <TextInput label='Condition' defaultValue={"Formula"} size='medium' />
                                    <Toggle id='defVal' label='Use default values (for missing values in formula)' />
                                </div>
                                <div className={styles.viewEnv}>
                                    {/*mavi */}
                                    <h2><b>What is the trigger?</b></h2>
                                    <header>View events</header>
                                    <Toggle id='viewCreate' label='View create' />
                                    <Toggle id='pageLoad' label='View page load (runs for each instance on page)' />
                                    <Toggle id='selectionChange' label='View selection change' />
                                    <Toggle id='updateInstance' label='Update instance' />
                                    <Toggle id='createInstance' label='Create instance' />
                                    <Toggle id='deleteInsatance' label='Delete instance' />
                                    <header>Form events</header>
                                    <Toggle id='formCencel' label='Form cancel' />
                                    <Toggle id='formClose' label='Form close' />
                                </div>
                            </div>
                            <div>
                                <div className={styles.actionCreate}>
                                    {/*sarı */}
                                    <h2><b>What to do?</b></h2>
                                    <Button label='Create axction' />
                                </div>
                                <div className={styles.newtargetCreate}>
                                    {/*kırmızı */}
                                    <h2><b>Whatshould it affect?</b></h2>
                                    <Button label='Create new target' color='inherit' onClick={() => setTargetOpen(!targetOpen)} />
                                    {
                                        targetOpen &&
                                        <>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Target type</th>
                                                        <th>Target name</th>
                                                        <th>Propagate to forms</th>
                                                        <th>Propagate to view</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Module property</td>
                                                        <td>Bool</td>
                                                        <td>✔</td>
                                                        <td>✔</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Module property</td>
                                                        <td>List</td>
                                                        <td>✔</td>
                                                        <td>✔</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <Select label="Message template" />
                                            <Select label="Message type" />
                                            <Select label="Message position" />
                                            <TextInput label='Width' type='number' size='medium' />
                                            <TextInput label='Height' type='number' size='medium' />
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
