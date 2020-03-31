import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { mockItems, mockColumns } from "./mockData";
import DragDrop from "./DragDrop/DragDrop";

class App extends React.Component {
  public render() {
    return (
      <table className="container">
        <thead>
      <tr className="gridRow">
        {
          mockColumns.map((col) => (
          <th key={col.name} className="gridCell">{col.name}</th>
          ))
        }
        </tr>
        
      </thead>
      
      <tbody>
          {
              mockItems.map((item, index) => (
                <DragDrop
                  columns={mockColumns}
                  key={item.id.toString()}
                  data={item}
                  index = {index}
                  isDragAllowed={true}
                  isDropAllowed={true}
                  sourceDragTooltip="Move"
                  destionationDropTootip="to"
                  onDrop={(s,d) => console.log(s, d)}
                  tooltipProperty="TaskName"
                >
                </DragDrop>
              ))
        }
        </tbody>
      </table>
    );
  }
}

export default App;
