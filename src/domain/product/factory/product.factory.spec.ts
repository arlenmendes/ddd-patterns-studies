import ProductFactory from './product.factory';

describe('Product Factory unit test', () => {
  it('should create a product', () => {
    const product = ProductFactory.create('Product', 'Produto Legal', 10);
    expect(product.name).toBe('Produto Legal');
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product double price', () => {
    const productDoublePrice = ProductFactory.create('Double Price', 'Produto Dobro Preco', 15);
    expect(productDoublePrice.name).toBe('Produto Dobro Preco');
    expect(productDoublePrice.price).toBe(30);
    expect(productDoublePrice.constructor.name).toBe('ProductDoublePrice');
  });

  it('should throw an error when create a product with invalid type', () => {
    expect(() => ProductFactory.create('Invalid Type', 'Produto Dobro Preco', 15)).toThrowError(
      'Invalid type',
    );
  });
});
