import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropSortableService } from './dnd.service';
export declare class SortableContainer extends AbstractComponent {
    private _sortableDataService;
    draggable: boolean;
    private _sortableData;
    private sortableHandler;
    sortableData: Array<any> | FormArray;
    dropzones: Array<string>;
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, cdr: ChangeDetectorRef, _sortableDataService: DragDropSortableService);
    _onDragEnterCallback(event: Event): void;
    getItemAt(index: number): any;
    indexOf(item: any): number;
    removeItemAt(index: number): void;
    insertItemAt(item: any, index: number): void;
}
export declare class SortableComponent extends AbstractComponent {
    private _sortableContainer;
    private _sortableDataService;
    index: number;
    draggable: boolean;
    droppable: boolean;
    /**
     * The data that has to be dragged. It can be any JS object
     */
    dragData: any;
    /**
     * Drag allowed effect
     */
    effectallowed: string;
    /**
     * Drag effect cursor
     */
    effectcursor: string;
    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    onDragSuccessCallback: EventEmitter<any>;
    onDragStartCallback: EventEmitter<any>;
    onDragOverCallback: EventEmitter<any>;
    onDragEndCallback: EventEmitter<any>;
    onDropSuccessCallback: EventEmitter<any>;
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, _sortableContainer: SortableContainer, _sortableDataService: DragDropSortableService, cdr: ChangeDetectorRef);
    _onDragStartCallback(event: Event): void;
    _onDragOverCallback(event: Event): void;
    _onDragEndCallback(event: Event): void;
    _onDragEnterCallback(event: Event): void;
    _onDropCallback(event: Event): void;
}
export declare class SortableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, _Component: SortableComponent, cdr: ChangeDetectorRef);
}
