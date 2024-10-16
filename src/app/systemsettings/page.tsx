"use client";
import React from 'react'
import globalStyles from "@/app/(components)/_ComponentStyles/globalstyles.module.css";
import Systemsettings from './(components)/systemsettings';
export default function page() {


    return (
        <>
            <div className={globalStyles.container} >
                <div className={globalStyles.tableHeaderContainer}>
                    <div>                        
                        <Systemsettings/>
                    </div>

                </div>
            </div>
        </>
    )
}

