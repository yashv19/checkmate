import { useState } from 'react'
import { Box, Divider, Input } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import React, { useEffect, useRef } from 'react'
import ActionButton from '../base_components/ActionButton'
import { getRandomPlaceholder } from '../../utils'
import IDB from './store/dexie'

const Note = ({ id }) => {
  const [note, setNote] = useState()
  const autoSaveTimerRef = useRef()

  const load = async () => {
    try {
      const retrievedNote = await IDB.getNote(id)
      setNote(retrievedNote)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    load()
  }, [id])

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
    console.log(`Saving note: ${JSON.stringify(updatedNote)}`)
    try {
      await IDB.updateNote(updatedNote)
    } catch (err) {
      console.error(`Failed to save updates. ${err}`)
    }
  }

  const deleteHandler = async () => {
    try {
      await IDB.deleteNote(id)
      console.log(`Note successfully deleted.`)
    } catch (err) {
      console.error(`Failed to delete. ${err}`)
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
            sx={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
            }}
          />
          <ActionButton
            sx={{ backgroundColor: 'rgb(255, 90, 90)' }}
              onClick={() => deleteHandler}
          >
            <DeleteRounded sx={{ width: '1rem', height: '1rem' }} />
          </ActionButton>
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
            // paddingTop: '1rem',
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
          placeholder={getRandomPlaceholder()}
        />
      )}
    </Box>
  )
  // return (
  //     <Box
  //         sx={{
  //             width: "100%",
  //             height: "100%",
  //             display: "flex",
  //             flexDirection: "column",
  //             boxSizing: "border-box",
  //             padding: "0.5rem",
  //         }}
  //     >
  //         <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
  //             <Input
  //                 value={note.title}
  //                 onChange={(e) => changeHandler({...note, title: e.target.value})}
  //                 disableUnderline
  //                 fullWidth
  //                 sx={{
  //                     fontSize: "1.5rem",
  //                     fontWeight: "bold",
  //                 }}
  //             />
  //             <ActionButton sx={{ backgroundColor: "rgb(255, 90, 90)" }} onClick={() => deleteHandler(note.id)}>
  //                 <DeleteRounded sx={{ width: "1rem", height: "1rem" }} />
  //             </ActionButton>
  //         </Box>
  //         <Divider />
  //         <textarea
  //             style={{
  //                 width: "100%",
  //                 height: "100%",
  //                 fontFamily: "-apple-system,'Roboto', sans-serif",
  //                 fontSize: "1.1rem",
  //                 lineHeight: "1.4",
  //                 paddingTop: "1rem",
  //                 hyphens: "auto",
  //                 outline: "none",
  //                 resize: "none",
  //                 border: "0px",
  //             }}
  //             value={note.content}
  //             onChange={(e)=> {changeHandler({...note, content: e.target.value})}}
  //             autoFocus
  //             placeholder={getRandomPlaceholder()}
  //         />
  //     </Box>
  // )
}

export default Note
