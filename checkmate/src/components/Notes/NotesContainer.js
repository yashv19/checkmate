import React, { useState } from 'react'
import Note from './Note'
import { Tabs, Tab, Box, Button } from '@mui/material'
import TabPanel from '../UI/TabPanel'
import classes from './NotesContainer.module.css';

const notes = [
    {
        id: 0,
        title: "Note 0",
        content: "Note 0 content",
    },
    {
        id: 1,
        title: "Note 1",
        content: "Note 1 content"
    },
    {
        id: 2,
        title: "Note 2",
        content: "Note 2 content"
    },
    {
        id: 3,
        title: "Note 3",
        content: "Note 3 content"
    },
    {
        id: 4,
        title: "Note 4",
        content: "Note 4 content"
    },
]

const NotesContainer = () => {

    const [value, setValue] = useState(0);

    const tabChangeHandler = (e, newValue) => {
        setValue(newValue);
    }

    const newNoteHandler = () => {
        const newIndex = notes.length;
        notes.push(
            {
                id: newIndex,
                title: `note ${newIndex}`,
                content: `note ${newIndex} content`
            }
        )
    }

    return (
        <Box className={classes.tabContainer}>
            <div style={{ width: "25%", minWidth: "8rem", height: "100%", display: "flex", flexDirection: "column"}}>
                <Button onClick={newNoteHandler}>➕ New note</Button>
                <Tabs
                    onChange={tabChangeHandler}
                    value={value}
                    orientation='vertical'
                    variant="scrollable"
                    scrollButtons={false}
                >
                    {notes.map((note) => {
                        return (
                            <Tab
                                key={note.id}
                                label={note.title}
                                sx={{
                                    textAlign: "start",
                                    width: "100%",
                                    alignItems: "start",
                                    textTransform: "none",
                                }}
                            />
                        )
                    })}
                </Tabs>
            </div>
            {notes.map(note => {
                return (
                    <TabPanel key={note.id} value={value} index={note.id}>
                        <Note>{note.content}</Note>
                    </TabPanel>
                )
            })}
        </Box>
    )
}

export default NotesContainer
