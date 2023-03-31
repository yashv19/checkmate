
const getList = () => {
    const list = localStorage.getItem('todos');
    if (list === null) {
        return [];
    }
    return JSON.parse(list)
}

const addItem = (obj) => {
    const list = getList();
    list.push(obj);
    const stringList = JSON.stringify(list);
    localStorage.setItem('todos', stringList);
}

const updateItem = (obj) => {
    const list = getList();
    const itemToUpdateIndex = list.findIndex(item => item.id === obj.id);
    list[itemToUpdateIndex] = obj;
    localStorage.setItem('todos', JSON.stringify(list));
}

const deleteItem = payload => {
    const list = getList();
    const filteredItems = list.filter(todo => todo.id !== payload.id);
    localStorage.setItem('todos', JSON.stringify(filteredItems));
}

const clearCompletedItems = () => {
    const list = getList();
    const filteredItems = list.filter(todo => !todo.checked);
    localStorage.setItem('todos', JSON.stringify(filteredItems));
}

const dragReorder = (payload) => {
    const list = getList();
    const { oldIndex, newIndex } = payload;
    const splicedArr = list.splice(oldIndex, 1);
    list.splice(newIndex, -1, splicedArr[0]);
    localStorage.setItem('todos', JSON.stringify(list));
}

const storageAPI = {
    get: getList,
    add: addItem,
    update: updateItem,
    delete: deleteItem,
    clearCompleted: clearCompletedItems,
    dragReorder,
};

export default storageAPI;