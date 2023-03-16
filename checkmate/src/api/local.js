
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

const deleteItem = key => {

}

const clearCompletedItems = () => {
    const list = getList();
    const filteredItems = list.filter(todo => !todo.checked);
    localStorage.setItem('todos', JSON.stringify(filteredItems));
}

const storageAPI = {
    get: getList,
    add: addItem,
    update: updateItem,
    delete: deleteItem,
    clearCompleted: clearCompletedItems
};

export default storageAPI;