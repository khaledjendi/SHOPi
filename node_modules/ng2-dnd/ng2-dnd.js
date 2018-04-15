import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Injectable, Input, NgModule, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
/**
 * Check and return true if an object is type of string
 */
function isString(obj) {
    return typeof obj === "string";
}
/**
 * Check and return true if an object not undefined or null
 */
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
/**
 * Check and return true if an object is type of Function
 */
function isFunction(obj) {
    return typeof obj === "function";
}
/**
 * Create Image element with specified url string
 */
function createImage(src) {
    let img = new HTMLImageElement();
    img.src = src;
    return img;
}
/**
 * Call the function
 */
function callFun(fun) {
    return fun();
}

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
class DataTransferEffect {
    constructor(name) {
        this.name = name;
    }
}
DataTransferEffect.COPY = new DataTransferEffect('copy');
DataTransferEffect.LINK = new DataTransferEffect('link');
DataTransferEffect.MOVE = new DataTransferEffect('move');
DataTransferEffect.NONE = new DataTransferEffect('none');
class DragImage {
    constructor(imageElement, x_offset = 0, y_offset = 0) {
        this.imageElement = imageElement;
        this.x_offset = x_offset;
        this.y_offset = y_offset;
        if (isString(this.imageElement)) {
            // Create real image from string source
            let imgScr = this.imageElement;
            this.imageElement = new HTMLImageElement();
            this.imageElement.src = imgScr;
        }
    }
}
class DragDropConfig {
    constructor() {
        this.onDragStartClass = "dnd-drag-start";
        this.onDragEnterClass = "dnd-drag-enter";
        this.onDragOverClass = "dnd-drag-over";
        this.onSortableDragClass = "dnd-sortable-drag";
        this.dragEffect = DataTransferEffect.MOVE;
        this.dropEffect = DataTransferEffect.MOVE;
        this.dragCursor = "move";
        this.defaultCursor = "pointer";
    }
}

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
class DragDropData {
}
function dragDropServiceFactory() {
    return new DragDropService();
}
let DragDropService = class DragDropService {
    constructor() {
        this.allowedDropZones = [];
    }
};
DragDropService = __decorate$1([
    Injectable()
], DragDropService);
function dragDropSortableServiceFactory(config) {
    return new DragDropSortableService(config);
}
let DragDropSortableService = class DragDropSortableService {
    constructor(_config) {
        this._config = _config;
    }
    get elem() {
        return this._elem;
    }
    markSortable(elem) {
        if (isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
};
DragDropSortableService = __decorate$1([
    Injectable(),
    __metadata("design:paramtypes", [DragDropConfig])
], DragDropSortableService);

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let AbstractComponent = class AbstractComponent {
    constructor(elemRef, _dragDropService, _config, _cdr) {
        this._dragDropService = _dragDropService;
        this._config = _config;
        this._cdr = _cdr;
        /**
         * Whether the object is draggable. Default is true.
         */
        this._dragEnabled = false;
        /**
         * Allows drop on this element
         */
        this.dropEnabled = false;
        this.dropZones = [];
        this.cloneItem = false;
        // Assign default cursor unless overridden
        this._defaultCursor = _config.defaultCursor;
        this._elem = elemRef.nativeElement;
        this._elem.style.cursor = this._defaultCursor; // set default cursor on our element
        //
        // DROP events
        //
        this._elem.ondragenter = (event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }
            return false;
        };
        this._elem.ondragleave = (event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event) => {
            this._onDrop(event);
        };
        //
        // Drag events
        //
        this._elem.onmousedown = (event) => {
            this._target = event.target;
        };
        this._elem.ondragstart = (event) => {
            if (this._dragHandle) {
                if (!this._dragHandle.contains(this._target)) {
                    event.preventDefault();
                    return;
                }
            }
            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                // Change drag effect
                event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;
                // Change drag image
                if (isPresent(this.dragImage)) {
                    if (isString(this.dragImage)) {
                        event.dataTransfer.setDragImage(createImage(this.dragImage));
                    }
                    else if (isFunction(this.dragImage)) {
                        event.dataTransfer.setDragImage(callFun(this.dragImage));
                    }
                    else {
                        let img = this.dragImage;
                        event.dataTransfer.setDragImage(img.imageElement, img.x_offset, img.y_offset);
                    }
                }
                else if (isPresent(this._config.dragImage)) {
                    let dragImage = this._config.dragImage;
                    event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }
                else if (this.cloneItem) {
                    this._dragHelper = this._elem.cloneNode(true);
                    this._dragHelper.classList.add('dnd-drag-item');
                    this._dragHelper.style.position = "absolute";
                    this._dragHelper.style.top = "0px";
                    this._dragHelper.style.left = "-1000px";
                    this._elem.parentElement.appendChild(this._dragHelper);
                    event.dataTransfer.setDragImage(this._dragHelper, event.offsetX, event.offsetY);
                }
                // Change drag cursor
                let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
                if (this._dragEnabled) {
                    cursorelem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
                }
                else {
                    cursorelem.style.cursor = this._defaultCursor;
                }
            }
        };
        this._elem.ondragend = (event) => {
            if (this._elem.parentElement && this._dragHelper) {
                this._elem.parentElement.removeChild(this._dragHelper);
            }
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
            // Restore style of dragged element
            let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
            cursorelem.style.cursor = this._defaultCursor;
        };
    }
    set dragEnabled(enabled) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled() {
        return this._dragEnabled;
    }
    setDragHandle(elem) {
        this._dragHandle = elem;
    }
    /******* Change detection ******/
    detectChanges() {
        // Programmatically run change detection to fix issue in Safari
        setTimeout(() => {
            if (this._cdr && !this._cdr.destroyed) {
                this._cdr.detectChanges();
            }
        }, 250);
    }
    //****** Droppable *******//
    _onDragEnter(event) {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }
    _onDragOver(event) {
        // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // The element is over the same source element - do nothing
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }
            this._onDragOverCallback(event);
        }
    }
    _onDragLeave(event) {
        // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }
    _onDrop(event) {
        // console.log('ondrop._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // Necessary. Allows us to drop.
            this._preventAndStop(event);
            this._onDropCallback(event);
            this.detectChanges();
        }
    }
    _isDropAllowed(event) {
        if ((this._dragDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
            // First, if `allowDrop` is set, call it to determine whether the
            // dragged element can be dropped here.
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }
            // Otherwise, use dropZones if they are set.
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
    _preventAndStop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    }
    //*********** Draggable **********//
    _onDragStart(event) {
        //console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }
    _onDragEnd(event) {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }
    //**** Drop Callbacks ****//
    _onDragEnterCallback(event) { }
    _onDragOverCallback(event) { }
    _onDragLeaveCallback(event) { }
    _onDropCallback(event) { }
    //**** Drag Callbacks ****//
    _onDragStartCallback(event) { }
    _onDragEndCallback(event) { }
};
AbstractComponent = __decorate$3([
    Injectable(),
    __metadata$2("design:paramtypes", [ElementRef, DragDropService, DragDropConfig,
        ChangeDetectorRef])
], AbstractComponent);
class AbstractHandleComponent {
    constructor(elemRef, _dragDropService, _config, _Component, _cdr) {
        this._dragDropService = _dragDropService;
        this._config = _config;
        this._Component = _Component;
        this._cdr = _cdr;
        this._elem = elemRef.nativeElement;
        this._Component.setDragHandle(this._elem);
    }
}

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DraggableComponent = class DraggableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr) {
        super(elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drag actions happened.
         */
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new EventEmitter();
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    /**
     * Drag allowed effect
     */
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    /**
     * Drag effect cursor
     */
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragStartCallback(event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
        //
        this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
    }
    _onDragEndCallback(event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
        //
        this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
    }
};
__decorate$2([
    Input("dragEnabled"),
    __metadata$1("design:type", Boolean),
    __metadata$1("design:paramtypes", [Boolean])
], DraggableComponent.prototype, "draggable", null);
__decorate$2([
    Output(),
    __metadata$1("design:type", EventEmitter)
], DraggableComponent.prototype, "onDragStart", void 0);
__decorate$2([
    Output(),
    __metadata$1("design:type", EventEmitter)
], DraggableComponent.prototype, "onDragEnd", void 0);
__decorate$2([
    Input(),
    __metadata$1("design:type", Object)
], DraggableComponent.prototype, "dragData", void 0);
__decorate$2([
    Output("onDragSuccess"),
    __metadata$1("design:type", EventEmitter)
], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
__decorate$2([
    Input("dropZones"),
    __metadata$1("design:type", Array),
    __metadata$1("design:paramtypes", [Array])
], DraggableComponent.prototype, "dropzones", null);
__decorate$2([
    Input("effectAllowed"),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [String])
], DraggableComponent.prototype, "effectallowed", null);
__decorate$2([
    Input("effectCursor"),
    __metadata$1("design:type", String),
    __metadata$1("design:paramtypes", [String])
], DraggableComponent.prototype, "effectcursor", null);
__decorate$2([
    Input(),
    __metadata$1("design:type", Object)
], DraggableComponent.prototype, "dragImage", void 0);
__decorate$2([
    Input(),
    __metadata$1("design:type", Boolean)
], DraggableComponent.prototype, "cloneItem", void 0);
DraggableComponent = __decorate$2([
    Directive({ selector: '[dnd-draggable]' }),
    __metadata$1("design:paramtypes", [ElementRef, DragDropService, DragDropConfig,
        ChangeDetectorRef])
], DraggableComponent);
let DraggableHandleComponent = class DraggableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef, dragDropService, config, _Component, cdr) {
        super(elemRef, dragDropService, config, _Component, cdr);
    }
};
DraggableHandleComponent = __decorate$2([
    Directive({ selector: '[dnd-draggable-handle]' }),
    __metadata$1("design:paramtypes", [ElementRef, DragDropService, DragDropConfig, DraggableComponent,
        ChangeDetectorRef])
], DraggableHandleComponent);

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let DroppableComponent = class DroppableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr) {
        super(elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drop action completes correctly.
         * It is activated before the on-drag-success callback.
         */
        this.onDropSuccess = new EventEmitter();
        this.onDragEnter = new EventEmitter();
        this.onDragOver = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.dropEnabled = true;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
    }
    set allowdrop(value) {
        this.allowDrop = value;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    /**
     * Drag allowed effect
     */
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    /**
     * Drag effect cursor
     */
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragEnterCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragEnterClass);
            this.onDragEnter.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    _onDragOverCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragOverClass);
            this.onDragOver.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    ;
    _onDragLeaveCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
            this.onDragLeave.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    ;
    _onDropCallback(event) {
        let dataTransfer = event.dataTransfer;
        if (this._dragDropService.isDragged || (dataTransfer && dataTransfer.files)) {
            this.onDropSuccess.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            if (this._dragDropService.onDragSuccessCallback) {
                this._dragDropService.onDragSuccessCallback.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
        }
    }
};
__decorate$4([
    Input("dropEnabled"),
    __metadata$3("design:type", Boolean),
    __metadata$3("design:paramtypes", [Boolean])
], DroppableComponent.prototype, "droppable", null);
__decorate$4([
    Output(),
    __metadata$3("design:type", EventEmitter)
], DroppableComponent.prototype, "onDropSuccess", void 0);
__decorate$4([
    Output(),
    __metadata$3("design:type", EventEmitter)
], DroppableComponent.prototype, "onDragEnter", void 0);
__decorate$4([
    Output(),
    __metadata$3("design:type", EventEmitter)
], DroppableComponent.prototype, "onDragOver", void 0);
__decorate$4([
    Output(),
    __metadata$3("design:type", EventEmitter)
], DroppableComponent.prototype, "onDragLeave", void 0);
__decorate$4([
    Input("allowDrop"),
    __metadata$3("design:type", Function),
    __metadata$3("design:paramtypes", [Function])
], DroppableComponent.prototype, "allowdrop", null);
__decorate$4([
    Input("dropZones"),
    __metadata$3("design:type", Array),
    __metadata$3("design:paramtypes", [Array])
], DroppableComponent.prototype, "dropzones", null);
__decorate$4([
    Input("effectAllowed"),
    __metadata$3("design:type", String),
    __metadata$3("design:paramtypes", [String])
], DroppableComponent.prototype, "effectallowed", null);
__decorate$4([
    Input("effectCursor"),
    __metadata$3("design:type", String),
    __metadata$3("design:paramtypes", [String])
], DroppableComponent.prototype, "effectcursor", null);
DroppableComponent = __decorate$4([
    Directive({ selector: '[dnd-droppable]' }),
    __metadata$3("design:paramtypes", [ElementRef, DragDropService, DragDropConfig,
        ChangeDetectorRef])
], DroppableComponent);

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let SortableContainer = class SortableContainer extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr, _sortableDataService) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableDataService = _sortableDataService;
        this._sortableData = [];
        this.dragEnabled = false;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set sortableData(sortableData) {
        this._sortableData = sortableData;
        if (sortableData instanceof FormArray) {
            this.sortableHandler = new SortableFormArrayHandler();
        }
        else {
            this.sortableHandler = new SortableArrayHandler();
        }
        //
        this.dropEnabled = !!this._sortableData;
        // console.log("collection is changed, drop enabled: " + this.dropEnabled);
    }
    get sortableData() {
        return this._sortableData;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
            // Check does element exist in sortableData of this Container
            if (this.indexOf(item) === -1) {
                // Let's add it
                // console.log('Container._onDragEnterCallback. drag node [' + this._sortableDataService.index.toString() + '] over parent node');
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this.insertItemAt(item, 0);
                this._sortableDataService.sortableContainer = this;
                this._sortableDataService.index = 0;
            }
            // Refresh changes in properties of container component
            this.detectChanges();
        }
    }
    getItemAt(index) {
        return this.sortableHandler.getItemAt(this._sortableData, index);
    }
    indexOf(item) {
        return this.sortableHandler.indexOf(this._sortableData, item);
    }
    removeItemAt(index) {
        this.sortableHandler.removeItemAt(this._sortableData, index);
    }
    insertItemAt(item, index) {
        this.sortableHandler.insertItemAt(this._sortableData, item, index);
    }
};
__decorate$5([
    Input("dragEnabled"),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], SortableContainer.prototype, "draggable", null);
