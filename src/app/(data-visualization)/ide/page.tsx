"use client";
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import Head from 'next/head';
import { IDEContext, useIde } from '../../../../public/IDE/IDEContext';
import { Button } from '@ims/component-library';
import FormulaInput from '@/app/(components)/FormulaInput/FormulaInput';
export default function IDEPage() {
    const ideContext = useContext(IDEContext);

    let initIdeFn: Function = () => { };

    useEffect(() => {
        if (window?.initIdeFn) {
            initIdeFn = window.initIdeFn;
        }
    }, [])
    const { openIde } = useIde();

    return (
        <>
            <div className="flex justify-content-center align-items-center height-full" style={{ width: "300px" }}>
                <FormulaInput label="Fomula input" />
            </div>



            {/* <Button label="click" onClick={openIde}/> */}
            {/* <App BaseUrl='' SessionGUID=''/> */}
            {/* <Head>
                <script type="module" src="@/app/(components)/IDE/plugin.js">
                    import {initIdeFn, getCodeFn} from "/Areas/Architect/Scripts/ide/plugin.js";
                    window.initIdeFn    = initIdeFn;
                    window.getIdeCodeFn = getCodeFn;
                </script>
            </Head> */}

            {/* <div id="ims-ide">
                {
                    initIdeFn({ SessionGUID: "", BaseUrl: "https://localhost:7164/" })
                }
            </div> */}
            {/* <iframe title='ide' src='http://localhost:5174' style={{height: "100%", width: "100%"}}></iframe> */}
            {/* <IDE BaseUrl='' SessionGUID='' /> */}
        </>
    )
}

