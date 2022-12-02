import Address from '../../../domain/customer/entity/obejct-values/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import UpdateCustomerUsecase from './update.customer.usecase';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address(
    'Street',
    1234,
    '12345',
    'City',
  ),
);

const input = {
  id: customer.id,
  name: 'John Doe Updated',
  address: {
    street: 'Street Escorrega um cai dois Updated',
    number: 4321,
    zip: '39300-000 Updated',
    city: 'SF',
  },
};

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit Test update customer use case', () => {
  it('should update a customer', async () => {
    const customerRepository = mockRepository();
    const usecase = new UpdateCustomerUsecase(customerRepository);
    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
