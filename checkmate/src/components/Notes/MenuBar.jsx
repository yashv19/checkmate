import {
  CodeRounded,
  DataObjectRounded,
  FormatBoldRounded,
  // FormatIndentDecreaseRounded,
  // FormatIndentIncreaseRounded,
  FormatItalicRounded,
  FormatListBulletedRounded,
  FormatListNumberedRounded,
  HMobiledata
  // RedoRounded,
  // UndoRounded
} from '@mui/icons-material'
import classes from './MenuBar.module.css'
import { IconButton, Tooltip } from '@mui/material'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  const buttonSx = {
    color: '#656565',
    padding: '1rem',
    boxSizing: 'border-box'
  }

  const activeButtonSx = {
    ...buttonSx,
    color: '#004FFF',
    backgroundColor: '#9cb6ee'
  }

  return (
    <div className={classes.menubarWrapper}>
      {/* <IconButton 
      className={editor.isActive('paragraph') ? classes.activeButton : classes.button}
      onClick={() => editor.chain().focus().setParagraph().run()}>
        <TitleRounded />
      </IconButton> */}
      <Tooltip title='Heading (#)'>
        <IconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          sx={
            editor.isActive('heading', { level: 1 }) ? activeButtonSx : buttonSx
          }
          disableRipple
        >
          <HMobiledata />
        </IconButton>
      </Tooltip>
      <Tooltip title='Bulleted list (-)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().chain().focus().toggleBulletList().run()}
          sx={editor.isActive('bulletList') ? activeButtonSx : buttonSx}
        >
          <FormatListBulletedRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title='Numbered list (1.)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          sx={editor.isActive('orderedList') ? activeButtonSx : buttonSx}
        >
          <FormatListNumberedRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title='Code block (```)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
          sx={editor.isActive('codeBlock') ? activeButtonSx : buttonSx}
        >
          <DataObjectRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title='Bold (**)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          sx={editor.isActive('bold') ? activeButtonSx : buttonSx}
        >
          <FormatBoldRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title='Italic (*)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          sx={editor.isActive('italic') ? activeButtonSx : buttonSx}
        >
          <FormatItalicRounded />
        </IconButton>
      </Tooltip>
      <Tooltip title='Code (`)'>
        <IconButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          sx={editor.isActive('code') ? activeButtonSx : buttonSx}
        >
          <CodeRounded />
        </IconButton>
      </Tooltip>
      {/* <IconButton
        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
        disabled={!editor.can().chain().focus().sinkListItem('listItem').run()}
        sx={buttonSx}
      >
        <FormatIndentIncreaseRounded />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
        disabled={!editor.can().chain().focus().liftListItem('listItem').run()}
        sx={buttonSx}
      >
        <FormatIndentDecreaseRounded />
      </IconButton> */}
      {/* <IconButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        sx={buttonSx}
      >
        <UndoRounded />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        sx={buttonSx}
      >
        <RedoRounded />
      </IconButton> */}
    </div>
  )
}

export default MenuBar
