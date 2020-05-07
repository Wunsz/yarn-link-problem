import React from 'react';
import logo from './logo.svg';
import './App.css';

import ExampleComponent from 'react-lib';

import * as MUICore from '@material-ui/core';

// @ts-ignore
document.appMuiCore = MUICore;

function App() {
  return (
    <div className="App">
      <ExampleComponent/>
    </div>
  );
}

export default App;
