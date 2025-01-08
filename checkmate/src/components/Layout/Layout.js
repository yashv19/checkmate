import {
  Box,
} from '@mui/material'
import classes from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {

  return (
    <Box className={classes.wrapper}>
      <Sidebar />
      <Outlet />
    </Box>
  )
}

export default Layout
