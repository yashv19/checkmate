import { Divider, Link, List, ListItem, Tooltip, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
import IDB from '../Notes/store/dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import classes from './Sidebar.module.css';
import logo from '../../assets/long-logo.png';

const Sidebar = () => {
  const notes = useLiveQuery(async () => {
    const notesList = await IDB.getAllNotes()
    if (notesList.length > 0) {
      return notesList.sort((a, b) => (a.createdAt = b.createdAt))
    }
    return []
  })

  return (
    <div
      className={classes.sidebar}
    >
      {/* <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        ☑️ Check Mate
      </Typography> */}
      <img src={logo} draggable={false}/>
      <div className={classes.verticalSpacer} />
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive ? `${classes.todo} ${classes.todoActive}` : classes.todo
        }
      >
        ✅ Todo
      </NavLink>
      <Divider sx={{py: "1rem"}}/>
      <Typography variant='subtitle2' sx={{pt: '1rem', fontWeight: 'bold', color: '#022c87'}}>Notes</Typography>
      {notes && (
        <List sx={{py: 0}}>
          {notes.toReversed().map(note => {
            return (
              <ListItem key={note.id} sx={{ p: "0.2rem" }}>
                <NavLink
                  to={`/notes/${note.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.noteLink} ${classes.noteLinkActive}`
                      : classes.noteLink
                  }
                >
                  {note.title}
                </NavLink>
              </ListItem>
            )
          })}
        </List>
      )}
    </div>
  )
}

export default Sidebar
