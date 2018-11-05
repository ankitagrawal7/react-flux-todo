import { Dispatcher } from 'flux';

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(payload) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: payload
  });
}

export default AppDispatcher;