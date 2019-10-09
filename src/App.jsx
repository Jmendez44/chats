import React from 'react';
import './App.css';
import Dashboard from './Dashboard.jsx';
import Store from './Store.jsx';


function App() {
  return (
    <div className="App">
      <Store >
        <Dashboard />
      </Store>
      
    </div>
  );
}

export default App;
