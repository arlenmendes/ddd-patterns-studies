import EventDisapacherInterface from './event-dispatcher.inferface';
import eventHandlerInterface from './event-handler.interface';
import eventInterface from './event.interface';

export default class EventDispatcher implements EventDisapacherInterface {
  private eventHandlers: { [eventName: string]: eventHandlerInterface[] } = {};

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  register(eventName: string, eventhandler: eventHandlerInterface<eventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventhandler);
  }

  unregister(eventName: string, eventHandler: eventHandlerInterface): void {
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

  get getEventHandlers(): { [eventName: string]: eventHandlerInterface[] } {
    return this.eventHandlers;
  }
}
