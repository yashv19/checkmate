import classes from './ItemContainer.module.css';
import { Box } from "@mui/system";
import ActionButton from "../base_components/ActionButton";
import {
    ModeEditOutlineRounded,
    DeleteRounded,
    DragIndicatorRounded,
}
    from "@mui/icons-material";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

const ItemContainer = props => {

    const [showHover, setShowHover] = useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef
    } = useSortable({ id: props.id });

    let sx = {
        cursor: 'default',
        m: 0,
        borderRadius: '0.5rem',
        transform: CSS.Transform.toString(transform),
        transition,
    }
    if (showHover) {
        sx = {
            ...sx,
            backgroundColor: 'rgba(240, 240, 240);',
        }
    }



    const mouseEnterHandler = () => {
        setShowHover(true);
    }
    const mouseLeaveHandler = () => {
        setShowHover(false);
    }



    return (
        <Box
            className={classes.liclass}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            sx={sx}
            ref={setNodeRef}
            {...attributes}
        >
            {props.children}
            {showHover && <div className={classes.liright}>
                <ActionButton
                    sx={{ backgroundColor: "rgb(0, 128, 255)" }}
                    onClick={props.onEdit}
                >
                    <ModeEditOutlineRounded sx={{ width: "1rem", height: "1rem" }} />
                </ActionButton>
                <ActionButton sx={{ backgroundColor: "rgb(255, 90, 90)" }} onClick={props.onDelete}>
                    <DeleteRounded sx={{ width: "1rem", height: "1rem" }} />
                </ActionButton>
                <ActionButton ref={setActivatorNodeRef} {...listeners}>
                    <DragIndicatorRounded sx={{ color: "gray" }} />
                </ActionButton>
            </div>}
        </Box>
    );
}

export default ItemContainer;