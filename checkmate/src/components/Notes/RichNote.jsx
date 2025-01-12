import {
  useEditor,
  EditorContent
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react'
import { Box, Divider, Input } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import IDB from './store/dexie'
import { useNavigate } from 'react-router-dom'
import NoteMenu from './NoteMenu'

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Write something...'
  })
]

const RichNote = ({ id }) => {
  const [note, setNote] = useState()
  const autoSaveTimerRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const retrievedNote = await IDB.getNote(id)
        if (retrievedNote) {
          setNote(retrievedNote)
          setContent(retrievedNote.content)
          editor.commands.setContent(retrievedNote.content)
        } else {
          navigate('/404')
        }
      } catch (err) {
        console.log(err)
      }
    }

    load()
  }, [id, navigate])

  const changeHandler = updatedNote => {
    setNote(prevNote => {
      return { ...prevNote, ...updatedNote }
    })

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      autoSave()
    }, 1000)
  }

  const autoSave = async () => {
    const latest = {
      ...note,
      content: content
    }
    console.log(latest)
    try {
      await IDB.updateNote(latest)
    } catch (err) {
      console.error(`Failed to save updates. ${err}`)
    }
  }

  //Rich text editor
  const [content, setContent] = useState()

  const updateHandler = ({ editor }) => {
    console.log(editor.getHTML())
    setContent(editor.getHTML())

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    autoSaveTimerRef.current = setTimeout(() => {
      autoSave()
    }, 1000)
  }

  const editor = useEditor({
    extensions: extensions,
    onUpdate: updateHandler
  })

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}
    >
      {note && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: '1rem',
            px: '1rem'
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
              fontWeight: 'bold'
            }}
          />
          <NoteMenu noteId={id} />
        </Box>
      )}
      <Divider />
      <EditorContent editor={editor} />
      {/* <EditorProvider
        extensions={extensions}
        style={{
          width: '100%',
          height: '100%',
          fontFamily: "-apple-system,'Roboto', sans-serif",
          fontSize: '1.1rem',
          lineHeight: '1.4',
          padding: '1rem',
          hyphens: 'auto',
          outline: 'none',
          resize: 'none',
          border: '0px',
          boxSizing: 'border-box'
        }}
        autoFocus={true}
      >
      </EditorProvider> */}
    </Box>
  )

  // return (
  //     <EditorProvider extensions={extensions} content={content}>
  //         <Editor>

  //         </Editor>
  //         <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
  //         <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
  //     </EditorProvider>
  // )
}

export default RichNote
