'use client'
import { TabPanel } from '@ims/component-library'
import React, { useState } from 'react'
import Endpoints from './(components)/Endpoints'
import ActionPool from './(components)/ActionPool'
import { DummyActions } from './(components)/DummyActions'

export default function Page() {
    const [actions, setActions] = useState<Action[]>(DummyActions);
  return (
    <>
        <TabPanel tabs={[{label:"Endpoints" , renders:<Endpoints actions={actions} setActions={setActions}/>} , {label:"Action pool" , renders:<ActionPool actions={actions} setActions={setActions} />}]}/>
    </>
  )
}
