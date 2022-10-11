import { v4 as uuid } from 'uuid';

import Product from '../entity/product';
import ProductDoublePrice from '../entity/product-double-price';
import ProductInterface from '../entity/product.interface';

export default class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'Product':
        return new Product(uuid(), name, price);
      case 'Double Price':
        return new ProductDoublePrice(uuid(), name, price);
      default:
        throw new Error('Invalid type');
    }
  }
}
