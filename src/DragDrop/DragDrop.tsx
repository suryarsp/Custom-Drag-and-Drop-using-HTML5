import { DragDropHOC } from "../createHoc";
import * as React from "react";
import { Item, IDragOverData } from "../models";
import { IDragDropProps } from "./IDragDropProps";
import { IDragDropState } from "./IDragDropState";
import { PositionTypes } from "../models/enums/PositionTypes";



class DragDrop extends React.Component<IDragDropProps, IDragDropState> {
  public source : any;
  public destination: any;
  public tooltip = '';

  constructor(props: IDragDropProps) {
    super(props);
    this.state = {
      sourceDragTooltip : props.sourceDragTooltip ? props.sourceDragTooltip : 'Drag',
      destionationDropTooltip: props.destionationDropTootip ? props.destionationDropTootip : 'into',
      tooltip: ''
    };
  }
  public componentDidMount() {}

  private onDragOver(event: any, data: IDragOverData) {
    if (!this.props.isDropAllowed) {
      event.dataTransfer.dropEffect = "none";
    }

    const { position: positionType, item} = data;
    if(this.source['id'] === item['id']) {
      return;
    }
    this.setState({ tooltip: this.getTooltip(positionType, this.source, item) });
    event.target.classList.add('active');
    event.preventDefault();
  }

  private onDragStart(event: React.DragEvent<Element>, sourceData: any) {
    this.source = sourceData;
    event.dataTransfer.setData("text/plain", JSON.stringify(sourceData));
    event.dataTransfer.effectAllowed = "move";
  }

  private getTooltip(positionType: PositionTypes, source: any, destination: any) : string{
    let tooltip = '';
    const { sourceDragTooltip} = this.state;

    switch(positionType) {

      case PositionTypes.TOP: 
        tooltip = `${sourceDragTooltip} ${source.name} above ${destination.name}`;
      break;

      case PositionTypes.INSIDE : 
        tooltip = `${sourceDragTooltip} ${source.name} into ${destination.name}`
      break;

      case PositionTypes.BELOW : 
        tooltip = `${sourceDragTooltip} ${source.name} below ${destination.name}`
      
      break;

      default: 
        tooltip = '';
    }
    return tooltip;
  }

  private onDrop(event: any, destination: Object) {
    this.destination = destination;
    this.source = JSON.parse(event.dataTransfer.getData("text/plain"));
    this.props.onDrop(this.source, this.destination);
    event.preventDefault();
  }

  private onDragEnter(e: React.DragEvent<Element>) {
    e.preventDefault();
  }

  private onDragEnd(e: any) {
    console.log('Drag End');
    this.resetDefault();
  }

  private onDragLeave(e: any) {
    
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
              <div className="col drag-item">
                {index === 0 ? (
                  <span
                    className="drag-top"
                    id={`top-${item.id}`}
                    key={`top-${item.id}`}
                    onDragOver={e => this.onDragOver(e, {position: PositionTypes.TOP, item})}
                    onDrop={e => this.onDrop(e, { position: PositionTypes.TOP, item})}
                  >
                    <span className="drag-over">{this.state.tooltip}</span>
                  </span>
                ) : null}
                <span
                  className="drag-item-inner"
                  key={item.id.toString()}
                  id={item.id.toString()}
                  onDragStart={e => this.onDragStart(e, item)}
                  draggable={this.props.isDragAllowed}
                  onDragOver={e => this.onDragOver(e,{ position: PositionTypes.INSIDE, item})}
                  onDrop={e => this.onDrop(e, { position: PositionTypes.INSIDE, item})}
                  onDragEnd={this.onDragEnd.bind(this)}
                >
                  {item.name}
                  <span className="drag-over">{this.state.tooltip}</span>
                </span>
                  <span
                    className="drag-bottom"
                    key={`bottom-${item.id}`}
                    onDragOver={e => this.onDragOver(e, { position: PositionTypes.BELOW, item})}
                    onDrop={e => this.onDrop(e, { position: PositionTypes.BELOW, item})}
                  >
                    <span className="drag-over">{this.state.tooltip}</span>
                  </span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default DragDropHOC(DragDrop);
