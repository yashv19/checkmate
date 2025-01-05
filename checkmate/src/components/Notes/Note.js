import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, Menu, MenuItem } from '@mui/material'
import { DeleteRounded, Menu as MenuButton, MoreVertRounded } from '@mui/icons-material'
import React, { useEffect, useRef } from 'react'
import ActionButton from '../base_components/ActionButton'
import { getRandomPlaceholder } from '../../utils'
import IDB from './store/dexie'
import TextButton from '../base_components/TextButton'
import { useNavigate } from 'react-router-dom'

const Note = ({ id }) => {
  const [note, setNote] = useState()
  const autoSaveTimerRef = useRef()
  const navigate = useNavigate();

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
      navigate('/')
    } catch (err) {
      console.error(`Failed to delete. ${err}`)
    }
  }

  //Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const menuOpenHandler = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const menuCloseHandler = () => {
    setAnchorEl(null);
  }

  //Delete alert dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setAnchorEl(null);
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
          <IconButton
            onClick={menuOpenHandler}
          >
            <MoreVertRounded />
          </IconButton>
          <Menu
            id="note_3_dot_menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={menuCloseHandler}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            elevation={1}
          >
            <MenuItem onClick={handleDeleteDialogOpen}>🗑️ Delete</MenuItem>
          </Menu>
          <Dialog
            id="delete_note_confirm_dialog"
            open={deleteDialogOpen}
            onClose={handleDeleteDialogClose}
            maxWidth="xs"
            fullWidth
            sx={{borderRadius: "12px"}}
          >
            <DialogTitle>🗑️ Delete this note?</DialogTitle>
            <DialogContent>This action can't be undone.</DialogContent>
            <DialogActions sx={{p: "1rem"}}>
              <TextButton onClick={deleteHandler} sx={{mx: "0.5rem", p: "1rem",}}>Delete</TextButton>
              <TextButton onClick={handleDeleteDialogClose} sx={{mx: "0.5rem", p: "1rem"}}>Cancel</TextButton>
            </DialogActions>
          </Dialog>
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
          placeholder={getRandomPlaceholder()}
        />
      )}
    </Box>
  )
}

export default Note
