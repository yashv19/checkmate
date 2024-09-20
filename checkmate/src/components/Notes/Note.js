import { Box, Divider, Input } from '@mui/material'
import { DeleteRounded } from '@mui/icons-material'
import React, { } from 'react'
import ActionButton from '../base_components/ActionButton'

const Note = ({note, changeHandler, deleteHandler }) => {

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
            <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Input
                    value={note.title}
                    onChange={(e) => changeHandler({...note, title: e.target.value})}
                    disableUnderline
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                    }}
                />
                <ActionButton sx={{ backgroundColor: "rgb(255, 90, 90)" }} onClick={() => deleteHandler(note.id)}>
                    <DeleteRounded sx={{ width: "1rem", height: "1rem" }} />
                </ActionButton>
            </Box>
            <Divider />
            <textarea
                style={{
                    width: "100%",
                    height: "100%",
                    paddingTop: "1rem",
                    hyphens: "auto",
                    outline: "none",
                    resize: "none",
                    border: "0px",
                }}
                value={note.content}
                onChange={(e)=> {changeHandler({...note, content: e.target.value})}}
                autoFocus
            />
        </Box>
    )
}

export default Note
