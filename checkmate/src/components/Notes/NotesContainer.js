import React, { useEffect, useRef, useState } from 'react'
import Note from './Note'
import { Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import classes from './NotesContainer.module.css';
import IDB from './store/idb';
import Card from '../base_components/Card';

const NotesContainer = () => {
    const [notes, setNotes] = useState();
    const [activeNote, setActiveNote] = useState();
    const autoSaveTimerRef = useRef(null);

    const refresh = async () => {
        try {
            const retrievedNotes = await IDB.getAllNotes();
            if (retrievedNotes.length > 0) {
                retrievedNotes.sort((a, b) => a.createdAt - b.createdAt)
                setNotes(retrievedNotes);
                const latest = retrievedNotes[retrievedNotes.length - 1];
                setActiveNote(latest);
            }
            else {
                setNotes(null);
                setActiveNote(null);
            }
        }
        catch(err) {
            console.error(`Error refreshing data. ${err}`)
        }
    }

    useEffect(() => {
        refresh();
    }, []); //Load notes on component mount

    const noteSelectHandler = (newNote) => {
        console.log(newNote);
        setActiveNote(newNote);
    }

    const noteUpdateHandler = (updatedNote) => {
        setActiveNote((prevNote) => {
            return { ...prevNote, ...updatedNote }
        });

        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        autoSaveTimerRef.current = setTimeout(() => {
            autoSave(updatedNote);
        }, 1000);
    }

    const autoSave = async (updatedNote) => {
        console.log(`Saving note: ${JSON.stringify(updatedNote)}`)
        try {
            await IDB.updateNote(updatedNote);

            setNotes(prevNotes => {
                return prevNotes.map(note => {
                    return note.id === updatedNote.id ? updatedNote : note
                })
            })
        }
        catch (err) {
            console.error(`Failed to save updates. ${err}`)
        }
    }

    const newNoteHandler = async () => {

        const newID = crypto.randomUUID();
        try {
            await IDB.createNewNote({
                id: newID,
                createdAt: Date.now(),
                title: "Untitled",
                content: "",
            })
            refresh();
        }
        catch (err) {
            console.error(`Error creating new note. ${err}`)
        }
    }

    const deleteNoteHandler = async (id) => {
        try {
            await IDB.deleteNote(id);
            console.log(`Note successfully deleted.`)
            refresh();
        }
        catch(err) {
            console.error(`Failed to delete. ${err}`)
        }
    }


    return (
        <Card className={classes.tabContainer}>
            <div style={{ width: "25%", minWidth: "8rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <Button onClick={newNoteHandler}>➕ New note</Button>
                {notes &&
                    <List
                        sx={{
                            height: "100%",
                            overflow: "auto",
                            scrollbarWidth: "thin",
                            scrollbarColor: "#ddd transparent"
                        }}
                    >
                        {notes.toReversed().map((note) => {
                            return (
                                <ListItem
                                    disableGutters
                                    disablePadding
                                    key={note.id}
                                    sx={{
                                        width: "100%",
                                        my: "4px"
                                    }}
                                >
                                    <ListItemButton 
                                        disableRipple
                                        onClick={() => noteSelectHandler(note)} 
                                        sx={{py: 0, borderRadius: "0.5rem"}} 
                                        // className={activeNote.id === note.id ? classes.activeNote : ""}
                                        selected={activeNote.id === note.id}
                                    >
                                        <ListItemText primary={note.title} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>}
            </div>
            {activeNote && <Note note={activeNote} changeHandler={noteUpdateHandler} deleteHandler={deleteNoteHandler} />}
            {!notes &&
                <Typography
                    variant="h5"
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    📂 No Notes
                </Typography>
            }
        </Card>
    )
}

export default NotesContainer
