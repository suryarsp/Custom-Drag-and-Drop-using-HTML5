import { PositionTypes } from "./enums/PositionTypes";

export interface IDropData {
    position: PositionTypes;
    index: number;
    item: any;
}