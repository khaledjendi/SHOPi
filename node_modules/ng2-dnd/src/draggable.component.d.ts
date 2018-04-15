import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import { DragDropConfig, DragImage } from './dnd.config';
import { DragDropService, DragDropData } from './dnd.service';
export declare class DraggableComponent extends AbstractComponent {
    draggable: boolean;
    /**
     * Callback function called when the drag actions happened.
     */
    onDragStart: EventEmitter<DragDropData>;
    onDragEnd: EventEmitter<DragDropData>;
    /**
     * The data that has to be dragged. It can be any JS object
     */
    dragData: any;
    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    onDragSuccessCallback: EventEmitter<any>;
    dropzones: Array<string>;
    /**
     * Drag allowed effect
     */
    effectallowed: string;
    /**
     * Drag effect cursor
     */
    effectcursor: string;
    /**
     * Here is the property dragImage you can use:
     * - The string value as url to the image
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="/images/simpler.png">
     * ...
     * - The DragImage value with Image and offset by x and y:
     *   let myDragImage: DragImage = new DragImage("/images/simpler1.png", 0, 0);
     * ...
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="myDragImage">
     * ...
     * - The custom function to return the value of dragImage programmatically:
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="getDragImage(someData)">
     * ...
     *   getDragImage(value:any): string {
     *     return value ? "/images/simpler1.png" : "/images/simpler2.png"
     *   }
     */
    dragImage: string | DragImage | Function;
    cloneItem: boolean;
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, cdr: ChangeDetectorRef);
    _onDragStartCallback(event: MouseEvent): void;
    _onDragEndCallback(event: MouseEvent): void;
}
export declare class DraggableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, _Component: DraggableComponent, cdr: ChangeDetectorRef);
}
