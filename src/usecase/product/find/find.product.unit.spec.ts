import { v4 as uuid } from 'uuid';
import FindProductUseCase from './find.product.usecase';

const product = {
  id: uuid(),
  name: 'Product 1',
  price: 10.25,
};

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit test for find product', () => {
  it('should return a product', async () => {
    const productRepository = mockRepository();

    const findProductUseCase = new FindProductUseCase(productRepository);

    const result = await findProductUseCase.execute({ id: product.id });

    expect(result).toEqual(product);
  });

  it('should throw an error if product not found', async () => {
    const productRepository = mockRepository();

    const useCase = new FindProductUseCase(productRepository);

    expect(() => useCase.execute({ id: '12312' })).rejects.toThrow('Product not found');
  });
});
