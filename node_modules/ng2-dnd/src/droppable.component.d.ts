import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';
import { AbstractComponent } from './abstract.component';
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropData } from './dnd.service';
export declare class DroppableComponent extends AbstractComponent {
    droppable: boolean;
    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    onDropSuccess: EventEmitter<DragDropData>;
    onDragEnter: EventEmitter<DragDropData>;
    onDragOver: EventEmitter<DragDropData>;
    onDragLeave: EventEmitter<DragDropData>;
    allowdrop: (dropData: any) => boolean;
    dropzones: Array<string>;
    /**
     * Drag allowed effect
     */
    effectallowed: string;
    /**
     * Drag effect cursor
     */
    effectcursor: string;
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, cdr: ChangeDetectorRef);
    _onDragEnterCallback(event: MouseEvent): void;
    _onDragOverCallback(event: MouseEvent): void;
    _onDragLeaveCallback(event: MouseEvent): void;
    _onDropCallback(event: MouseEvent): void;
}
