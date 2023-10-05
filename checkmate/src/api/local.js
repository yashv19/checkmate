
const getTodos = () => {
    const list = localStorage.getItem('todos');
    if (list === null) {
        return [];
    }
    return JSON.parse(list)
}

const getCompleted = () => {
    const list = localStorage.getItem('completed');
    if (list === null) { return [] }
    return JSON.parse(list)
}

const addItem = (obj) => {
    const list = getTodos();
    list.push(obj);
    const stringList = JSON.stringify(list);
    localStorage.setItem('todos', stringList);
}

const updateItem = (obj) => {
    const list = getTodos();
    const itemToUpdateIndex = list.findIndex(item => item.id === obj.id);
    list[itemToUpdateIndex] = obj;
    localStorage.setItem('todos', JSON.stringify(list));
}

const completeItem = (obj) => {
    const list = getTodos();
    const completedList = getCompleted();
    const completedTodo = list.find(todo => todo.id === obj.id);
    deleteItem(obj);
    completedList.push(completedTodo);
    localStorage.setItem('completed', JSON.stringify(completedList));
}

const uncheckTodo = (obj) => {
    let list = getTodos();
    let completedList = getCompleted();
    completedList = completedList.filter(todo => todo.id !== obj.id);
    list.push(obj);
    localStorage.setItem('completed', JSON.stringify(completedList));
    localStorage.setItem('todos', JSON.stringify(list));
}

const deleteItem = payload => {
    const list = getTodos();
    const filteredItems = list.filter(todo => todo.id !== payload.id);
    localStorage.setItem('todos', JSON.stringify(filteredItems));
}

const clearCompleted = () => {
    localStorage.removeItem('completed');
}

const dragReorder = (payload) => {
    const list = getTodos();
    const { oldIndex, newIndex } = payload;
    const splicedArr = list.splice(oldIndex, 1);
    list.splice(newIndex, -1, splicedArr[0]);
    localStorage.setItem('todos', JSON.stringify(list));
}

const storageAPI = {
    getTodos,
    getCompleted,
    addItem,
    updateItem,
    completeItem,
    uncheckTodo,
    deleteItem,
    clearCompleted,
    dragReorder,
};

export default storageAPI;