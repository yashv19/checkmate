
import {
    Link,
    List,
    ListItem,
    Tooltip,
    Typography
  } from '@mui/material'
  import { NavLink } from 'react-router-dom'
  import IDB from '../Notes/store/dexie'
  import { useLiveQuery } from 'dexie-react-hooks'

const Sidebar = () => {

    const notes = useLiveQuery(async () => {
        const notesList = await IDB.getAllNotes();
        if (notesList.length > 0) {
            return notesList.sort((a,b) => a.createdAt = b.createdAt);
        }
        return [];
    })

    return (
        <div style={{
            width: "20rem",
            display: "flex",
            flexDirection: "column",
        }}>
        <Typography variant='h5' sx={{fontWeight: "bold"}}>☑️ Check Mate</Typography>
        <Link to='/' component={NavLink}>
          Todo
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
    )
}

export default Sidebar;