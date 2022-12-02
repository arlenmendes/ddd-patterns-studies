import CustomerInterface from './customer.interface';
import Address from './obejct-values/address';

export default class Customer {
  private _id: string;

  private _name: string;

  private _address!: Address;

  private _anabled: boolean = true;

  private _rewardPoints: number;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._rewardPoints = 0;
    this.validate();
  }

  get name(): string { return this._name; }

  get rewardPoints(): number { return this._rewardPoints; }

  get id(): string { return this._id; }

  get Address(): Address {
    return this._address;
  }

  validate(): void {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }

    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  enable() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._anabled = true;
  }

  disable() {
    this._anabled = false;
  }

  isActive(): boolean {
    return this._anabled;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  addRewardPoints(rewardPoints: number) {
    this._rewardPoints += rewardPoints;
  }
}
