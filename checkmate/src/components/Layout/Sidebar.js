import {
  Link,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography
} from '@mui/material'
import classes from './Sidebar.module.css'
import { useEffect, useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import IDB from '../Notes/store/idb'

const Sidebar = () => {
  const [notes, setNotes] = useState()

  const refresh = async () => {
    try {
      const notesList = await IDB.getAllNotes()
      if (notesList.length > 0) {
        notesList.sort((a, b) => a.createdAt - b.createdAt)
        setNotes(notesList)
      } else {
        setNotes(null)
      }
    } catch (err) {
      console.error(`Error refreshing data. ${err}`)
    }
  }

  useEffect(() => {
    refresh()
  }, []) // Load once on mount

  return (
    <div className={classes.wrapper}>
      <div className={classes.sidebar}>
        <Typography variant='h4'>☑️ Check Mate</Typography>
        <Link to='/' component={NavLink}>
          Todo
        </Link>
        <Link to='/notes' component={NavLink}>
          Notepad
        </Link>
        <Typography>Notes</Typography>
        {notes && (
          <List>
            {notes.toReversed().map(note => {
              return (
                <ListItem
                  key={note.id}
                >
                  <Link to={`/notes/${note.id}`} component={NavLink}>
                    <Typography>{note.title}</Typography>
                  </Link>
                </ListItem>
              )
            })}
          </List>
        )}
      </div>
      <Outlet />
    </div>
  )
}

export default Sidebar
