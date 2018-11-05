import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import Todos from './pages/Todos/Todos';
import Analytics from './pages/Analytics/Analytics';


class App extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="root">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Todos" />
              <Tab label="Pending" />
              <Tab label="Completed" />
              <Tab label="Analytics" />
          </Tabs>
        </AppBar>
        {value === 0 && <Todos type="all"></Todos>}
        {value === 1 && <Todos type="incomplete"></Todos>}
        {value === 2 && <Todos type="completed"></Todos>}
        {value === 3 && <Analytics type="analytics"></Analytics>}
      </div>
    );
  }

}

export default App;
