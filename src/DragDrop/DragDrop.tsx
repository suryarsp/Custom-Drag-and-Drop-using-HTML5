import { DragDropHOC } from "../createHoc";
import * as React from "react";
import { Item, IDragOverData } from "../models";
import { IDragDropProps } from "./IDragDropProps";
import { IDragDropState } from "./IDragDropState";
import { PositionTypes } from "../models/enums/PositionTypes";
import { IDropData } from "../models/IDropData";

let source: { index: number; data: any } = null;
class DragDrop extends React.Component<IDragDropProps, IDragDropState> {
  public tooltip = "";

  constructor(props: IDragDropProps) {
    super(props);
    this.state = {
      sourceDragTooltip: props.sourceDragTooltip
        ? props.sourceDragTooltip
        : "Drag",
      destionationDropTooltip: props.destionationDropTootip
        ? props.destionationDropTootip
        : "into",
      tooltip: ""
    };
  }
  public componentDidMount() {}

  private onDragOver(event: any, data: IDragOverData) {
    if (!this.props.isDropAllowed) {
      event.dataTransfer.dropEffect = "none";
    }

    const { position, item } = data;
    console.log(source);
    if (source.data["id"] === item["id"]) {
      return;
    }
    this.setState({ tooltip: this.getTooltip(position, source.data, item) });

    // Add rules to show/hide the tooltip based on hovering the drop container
      let activeTooltips = document.querySelectorAll('.active');

      for(let i = 0; i < activeTooltips.length; i++) {
        activeTooltips[i].classList.remove('active');
      } 
      if(event.target.nextSibling) {
        if(event.target.nextSibling.classList.contains('drag-top') ||
        event.target.nextSibling.classList.contains('drag-item-inner') || 
        event.target.nextSibling.classList.contains('drag-bottom'))
        event.target.nextSibling.classList.add("active");
      }
    event.preventDefault();
  }

  private onDragStart(
    event: React.DragEvent<Element>,
    sourceData: any,
    sourceIndex: number
  ) {
    source = {
      index: sourceIndex,
      data: sourceData
    };
    event.dataTransfer.setData("text/plain", JSON.stringify(sourceData));
    event.dataTransfer.effectAllowed = "move";
  }

  private getTooltip(
    positionType: PositionTypes,
    source: any,
    destination: any
  ): string {
    let tooltip = "";
    const { sourceDragTooltip } = this.state;

    switch (positionType) {
      case PositionTypes.TOP:
        tooltip = `${sourceDragTooltip} ${source['TaskName']} above ${destination['TaskName']}`;
        break;

      case PositionTypes.INSIDE:
        tooltip = `${sourceDragTooltip} ${source['TaskName']} into ${destination['TaskName']}`;
        break;

      case PositionTypes.BELOW:
        tooltip = `${sourceDragTooltip} ${source['TaskName']} below ${destination['TaskName']}`;

        break;

      default:
        tooltip = "";
    }
    return tooltip;
  }

  private onDrop(event: any, destinationData: IDropData) {
    // source = JSON.parse(event.dataTransfer.getData("text/plain"));
    this.props.onDrop(source, destinationData);
    event.preventDefault();
  }

  private onDragEnter(e: React.DragEvent<Element>) {
    e.preventDefault();
  }

  private onDragEnd(e: any) {
    console.log("Drag End");
    this.resetDefault();
    let activeTooltips = document.querySelectorAll('.active');

    for(let i = 0; i < activeTooltips.length; i++) {
      activeTooltips[i].classList.remove('active');
    } 
  }

  private resetDefault() {
    source = null;
    this.setState({ tooltip: ''});
  }

  public render() {
    const { data, index, columns } = this.props;
    return (
      <>
        {/* Top Drop Container */}

        {index === 0 && (
          <tr
            className="drag-top"
            id={`top-${data.id}`}
            key={`top-${data.id}`}
            onDragOver={e =>
              this.onDragOver(e, {
                position: PositionTypes.TOP,
                index: index,
                item: data
              })
            }
            onDrop={e =>
              this.onDrop(e, {
                position: PositionTypes.TOP,
                index: index,
                item: data
              })
            }
          >
            <td className="drag-over" colSpan={columns.length - 1}>{this.state.tooltip}</td>
          </tr>
        )}

        {/* Content */}
        <tr
          className="gridRow drag-item-inner"
          id={data.id}
          key={data.id}
          draggable={this.props.isDragAllowed}
          onDragStart={e => this.onDragStart(e, data, index)}
          onDragOver={e =>
            this.onDragOver(e, {
              position: PositionTypes.INSIDE,
              index: index,
              item: data
            })
          }
          onDrop={e =>
            this.onDrop(e, {
              position: PositionTypes.INSIDE,
              index: index,
              item: data
            })
          }
          onDragEnd={this.onDragEnd.bind(this)}
        >
          
          {columns.map((col, index) => (

            <td key={col.name} className="gridCell">
              {data[col.name]}
              {
                index === 0 && (<span className="drag-over">
                { this.state.tooltip}
              </span>)
              }
              </td>
          ))}
          
        </tr>

        {/* Bottom Drop Container */}
        <tr
          className="drag-bottom"
          key={`bottom-${data.id}`}
          onDragOver={e =>
            this.onDragOver(e, {
              position: PositionTypes.BELOW,
              index: index,
              item: data
            })
          }
          onDrop={e =>
            this.onDrop(e, {
              position: PositionTypes.BELOW,
              index: index,
              item: data
            })
          }
        >
          <td className="drag-over" colSpan={columns.length - 1}>{this.state.tooltip}</td>
        </tr>
      </>
    );
  }
}

export default DragDropHOC(DragDrop);