__decorate$5([
    Input(),
    __metadata$4("design:type", Object),
    __metadata$4("design:paramtypes", [Object])
], SortableContainer.prototype, "sortableData", null);
__decorate$5([
    Input("dropZones"),
    __metadata$4("design:type", Array),
    __metadata$4("design:paramtypes", [Array])
], SortableContainer.prototype, "dropzones", null);
SortableContainer = __decorate$5([
    Directive({ selector: '[dnd-sortable-container]' }),
    __metadata$4("design:paramtypes", [ElementRef, DragDropService, DragDropConfig, ChangeDetectorRef,
        DragDropSortableService])
], SortableContainer);
class SortableArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData[index];
    }
    indexOf(sortableData, item) {
        return sortableData.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.splice(index, 1);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.splice(index, 0, item);
    }
}
class SortableFormArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData.at(index);
    }
    indexOf(sortableData, item) {
        return sortableData.controls.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.removeAt(index);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.insert(index, item);
    }
}
let SortableComponent = class SortableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableContainer = _sortableContainer;
        this._sortableDataService = _sortableDataService;
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new EventEmitter();
        this.onDragStartCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragEndCallback = new EventEmitter();
        this.onDropSuccessCallback = new EventEmitter();
        this.dropZones = this._sortableContainer.dropZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
    }
    /**
     * Drag allowed effect
     */
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    /**
     * Drag effect cursor
     */
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragStartCallback(event) {
        // console.log('_onDragStartCallback. dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = true;
        this._sortableDataService.sortableContainer = this._sortableContainer;
        this._sortableDataService.index = this.index;
        this._sortableDataService.markSortable(this._elem);
        // Add dragData
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        //
        this.onDragStartCallback.emit(this._dragDropService.dragData);
    }
    _onDragOverCallback(event) {
        if (this._sortableDataService.isDragged && this._elem !== this._sortableDataService.elem) {
            // console.log('_onDragOverCallback. dragging elem with index ' + this.index);
            this._sortableDataService.sortableContainer = this._sortableContainer;
            this._sortableDataService.index = this.index;
            this._sortableDataService.markSortable(this._elem);
            this.onDragOverCallback.emit(this._dragDropService.dragData);
        }
    }
    _onDragEndCallback(event) {
        // console.log('_onDragEndCallback. end dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = false;
        this._sortableDataService.sortableContainer = null;
        this._sortableDataService.index = null;
        this._sortableDataService.markSortable(null);
        // Add dragGata
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        //
        this.onDragEndCallback.emit(this._dragDropService.dragData);
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            this._sortableDataService.markSortable(this._elem);
            if ((this.index !== this._sortableDataService.index) ||
                (this._sortableDataService.sortableContainer.sortableData !== this._sortableContainer.sortableData)) {
                // console.log('Component._onDragEnterCallback. drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
                // Get item
                let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer.sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this._sortableContainer.insertItemAt(item, this.index);
                if (this._sortableContainer.dropEnabled) {
                    this._sortableContainer.dropEnabled = false;
                }
                this._sortableDataService.sortableContainer = this._sortableContainer;
                this._sortableDataService.index = this.index;
                this.detectChanges();
            }
        }
    }
    _onDropCallback(event) {
        if (this._sortableDataService.isDragged) {
            // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
            if (this._dragDropService.onDragSuccessCallback) {
                // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
                this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
            }
            // Refresh changes in properties of container component
            this._sortableContainer.detectChanges();
        }
    }
};
__decorate$5([
    Input('sortableIndex'),
    __metadata$4("design:type", Number)
], SortableComponent.prototype, "index", void 0);
__decorate$5([
    Input("dragEnabled"),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], SortableComponent.prototype, "draggable", null);
