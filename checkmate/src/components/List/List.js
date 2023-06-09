// import { useState } from 'react';
import ListItem from './ListItem';
import { useDispatch, useSelector } from 'react-redux';
import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { storeActions } from '../../store';

let renderedList;

const List = props => {
    const dispatch = useDispatch();
    let todos = useSelector(state => state.todos);
    todos = todos.filter(todo => !todo.checked)

    const onDragEnd = (e) => {
        const { active, over } = e;
        if (active.id !== over.id) {
            const oldIndex = todos.findIndex(todo => todo.id === active.id);
            const newIndex = todos.findIndex(todo => todo.id === over.id);
            dispatch(storeActions.dragReorder({
                oldIndex,
                newIndex
            }));
        }
    }

    renderedList = todos.slice(0).reverse().map(item => {
        return <ListItem item={item} key={item.id} />
    });
    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={todos} strategy={verticalListSortingStrategy}>
                {renderedList}
            </SortableContext>
        </DndContext>
    )
}

export default List;