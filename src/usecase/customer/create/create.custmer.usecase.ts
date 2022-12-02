import Address from '../../../domain/customer/entity/obejct-values/address';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';
import CustomerRepository from '../../../infraestructure/customer/repository/sequelize/customer.repository';
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from './create.customer.dto';

export default class CreateCustomerUseCase {
  constructor(private customerRepository: CustomerRepository) { }

  async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
      ),
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
