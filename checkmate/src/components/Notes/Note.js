import React from 'react'

const Note = (props) => {
  return (
    <textarea
        style={{
            width: "75%",
            height: "100%",
            padding: "1rem",
            boxSizing: "border-box",
            hyphens: "auto",
            outline: "none",
            resize: "none",
            border: "0px",
        }}
    >
        {props.children}
    </textarea>
  )
}

export default Note
