import { Sequelize } from 'sequelize-typescript';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order-item';
import Customer from '../../../../domain/customer/entity/customer';
import Address from '../../../../domain/customer/entity/obejct-values/address';
import Product from '../../../../domain/product/entity/product';
import CustomerModel from '../../../customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../customer/repository/sequelize/customer.repository';
import ProductModel from '../../../product/repository/sequelize/product.model';
import ProductRepository from '../../../product/repository/sequelize/product.repository';
import OrderItemModel from './order-item.model';
import OrderModel from './order.model';
import OrderRepository from './order.repository';

describe('Order repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: orderItem.productId,
        },
      ],
    });
  });

  it('should update a order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const product2 = new Product('1234', 'Product 2', 15);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      '12',
      product2.name,
      product2.price,
      product2.id,
      5,
    );

    order.addItem(orderItem2);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: '123',
          product_id: orderItem2.productId,
        },
      ],
    });
  });

  it('should find one order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    const foundOrder = await orderRepository.find('123');

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: foundOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: orderItem.productId,
        },
      ],
    });
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('123', 'Product 1', 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    );

    const order = new Order('123', '123', [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrders = await orderRepository.findAll();

    expect([order]).toEqual(foundOrders);
  });
});