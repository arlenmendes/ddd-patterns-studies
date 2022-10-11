import CustomerFactory from './customer.factory';
import Address from '../entity/obejct-values/address';

describe('Customer Factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('Customer');
    expect(customer.name).toBe('Customer');
    expect(customer.id).toBeDefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('Rua A', 3123, '37200680', 'Belo Horizonte');
    const customer = CustomerFactory.createWithAddress('Customer', address);
    expect(customer.name).toBe('Customer');
    expect(customer.Address).toEqual(address);
    expect(customer.id).toBeDefined();
    expect(customer.isActive()).toBe(true);
  });
});
