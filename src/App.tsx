import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { mockItems } from "./mockData";
import DragDrop from "./DragDrop/DragDrop";

class App extends React.Component {
  public render() {
    return (
     
      <div className="container">
        <h3 className="text-center">Drag and Drop</h3>
      {
      mockItems.map((item, index) => (
        <DragDrop
          key={item.id}
          data={item}
          index = {index}
          isDragAllowed={true}
          isDropAllowed={true}
          sourceDragTooltip="Move"
          destionationDropTootip="to"
          tooltipProperty="TaskName"
          onDrop={(s,d) => console.log(s, d)}
        >
          { item['TaskName']}
        </DragDrop>
      ))
    }
  </div>
    );
  }
}

export default App;
