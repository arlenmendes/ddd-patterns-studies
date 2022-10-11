import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';

describe('Order factory unit tests', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          quantity: 3,
          price: 13.5,
          productId: uuid(),
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBe(orderProps.id);
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(1);
  });
});
