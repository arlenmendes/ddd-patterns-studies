import { v4 as uuid } from 'uuid';
import CreateProductUseCase from './create.product.usecase';

const input = {
  name: 'Product 1',
  price: 10.25,
};

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit test for create product', () => {
  it('should create a product', async () => {
    const productRepository = mockRepository();
    const output = {
      id: uuid(),
    };
    productRepository.create.mockImplementation(() => Promise.resolve(output));

    const createProductUseCase = new CreateProductUseCase(mockRepository());

    const result = await createProductUseCase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      ...input,
    });
  });
});
