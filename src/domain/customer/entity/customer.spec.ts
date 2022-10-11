import Anddress from './obejct-values/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'João');
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '');
    }).toThrowError('Name is required');
  });

  it('should change name', () => {
    // Arrange
    const customer = new Customer('123', 'Joao');

    // Act
    customer.changeName('Maria');

    // Assert
    expect(customer.name).toBe('Maria');
  });

  it('should activate  Customer', () => {
    // Arrange
    const customer = new Customer('123', 'Joao');
    const address = new Anddress('Street One', 123, '37200-000', 'Lavras');

    customer.changeAddress(address);
    customer.enable();

    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when you activate a customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.enable();
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it('should deactivate custom er', () => {
    const customer = new Customer('1', 'Carol');

    customer.disable();

    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
