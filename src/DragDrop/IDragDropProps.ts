import { Item } from "../models/Item";

export interface IDragDropProps {
    data: Item[];
    isDragAllowed: boolean;
    isDropAllowed: boolean;
    onDrop: (source: any, destination: any) => void;
  }