import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/Dispatcher';
const API_URL = 'http://localhost:5000/';

class Store extends EventEmitter {
    constructor(){
        super();
        this.todos = [];
        this.analytics = []
        this.fetchTodos();
        this.fetchCount();
    }

    fetchTodos(){        
        fetch(API_URL + 'get-todos')
        .then(res => res.json())
        .then(res => {
            this.todos = res;
            this.emit('change');
        });
    }

    fetchCount(){
        fetch(API_URL + 'get-count')
        .then(res => res.json())
        .then(res => {
            this.analytics = res;
            this.emit('change');
        });
    }

    getTodos(){
        return this.todos;
    }

    getAnalytics(){
        return this.analytics;
    }

    handleActions(dispatched){
        switch(dispatched.action.type){
            case "UPDATE_TODOS":            
                const data = dispatched.action.data;
                this.todos[data.index] = data.todo;
                fetch(API_URL + 'update-todo',{
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data.todo)
                  })
                .then(res => {return res.json()})
                .then(res => {
                    if(res.success){
                        this.fetchTodos();
                        this.fetchCount();
                    }
                });
                break;

            case "DELETE_TODO":
                const id = dispatched.action.data.id;
                fetch(API_URL + 'delete-todo/' + id)
                .then(res => {return res.json()})
                .then(res => {
                    if(res.success){
                        this.fetchTodos();
                        this.fetchCount();
                    }
                });
                break;

            case "ADD_TODO":
                const newTodo = dispatched.action.data;
                fetch(API_URL + 'add-todo',{
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTodo)
                  }).then(res => res.json())
                  .then(res => {
                    if(res.success){
                        this.fetchTodos();
                        this.fetchCount();
                    }
                  });
                break;

            default:
                break;
        }

        this.emit('change');
    }

}

const store = new Store();

AppDispatcher.register(store.handleActions.bind(store));

export default store;