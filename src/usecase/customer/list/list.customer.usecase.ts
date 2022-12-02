import Customer from '../../../domain/customer/entity/customer';
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface';
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from './list.customer.dto';

const customersListToOutputListDto = (customers: Customer[]): OutputListCustomerDTO => ({
  customers: customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    address: {
      street: customer.Address.street,
      city: customer.Address.city,
      zip: customer.Address.zip,
      number: customer.Address.number,
    },
  })),
});

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository;
  }

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return customersListToOutputListDto(customers);
  }
}
