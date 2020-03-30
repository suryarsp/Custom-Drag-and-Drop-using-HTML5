import { PositionTypes } from "./enums/PositionTypes";
import { Item } from "./Item";

export interface IDragOverData {
    position: PositionTypes;
    item: any;
    index: number;
}