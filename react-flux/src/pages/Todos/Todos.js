import React, {
    Component
} from 'react';
import './Todos.css';
import {
    List,
} from '@material-ui/core';
import Store from '../../stores/Store';
import * as Actions from '../../actions/Actions';
import AddTodo from '../../components/AddTodo/AddTodo';
import TodoItem from '../../components/TodoItem/TodoItem';

export default class Todos extends Component {

    constructor(){
        super();
        this.state = this.getAppState();
    }

    addTodo(text){
        Actions.addTodo({text, status : false});
    }

    getAppState() {
        return {
          todos: Store.getTodos()
        };
    }

    componentWillMount(){
        Store.on('change', this._onChange.bind(this));
    }

    componentWillUnmount(){
        Store.removeListener('change', this._onChange.bind(this))
    }

    _onChange() {
        this.setState(this.getAppState());
    }

    render() {
        return ( 
            <div className="root">
                <List>
                    {(this.state.todos).map((item, index) => {
                        if(this.props.type === 'all'){
                            return <TodoItem item={item} index={index} />
                        }else if(this.props.type === 'completed'){
                            if(item.status === 1) return <TodoItem item={item} index={index} />
                        }else if(this.props.type === 'incomplete'){
                            if(item.status === 0) return <TodoItem item={item} index={index} />
                        }
                    })}
                </List>
                <AddTodo></AddTodo>
            </div>
        );
    }
}