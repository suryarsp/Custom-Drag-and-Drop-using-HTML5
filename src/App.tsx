import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import { mockItems } from "./mockData";
import DragDrop from "./DragDrop/DragDrop";

class App extends React.Component {
  public render() {
    return (
      <div className="container">
          <div className="gridRow">
            <div className="gridCell">#</div>
            <div className="gridCell">Task Name</div>
            <div className="gridCell">Responsible Party</div>
            <div className="gridCell">Last Updated</div>
            <div className="gridCell">Doc</div>
            <div className="gridCell">Com</div>
            <div className="gridCell">Created</div>
          </div>
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
              onDrop={(s,d) => console.log(s, d)}
            >
              <div className="gridRow" key={item.id.toString()}>
                
                <span className="drag-top"></span>
                <span className="drag-over">{item.name}</span>
                <span className="drag-bottom"></span>
                
                <div className="gridCell">#</div>
                <div className="gridCell"> {item.name} </div>
                <div className="gridCell"> {item.name} </div>
                <div className="gridCell"> {item.name} </div>
                <div className="gridCell"> {item.name} </div>
                <div className="gridCell"> {item.name} </div>
                <div className="gridCell"> {item.name} </div>
              </div>
              {/* <div className="container">
                <div className="row" key={item.id.toString()}>
                  <div className="col drag-item">
                    <span className="drag-item-inner">
                      {item.name}
                      <span className="drag-over">{item.name}</span>
                    </span>
                  </div>
                </div>
              </div> */}
            </DragDrop>
          ))
        }
      </div>
    );
  }
}

export default App;
