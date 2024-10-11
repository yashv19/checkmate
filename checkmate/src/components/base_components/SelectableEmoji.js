import { Box, Popper } from '@mui/material'
import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const SelectableEmoji = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [emojiCode, setEmojiCode] = useState("card_index_dividers") //Unified code for card index divider emoji


    const newEmojiSelectHandler = (emojiData) => {
        // console.log(emojiData);
        console.log(`emoji select handler fired`)
        setEmojiCode(emojiData.id);
        setAnchorEl(null);
        setShowPicker(false);
    }

    const emojiClickHandler = (event) => {
        setShowPicker((prevState) => !prevState);
        setAnchorEl(event.currentTarget)
    }

    return (
        <>
            <Box
                sx={{
                    p: "0.6rem",
                    borderRadius: '0.5rem',
                    "&:hover": {
                        boxShadow: "0 0 0.5rem 0.1rem rgba(96, 96, 96, 0.269)",
                    },
                    "&:modal": {
                        boxShadow: "0 0 0.5rem 0.1rem rgba(96, 96, 96, 0.269)",
                    }
                }}
                onClick={emojiClickHandler}
            >
                <em-emoji
                    id={emojiCode}
                    size="1.5rem"
                />
            </Box>
                <Popper
                    open={showPicker}
                    anchorEl={anchorEl}
                    position="bottom-start"
                >
                    <Picker
                        data={data}
                        onEmojiSelect={newEmojiSelectHandler}
                        theme="light"
                        skinTonePosition="none"
                    />
                </Popper>
        </>
    )
}

export default SelectableEmoji
