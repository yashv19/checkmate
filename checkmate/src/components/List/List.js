// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { storeActions } from './store/listSlice';
import TodoListItem from './TodoListItem';
import ListSectionHeader from './ListSectionHeader';

let renderedList;

const List = props => {
    const dispatch = useDispatch();
    let todos = useSelector(state => state.todos);
    
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
         if (item.type === 'section_header') {
            return <ListSectionHeader item={item} key={item.id} />
         }
         return <TodoListItem item={item} key={item.id} />
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