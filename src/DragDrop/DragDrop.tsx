import { DragDropHOC } from "../createHoc";
import * as React from "react";
import { Item } from "../models";
import { IDragDropProps } from "./IDragDropProps";
import { IDragDropState } from "./IDragDropState";

class DragDrop extends React.Component<IDragDropProps, IDragDropState> {
  private source: Object = {};
  private destination: Object = {};
  public componentDidMount() {}

  private onDragOver(event: React.DragEvent<Element>) {
    if (!this.props.isDropAllowed) {
      event.dataTransfer.dropEffect = "none";
    }
    event.preventDefault();
  }

  private onDragStart(event: React.DragEvent<Element>, source: Object) {
    this.source = source;
    event.dataTransfer.setData("text/plain", JSON.stringify(source));
    event.dataTransfer.effectAllowed = "move";
  }

  private onDrop(event: any, destination: Object) {
    this.destination = destination;
    this.source = JSON.parse(event.dataTransfer.getData("text/plain"));
    this.props.onDrop(this.source, this.destination);
    event.preventDefault();
  }

  private onDragLeave(e: any) {
    this.resetDefault();
  }

  private onDragEnter(e: React.DragEvent<Element>) {
    e.preventDefault();
  }

  private onDragEnd(e: React.DragEvent<Element>) {
    this.resetDefault();
  }

  private resetDefault() {
    this.source = {};
    this.destination = {};
  }

  public render() {
    return (
      <>
        <h1 className="text-center mt-3">Drag and Drop</h1>

        <div className="container">
          {this.props.data.map((item, index) => (
            <div className="row"  key={item.id.toString()}>
              <div className="col drag-item"  key={item.id.toString()}>
                {index === 0 ? (
                  <span
                    className="drag-top"
                    id={`top-${item.id}`}
                    key={`top-${item.id}`}
                    onDragOver={this.onDragOver.bind(this)}
                    onDrop={e => this.onDrop(e, { pos: 'top', item})}
                  ></span>
                ) : null}
                <span
                  className="drag-item-inner"
                  key={item.id.toString()}
                  id={item.id.toString()}
                  onDragStart={e => this.onDragStart(e, item)}
                  draggable={this.props.isDragAllowed}
                  onDragOver={this.onDragOver.bind(this)}
                  onDrop={e => this.onDrop(e, { pos: 'inside', item})}
                  onDragEnd={this.onDragEnd.bind(this)}
                  onDragLeave = {this.onDragLeave.bind(this)}
                >
                  {item.name}
                </span>
                  <span
                    className="drag-bottom"
                    key={`bottom-${item.id}`}
                    onDragOver={this.onDragOver.bind(this)}
                    onDrop={e => this.onDrop(e, { pos: 'bottom', item})}
                  ></span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default DragDropHOC(DragDrop);
