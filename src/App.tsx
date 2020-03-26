import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { mockItems} from './mockData'; 
import DragDrop from './DragDrop/DragDrop';
require('./bootstrap.css');
class App extends React.Component {

  public render() {
  return (
    <div className="App">
      <header className="App-header">
        <DragDrop 
        data={mockItems} 
        isDragAllowed={true} 
        isDropAllowed={true } 
        onDrop = { (source, destination) => console.log('s-', source, ',d-', destination)}/> 
      </header>
    </div>
  );
}
}

export default App;
