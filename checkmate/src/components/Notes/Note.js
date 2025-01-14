import { useState } from 'react'
import { Box, Divider, Input,} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import IDB from './store/dexie'
import { useNavigate } from 'react-router-dom'
import NoteMenu from './NoteMenu'

const Note = ({ id }) => {
  const [note, setNote] = useState()
  const autoSaveTimerRef = useRef()
  const navigate = useNavigate();

  

  useEffect(() => {
    const load = async () => {
      try {
        const retrievedNote = await IDB.getNote(id)
        if(retrievedNote) {
          setNote(retrievedNote)
        }
        else {
          navigate('/404')
        }
      } catch (err) {
        console.log(err)
      }
    }
    
    load();
  }, [id, navigate]);

  const changeHandler = updatedNote => {
    setNote(prevNote => {
      return { ...prevNote, ...updatedNote }
    })

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      autoSave(updatedNote)
    }, 1000)
  }

  const autoSave = async updatedNote => {
    try {
      await IDB.updateNote(updatedNote)
    } catch (err) {
      console.error(`Failed to save updates. ${err}`)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {note && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: "1rem",
            px: "1rem",
          }}
        >
          <Input
            value={note.title}
            onChange={e => changeHandler({ ...note, title: e.target.value })}
            disableUnderline
            fullWidth
            placeholder='Untitled'
            sx={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
          />
          <NoteMenu noteId={id} />
        </Box>
      )}
      <Divider />

      {note && (
        <textarea
          style={{
            width: '100%',
            height: '100%',
            fontFamily: "-apple-system,'Roboto', sans-serif",
            fontSize: '1.1rem',
            lineHeight: '1.4',
            padding: "1rem",
            hyphens: 'auto',
            outline: 'none',
            resize: 'none',
            border: '0px',
            boxSizing: "border-box",
          }}
          value={note.content}
          onChange={e => {
            changeHandler({ ...note, content: e.target.value })
          }}
          autoFocus
          placeholder="Write something..."
        />
      )}
    </Box>
  )
}

export default Note
