// DataDragAndDrop.d.ts

type DragOptions = {
  data?: string;
  start?: (element: Element, event: DragEvent) => void;
  stop?: (element: Element, event: DragEvent) => void;
};

type DropOptions = {
  enter?: (element: Element, event: DragEvent) => void;
  leave?: (element: Element, event: DragEvent) => void;
  over?: (element: Element, event: DragEvent) => boolean | void;
  drop?: (data: string, element: Element, event: DragEvent) => void;
};

type CombinedOptions = DragOptions & DropOptions;

declare class DataDragAndDrop {
  constructor();

  clean(element: Element, type?: 'drag' | 'drop'): void;

  draggable(element: Element, options?: DragOptions): void;

  droppable(element: Element, options?: DropOptions): void;

  off(dragElements?: Element[], dropElements?: Element[]): void;

  on(dragElements?: Element[], dropElements?: Element[], options?: CombinedOptions): void;
}
