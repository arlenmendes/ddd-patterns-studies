import Address from './obejct-values/address';

export default interface CustomerInterface {
  get id(): string;
  get name(): string;
  get Address(): Address;
  get rewardPoints(): number;
  isActive(): boolean;
}
