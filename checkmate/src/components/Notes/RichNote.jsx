import { useEditor, EditorContent } from '@tiptap/react'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import HardBreak from '@tiptap/extension-hard-break'
import CodeBlock from '@tiptap/extension-code-block'
import DropCursor from '@tiptap/extension-dropcursor'
import History from '@tiptap/extension-history'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Italic from '@tiptap/extension-italic'
import Placeholder from '@tiptap/extension-placeholder'
import { useState } from 'react'
import { Box, Divider, Input } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import IDB from './store/dexie'
import { useNavigate } from 'react-router-dom'
import NoteMenu from './NoteMenu'
import classes from './RichNote.module.css'

const extensions = [
  Document,
  Text,
  Paragraph,
  HardBreak,
  ListItem,
  OrderedList,
  BulletList,
  Bold,
  Code.configure({
    HTMLAttributes: {
      class: `${classes.code}`
    }
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: `${classes.codeblock}`
    }
  }),
  Italic,
  Heading.configure({
    levels: [1],
    HTMLAttributes: {
      class: `${classes.heading}`
    }
  }),
  History,
  DropCursor,
  Placeholder.configure({
    placeholder: 'Write something...'
  })
]

const RichNote = ({ id }) => {
  const [note, setNote] = useState()
  const [content, setContent] = useState()
  const autoSaveTimerRef = useRef()
  const navigate = useNavigate()

  const updateHandler = ({ editor }) => {
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
    onUpdate: updateHandler,
    autofocus: 'end'
  })

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
  }, [id, navigate, editor])

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
    try {
      await IDB.updateNote(latest)
    } catch (err) {
      console.error(`Failed to save updates. ${err}`)
    }
  }

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
      <EditorContent
        editor={editor}
        style={{ height: '100%', width: '100%' }}
      />
    </Box>
  )
}

export default RichNote
