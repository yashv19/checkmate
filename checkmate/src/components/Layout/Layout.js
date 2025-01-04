import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography
} from '@mui/material'
import classes from './Layout.module.css'
import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import IDB from '../Notes/store/dexie'
import Sidebar from './Sidebar'

const Layout = () => {
  // const [notes, setNotes] = useState()

  // const refresh = async () => {
  //   try {
  //     const notesList = await IDB.getAllNotes()
  //     if (notesList.length > 0) {
  //       notesList.sort((a, b) => a.createdAt - b.createdAt)
  //       setNotes(notesList)
  //     } else {
  //       setNotes(null)
  //     }
  //   } catch (err) {
  //     console.error(`Error refreshing data. ${err}`)
  //   }
  // }

  // useEffect(() => {
  //   refresh()
  // }, []) // Load once on mount

  return (
    <Box className={classes.wrapper}>
      <Sidebar />
      <Outlet />
    </Box>
  )
}

export default Layout
