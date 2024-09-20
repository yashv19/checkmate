import { Box, Input } from '@mui/material'
import React, { } from 'react'

const Note = ({note, changeHandler, keyUpHandler, resetTimer}) => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                padding: "0.5rem",
            }}
        >
            <Input
                value={note.title}
                onChange={(e) => changeHandler({...note, title: e.target.value})}
                disableUnderline
                sx={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    paddingBottom: "1rem"
                }}
            />
            <textarea
                style={{
                    width: "100%",
                    height: "100%",
                    py: "1rem",
                    hyphens: "auto",
                    outline: "none",
                    resize: "none",
                    border: "0px",
                }}
                value={note.content}
                onChange={(e)=> {changeHandler({...note, content: e.target.value})}}
                onKeyUp={keyUpHandler}
                onKeyDown={resetTimer}
                autoFocus
            />
        </Box>
    )
}

export default Note
