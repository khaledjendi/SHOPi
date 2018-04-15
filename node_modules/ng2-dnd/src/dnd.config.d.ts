export declare class DataTransferEffect {
    name: string;
    static COPY: DataTransferEffect;
    static LINK: DataTransferEffect;
    static MOVE: DataTransferEffect;
    static NONE: DataTransferEffect;
    constructor(name: string);
}
export declare class DragImage {
    imageElement: any;
    x_offset: number;
    y_offset: number;
    constructor(imageElement: any, x_offset?: number, y_offset?: number);
}
export declare class DragDropConfig {
    onDragStartClass: string;
    onDragEnterClass: string;
    onDragOverClass: string;
    onSortableDragClass: string;
    dragEffect: DataTransferEffect;
    dropEffect: DataTransferEffect;
    dragCursor: string;
    dragImage: DragImage;
    defaultCursor: string;
}
