"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe('Customer unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let customer = new customer_1.default("", "João");
        }).toThrowError("Id is required");
    });
    it('should throw error when name is empty', () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it('should change name', () => {
        //Arrange
        const customer = new customer_1.default("123", "Joao");
        // Act
        customer.changeName("Maria");
        //Assert
        expect(customer.name).toBe("Maria");
    });
    it('should activate  Customer', () => {
        //Arrange
        const customer = new customer_1.default("123", "Joao");
        const address = new address_1.default("Street One", 123, "37200-000", "Lavras");
        customer.address = address;
        customer.enable();
        expect(customer.isActive()).toBe(true);
    });
    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("1", "Customer 1");
            customer.enable();
        }).toThrowError("Address is mandatory to activate a customer");
    });
    it("should deactivate custom er", () => {
        const customer = new customer_1.default("1", "Carol");
        customer.disable();
        expect(customer.isActive()).toBe(false);
    });
    it("should add reward points", () => {
        const customer = new customer_1.default("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});
