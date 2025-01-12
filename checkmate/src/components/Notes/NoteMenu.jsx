import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { MoreVertRounded } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import IDB from './store/dexie'

const NoteMenu = ({ noteId }) => {
  const navigate = useNavigate()

  const deleteHandler = async () => {
    try {
      await IDB.deleteNote(noteId)
      navigate('/')
    } catch (err) {
      console.error(`Failed to delete. ${err}`)
    }
  }

  //Menu
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const menuOpenHandler = e => {
    setAnchorEl(e.currentTarget)
  }
  const menuCloseHandler = () => {
    setAnchorEl(null)
  }

  //Delete alert dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true)
  }

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={menuOpenHandler}>
        <MoreVertRounded />
      </IconButton>
      <Menu
        id='note_3_dot_menu'
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={menuCloseHandler}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        elevation={1}
      >
        <MenuItem disableRipple onClick={handleDeleteDialogOpen}>
          🗑️ Delete
        </MenuItem>
      </Menu>
      <Dialog
        id='delete_note_confirm_dialog'
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        maxWidth='xs'
        fullWidth
        sx={{ borderRadius: '12px' }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          🗑️ Delete this note?
        </DialogTitle>
        <DialogContent>This action can't be undone.</DialogContent>
        <DialogActions sx={{ p: '1rem' }}>
          <Button
            disableRipple
            onClick={deleteHandler}
            sx={{ mx: '0.5rem', p: '1rem' }}
          >
            Delete
          </Button>
          <Button
            disableRipple
            onClick={handleDeleteDialogClose}
            sx={{ mx: '0.5rem', p: '1rem' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NoteMenu
