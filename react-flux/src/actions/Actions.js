import dispatcher from '../dispatchers/Dispatcher';

export function addTodo(data) {
    const payload = {
        type: "ADD_TODO",
        data: data
    }
    dispatcher.handleViewAction(payload);
}

export function updateTodos(data) {
    const payload = {
        type: "UPDATE_TODOS",
        data: data
    }
    dispatcher.handleViewAction(payload);
}

export function deleteTodo(data) {
    const payload = {
        type: "DELETE_TODO",
        data: data
    }
    dispatcher.handleViewAction(payload);
}