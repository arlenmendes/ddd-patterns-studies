import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/entity/obejct-values/address';
import FindCustomerUseCase from './find.customer.usecase';

const customer = new Customer('123', 'John Doe');
const address = new Address('Street Escorrega um cai dois', 123, '39300-000', 'SF');
customer.changeAddress(address);

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = mockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    const output = {
      id: '123',
      name: 'John Doe',
      address: {
        street: 'Street Escorrega um cai dois',
        number: 123,
        zip: '39300-000',
        city: 'SF',
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error if customer not found', async () => {
    const customerRepository = mockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('customer not found');
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '123',
    };

    expect(() => usecase.execute(input)).rejects.toThrow('Customer not found');
  });
});
