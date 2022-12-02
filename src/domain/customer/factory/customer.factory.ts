import { v4 as uuid } from 'uuid';

import Customer from '../entity/customer';
import Address from '../entity/obejct-values/address';

export default class CustomerFactory {
  public static create(name: string): Customer {
    const customer = new Customer(
      uuid(),
      name,
    );

    return customer;
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(
      uuid(),
      name,
    );
    customer.changeAddress(address);

    return customer;
  }
}
