import React, {
    Component
} from 'react';
import {
    ListItem,
    ListItemText,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Actions from '../../actions/Actions';

export default class TodoItem extends Component {

    handleToggle(item, index) {
        item.status = !item.status;
        Actions.updateTodos({todo: item, index});
    };

    deleteTodo(id){
        Actions.deleteTodo({id});
    }

    render(){
        return (
            <div>
                <ListItem key={this.props.item.id} role={undefined} dense button onClick={() => this.handleToggle(this.props.item, this.props.index)}>
                    <Checkbox
                        checked={this.props.item.status === 1}
                        tabIndex={-1}
                        disableRipple
                    />
                    <ListItemText primary={this.props.item.text} />
                    <ListItemSecondaryAction onClick={() => this.deleteTodo(this.props.item.id)}>
                        <IconButton aria-label="Comments">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </div>
        )
    }
}