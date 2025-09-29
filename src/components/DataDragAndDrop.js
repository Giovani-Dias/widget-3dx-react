export class DataDragAndDrop {
  constructor() {
    this.dragDataMap = new WeakMap();
    this.dragHandlers = new WeakMap();
    this.dropHandlers = new WeakMap();
  }

  clean(element, type) {
    if (type === 'drag' || !type) {
      element.removeAttribute('draggable');
      const dragEvents = this.dragHandlers.get(element);
      if (dragEvents) {
        element.removeEventListener('dragstart', dragEvents.start);
        element.removeEventListener('dragend', dragEvents.stop);
        this.dragHandlers.delete(element);
        this.dragDataMap.delete(element);
      }
    }

    if (type === 'drop' || !type) {
      const dropEvents = this.dropHandlers.get(element);
      if (dropEvents) {
        element.removeEventListener('dragenter', dropEvents.enter);
        element.removeEventListener('dragleave', dropEvents.leave);
        element.removeEventListener('dragover', dropEvents.over);
        element.removeEventListener('drop', dropEvents.drop);
        this.dropHandlers.delete(element);
      }
    }
  }

  draggable(element, options = {}) {
    if (this.dragHandlers.has(element)) return;

    element.setAttribute('draggable', true);
    this.dragDataMap.set(element, options.data || '');

    const start = (e) => {
      e.dataTransfer.setData('text/plain', this.dragDataMap.get(element));
      if (typeof options.start === 'function') options.start(element, e);
    };

    const stop = (e) => {
      if (typeof options.stop === 'function') options.stop(element, e);
    };

    this.dragHandlers.set(element, { start, stop });

    element.addEventListener('dragstart', start);
    element.addEventListener('dragend', stop);
  }

  droppable(element, options = {}) {
    if (this.dropHandlers.has(element)) return;

    const enter = (e) => {
      e.preventDefault();
      if (typeof options.enter === 'function') options.enter(element, e);
    };

    const leave = (e) => {
      if (typeof options.leave === 'function') options.leave(element, e);
    };

    const over = (e) => {
      e.preventDefault();
      if (typeof options.over === 'function') {
        const result = options.over(element, e);
        if (result === false) return;
      }
    };

    const drop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (typeof options.drop === 'function') options.drop(data, element, e);
    };

    this.dropHandlers.set(element, { enter, leave, over, drop });

    element.addEventListener('dragenter', enter);
    element.addEventListener('dragleave', leave);
    element.addEventListener('dragover', over);
    element.addEventListener('drop', drop);
  }

  off(dragElements = [], dropElements = []) {
    dragElements.forEach(el => this.clean(el, 'drag'));
    dropElements.forEach(el => this.clean(el, 'drop'));
  }

  on(dragElements = [], dropElements = [], options = {}) {
    dragElements.forEach(el => this.draggable(el, {
      data: options.data,
      start: options.start,
      stop: options.stop
    }));

    dropElements.forEach(el => this.droppable(el, {
      enter: options.enter,
      leave: options.leave,
      over: options.over,
      drop: options.drop
    }));
  }
}
