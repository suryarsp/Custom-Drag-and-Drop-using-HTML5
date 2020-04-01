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

  private onDragOver(event: any, data: IDragOverData, elementId : string) {
    if (!this.props.isDropAllowed) {
      event.dataTransfer.dropEffect = "none";
    }

    const { position, item } = data;
    if (source.data["id"] === item["id"]) {
      return;
    }
    this.setState({ tooltip: this.getTooltip(position, source.data, item) });

    // Add rules to show/hide the tooltip based on hovering the drop container
      let activeTooltips = document.querySelectorAll('.active');

      for(let i = 0; i < activeTooltips.length; i++) {
        activeTooltips[i].classList.remove('active');
      } 

      const container = document.getElementById(elementId);
      if(container) {
        if(!container.classList.contains('active')) {
          container.classList.add('active');
        }
      }
    event.preventDefault();
  }

  private onDragStart(
    event: any,
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
    const { tooltipProperty } = this.props;

    switch (positionType) {
      case PositionTypes.TOP:
        tooltip = `${sourceDragTooltip} ${source[tooltipProperty]} above ${destination[tooltipProperty]}`;
        break;

      case PositionTypes.INSIDE:
        tooltip = `${sourceDragTooltip} ${source[tooltipProperty]} into ${destination[tooltipProperty]}`;
        break;

      case PositionTypes.BELOW:
        tooltip = `${sourceDragTooltip} ${source[tooltipProperty]} below ${destination[tooltipProperty]}`;

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
    const { data, index } = this.props;
    return (
            <div className="row"  key={data.id.toString()}>
              <div className="col drag-item">
                {index === 0 ? (
                  <span
                  className="drag-top"
                  id={`top-${data.id}`}
                  key={`top-${data.id}`}
                  onDragOver={e =>
                    this.onDragOver(e, {
                      position: PositionTypes.TOP,
                      index: index,
                      item: data
                    },
                    `top-${data.id}`)
                  }
                  onDrop={e =>
                    this.onDrop(e, {
                      position: PositionTypes.TOP,
                      index: index,
                      item: data
                    })
                  }
                  >
                    <span className="drag-over">{this.state.tooltip}</span>
                  </span>
                ) : null}
                <span
                  className="gridRow drag-item-inner"
                  id={`inside-${data.id}`}
                  key={data.id}
                  draggable={this.props.isDragAllowed}
                  onDragStart={e => this.onDragStart(e, data, index)}
                  onDragOver={e =>
                    this.onDragOver(e, {
                      position: PositionTypes.INSIDE,
                      index: index,
                      item: data
                    }, `inside-${data.id}`)
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
                  {this.props.children}
                  <span className="drag-over">{this.state.tooltip}</span>
                </span>
                  <span
                    className="drag-bottom"
                    id={`bottom-${data.id}`}
                    key={`bottom-${data.id}`}
                    onDragOver={e =>
                      this.onDragOver(e, {
                        position: PositionTypes.BELOW,
                        index: index,
                        item: data
                      }, `bottom-${data.id}`)
                    }
                    onDrop={e =>
                      this.onDrop(e, {
                        position: PositionTypes.BELOW,
                        index: index,
                        item: data
                      })
                    }
                  >
                    <span className="drag-over">{this.state.tooltip}</span>
                  </span>
              </div>
            </div>
    );
  }
}

export default DragDropHOC(DragDrop);
