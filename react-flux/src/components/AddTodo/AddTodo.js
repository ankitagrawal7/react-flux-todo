import React from 'react';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Actions from '../../actions/Actions';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

export default class AddTodo extends React.Component {
  state = {
    open: false,
    text: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAdd = () => {
    if(this.state.text !== ''){
      Actions.addTodo({text: this.state.text})
      this.setState({ open: false });
    }
  };

  _handleTextFieldChange = (e) => {
    this.setState({
        text: e.target.value
    });
  }

  render() {
    return (
      <div>          
        <Button variant="fab" color="primary" aria-label="Add" style={style} onClick={this.handleClickOpen}>
            <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter todo
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="todo"
              label="Todo"
              type="text"
              fullWidth
              onChange={this._handleTextFieldChange}
              required={true}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}