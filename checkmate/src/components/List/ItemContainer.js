import classes from './ItemContainer.module.css'
import {
  ModeEditOutlineRounded,
  DeleteRounded,
  DragIndicatorRounded
} from '@mui/icons-material'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { Box, IconButton } from '@mui/material'

const ItemContainer = props => {
  const [showHover, setShowHover] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id: props.id })

  let sx = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    m: 0,
    borderRadius: '0.5rem',
    transform: CSS.Transform.toString(transform),
    transition,
    '&:hover': {
      backgroundColor: 'rgba(240, 240, 240);'
    }
  }

  const mouseEnterHandler = () => {
    setShowHover(true)
  }
  const mouseLeaveHandler = () => {
    setShowHover(false)
  }

  return (
    <Box
      className={classes.liclass}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      sx={sx}
      ref={setNodeRef}
      {...attributes}
    >
      {props.children}
      {showHover && (
        <div className={classes.liright}>
          <IconButton
            sx={{ backgroundColor: 'rgb(0, 128, 255)', color: '#fff' }}
            onClick={props.onEdit}
          >
            <ModeEditOutlineRounded sx={{ width: '1rem', height: '1rem' }} />
          </IconButton>
          <IconButton
            sx={{ backgroundColor: 'rgb(255, 90, 90)', color: '#fff' }}
            onClick={props.onDelete}
          >
            <DeleteRounded sx={{ width: '1rem', height: '1rem' }} />
          </IconButton>
          <IconButton ref={setActivatorNodeRef} {...listeners}>
            <DragIndicatorRounded sx={{ color: 'gray' }} />
          </IconButton>
        </div>
      )}
    </Box>
  )
}

export default ItemContainer
