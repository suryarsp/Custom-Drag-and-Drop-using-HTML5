import { Item } from "../models/Item";

export interface IDragDropProps {
    data: Item;
    isDragAllowed: boolean;
    isDropAllowed: boolean;
    sourceDragTooltip: string;
    destionationDropTootip: string;
    index: number;
    onDrop: (source: any, destination: any) => void;
  }