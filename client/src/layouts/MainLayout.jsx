import React, { useState } from 'react'
import AAppBar from '../components/AAppBar'
import MenuDrawer from '../components/MenuDrawer'

const MainLayout = ({children}) => {
    const [open, setOpen]=useState(false);
  return (
    <div>
      <AAppBar onMenuClick={()=>{setOpen(true)}}/>
      <MenuDrawer open={open} onClose={()=>{setOpen(false)}}/>
      <main style={{ padding: '16px', paddingBottom:'0px' }}>
        {children}
      </main>
    </div>
  )
}

export default MainLayout
