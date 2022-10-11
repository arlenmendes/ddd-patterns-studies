import { v4 as uuid } from 'uuid';

import Customer from '../entity/customer';
import CustomerInterface from '../entity/customer.interface';
import Anddress from '../entity/obejct-values/address';

export default class CustomerFactory {
  public static create(name: string): CustomerInterface {
    const customer = new Customer(
      uuid(),
      name,
    );

    return customer;
  }

  public static createWithAddress(name: string, address: Anddress): CustomerInterface {
    const customer = new Customer(
      uuid(),
      name,
    );
    customer.changeAddress(address);

    return customer;
  }
}
