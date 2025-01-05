import {
  Divider,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography
} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import IDB from '../Notes/store/dexie'
import { useLiveQuery } from 'dexie-react-hooks'
import classes from './Sidebar.module.css'
import logo from '../../assets/long-logo.png'
import TextButton from '../base_components/TextButton'

const Sidebar = () => {
  const navigate = useNavigate()

  const notes = useLiveQuery(async () => {
    const notesList = await IDB.getAllNotes()
    if (notesList.length > 0) {
      return notesList.sort((a, b) => (a.createdAt - b.createdAt))
    }
    return []
  })

  //New note
  const newNoteHandler = async () => {
    const newID = crypto.randomUUID()
    try {
      await IDB.createNewNote({
        id: newID,
        createdAt: Date.now(),
        title: 'Untitled',
        content: ''
      })
      navigate(`/notes/${newID}`)
    } catch (err) {
      console.log(`Failed to create new note. ${err}`)
    }
  }

  return (
    <div className={classes.sidebar}>
      {/* <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        ☑️ Check Mate
      </Typography> */}
      <img src={logo} draggable={false} />
      <div className={classes.verticalSpacer} />
      <NavLink
        to='/'
        className={({ isActive }) =>
          isActive ? `${classes.todo} ${classes.todoActive}` : classes.todo
        }
      >
        ✅ Todo
      </NavLink>
      <Divider sx={{ py: '1rem' }} />
      <Typography
        variant='subtitle2'
        sx={{ pt: '1rem', fontWeight: 'bold', color: '#022c87' }}
      >
        Notes
      </Typography>
      <TextButton
        sx={{
          backgroundColor: '#0046df20',
          textTransform: 'none',
          height: 'auto',
          p: '0.3rem',
          my: '0.3rem',
          color: 'black',
          fontWeight: 'bold'
        }}
        onClick={newNoteHandler}
      >
        ✍️ New Note
      </TextButton>
      {notes && (
        <List sx={{ pt: 0, pb: "1rem", overflowY: "auto" }}>
          {notes.toReversed().map(note => {
            return (
              <ListItem key={note.id} sx={{ p: '0.2rem' }}>
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
