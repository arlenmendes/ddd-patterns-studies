import EventDisapacherInterface from './event-dispatcher.inferface';
import EventHandlerInterface from './event-handler.interface';
import EventInterface from './event.interface';

export default class EventDispatcher implements EventDisapacherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventhandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventhandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }
}
