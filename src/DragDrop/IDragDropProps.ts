import { Item } from "../models/Item";
import { IColumn } from "../models/IColumn";

export interface IDragDropProps {
    data: any;
    isDragAllowed: boolean;
    isDropAllowed: boolean;
    sourceDragTooltip: string;
    destionationDropTootip: string;
    index: number;
    columns : IColumn[];
    tooltipProperty: string;
    onDrop: (source: any, destination: any) => void;
  }