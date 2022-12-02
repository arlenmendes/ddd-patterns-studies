import { Sequelize } from 'sequelize-typescript';
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/entity/obejct-values/address';
import CustomerModel from '../../../infraestructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infraestructure/customer/repository/sequelize/customer.repository';
import FindCustomerUseCase from './find.customer.usecase';

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer('123', 'John Doe');
    const address = new Address('Street Escorrega um cai dois', 123, '39300-000', 'SF');
    customer.changeAddress(address);

    await customerRepository.create(customer);

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
});
