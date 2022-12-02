import CreateCustomerUseCase from './create.custmer.usecase';

const input = {
  name: 'John Doe',
  address: {
    street: 'Street Escorrega um cai dois',
    number: 123,
    zip: '39300-000',
    city: 'SF',
  },
};

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit Test create customer use case', () => {
  it('should create a customer', async () => {
    const customerRepository = mockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const output = {
      id: expect.any(String),
      ...input,
    };

    customerRepository.create.mockImplementation(() => Promise.resolve(output));

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error if customer\'s name is empty', async () => {
    const customerRepository = mockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = '';

    expect(() => usecase.execute(input)).rejects.toThrowError('Customer name is required');
  });

  it('should throw an error if customer\'s street is empty', async () => {
    const customerRepository = mockRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.street = '';

    expect(() => usecase.execute(input)).rejects.toThrowError('Customer street is required');
  });
});
