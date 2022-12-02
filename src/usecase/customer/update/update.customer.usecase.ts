import Address from '../../../domain/customer/entity/obejct-values/address';
import CustomerRepositoryInternface from '../../../domain/customer/repository/customer-repository.interface';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update.customer.update.dto';

export default class UpdateCustomerUsecase {
  private customerRepository: CustomerRepositoryInternface;

  constructor(customerRepository: CustomerRepositoryInternface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
      ),
    );

    await this.customerRepository.update(customer);

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
