import EventDispatcher from '../@shared/event-dispatcher';
import CustomerChangedEvent from './customer-changed.event';
import CustomerCreatedEvent from './customer-created.event';
import EnviaConsoleLog1Handler from './handler/envia-console-log-1.handler';
import EnviaConsoleLog2Handler from './handler/envia-console-log-2.handler';
import EnviaConsoleLogHandler from './handler/envia-console-log.handler';

describe('Cusomer event tests', () => {
  it('Should be able to notify the creation of a client', () => {
    const eventDispatcher = new EventDispatcher();
    const event1Handler = new EnviaConsoleLog1Handler();
    const event2Handler = new EnviaConsoleLog2Handler();
    const spyEvent1Handler = jest.spyOn(event1Handler, 'handle');
    const spyEvent2Handler = jest.spyOn(event2Handler, 'handle');

    eventDispatcher.register('CustomerCreatedEvent', event1Handler);
    eventDispatcher.register('CustomerCreatedEvent', event2Handler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: '1',
      name: 'Customer 1',
      email: 'foo@example.com',
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEvent1Handler).toHaveBeenCalled();
    expect(spyEvent2Handler).toHaveBeenCalled();
  });

  it('Should be able to notify a customer\'s address change', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('CustomerChangedEvent', eventHandler);

    const customerChangedEvent = new CustomerChangedEvent({
      id: '1',
      name: 'Customer 1',
      address: 'Rua 1',
    });

    eventDispatcher.notify(customerChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
