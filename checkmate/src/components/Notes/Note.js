import { Box } from '@mui/material'
import React from 'react'

const Note = () => {
  return (
    <Box
        contentEditable
        sx={{
            width: "100%",
            minHeight: "30rem",
            padding: "1rem",
            boxSizing: "border-box",
            hyphens: "auto",
            outline: "none"
        }}
    />
  )
}

export default Note