__decorate$5([
    Input("dropEnabled"),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], SortableComponent.prototype, "droppable", null);
__decorate$5([
    Input(),
    __metadata$4("design:type", Object)
], SortableComponent.prototype, "dragData", void 0);
__decorate$5([
    Input("effectAllowed"),
    __metadata$4("design:type", String),
    __metadata$4("design:paramtypes", [String])
], SortableComponent.prototype, "effectallowed", null);
__decorate$5([
    Input("effectCursor"),
    __metadata$4("design:type", String),
    __metadata$4("design:paramtypes", [String])
], SortableComponent.prototype, "effectcursor", null);
__decorate$5([
    Output("onDragSuccess"),
    __metadata$4("design:type", EventEmitter)
], SortableComponent.prototype, "onDragSuccessCallback", void 0);
__decorate$5([
    Output("onDragStart"),
    __metadata$4("design:type", EventEmitter)
], SortableComponent.prototype, "onDragStartCallback", void 0);
__decorate$5([
    Output("onDragOver"),
    __metadata$4("design:type", EventEmitter)
], SortableComponent.prototype, "onDragOverCallback", void 0);
__decorate$5([
    Output("onDragEnd"),
    __metadata$4("design:type", EventEmitter)
], SortableComponent.prototype, "onDragEndCallback", void 0);
__decorate$5([
    Output("onDropSuccess"),
    __metadata$4("design:type", EventEmitter)
], SortableComponent.prototype, "onDropSuccessCallback", void 0);
SortableComponent = __decorate$5([
    Directive({ selector: '[dnd-sortable]' }),
    __metadata$4("design:paramtypes", [ElementRef, DragDropService, DragDropConfig,
        SortableContainer,
        DragDropSortableService,
        ChangeDetectorRef])
], SortableComponent);
let SortableHandleComponent = class SortableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef, dragDropService, config, _Component, cdr) {
        super(elemRef, dragDropService, config, _Component, cdr);
    }
};
SortableHandleComponent = __decorate$5([
    Directive({ selector: '[dnd-sortable-handle]' }),
    __metadata$4("design:paramtypes", [ElementRef, DragDropService, DragDropConfig, SortableComponent,
        ChangeDetectorRef])
], SortableHandleComponent);

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let providers = [
    DragDropConfig,
    { provide: DragDropService, useFactory: dragDropServiceFactory },
    { provide: DragDropSortableService, useFactory: dragDropSortableServiceFactory, deps: [DragDropConfig] }
];
let DndModule = DndModule_1 = class DndModule {
    static forRoot() {
        return {
            ngModule: DndModule_1,
            providers: providers
        };
    }
};
DndModule = DndModule_1 = __decorate([
    NgModule({
        declarations: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
        exports: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
    })
], DndModule);
var DndModule_1;

// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

/**
 * Generated bundle index. Do not edit.
 */

export { providers, DndModule, AbstractComponent, AbstractHandleComponent, DataTransferEffect, DragImage, DragDropConfig, DragDropData, dragDropServiceFactory, DragDropService, dragDropSortableServiceFactory, DragDropSortableService, DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent };
//# sourceMappingURL=ng2-dnd.js.map
