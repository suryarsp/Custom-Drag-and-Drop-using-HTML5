

export interface IDragDropProps {
    data: any;
    isDragAllowed: boolean;
    isDropAllowed: boolean;
    sourceDragTooltip: string;
    destionationDropTootip: string;
    index: number;
    tooltipProperty: string;
    onDrop: (source: any, destination: any) => void;
  }