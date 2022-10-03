"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Customer {
    constructor(id, name) {
        this._anabled = true;
        this._id = id;
        this._name = name;
        this._rewardPoints = 0;
        this.validate();
    }
    get name() { return this._name; }
    get rewardPoints() { return this._rewardPoints; }
    get id() { return this._id; }
    validate() {
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
    }
    changeName(name) {
        this._name = name;
    }
    enable() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._anabled = true;
    }
    disable() {
        this._anabled = false;
    }
    isActive() {
        return this._anabled;
    }
    set address(address) {
        this._address = address;
    }
    addRewardPoints(rewardPoints) {
        this._rewardPoints += rewardPoints;
    }
}
exports.default = Customer;
