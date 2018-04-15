import { ModuleWithProviders } from "@angular/core";
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropSortableService } from './dnd.service';
export * from './abstract.component';
export * from './dnd.config';
export * from './dnd.service';
export * from './draggable.component';
export * from './droppable.component';
export * from './sortable.component';
export declare let providers: (typeof DragDropConfig | {
    provide: typeof DragDropService;
    useFactory: () => DragDropService;
} | {
    provide: typeof DragDropSortableService;
    useFactory: (config: DragDropConfig) => DragDropSortableService;
    deps: (typeof DragDropConfig)[];
})[];
export declare class DndModule {
    static forRoot(): ModuleWithProviders;
}
