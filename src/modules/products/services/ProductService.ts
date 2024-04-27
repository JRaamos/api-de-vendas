import AppError from "../../../shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import { Product } from "../typeorm/entities/Product";

interface IRequest {
  id?: string;
  name: string;
  price: number;
  quantity: number;
}

/**Class to deal with services related to products*/
export class ProductService {

  /** Method for creating products in the service layer.*/
  public async createProduct({ name, price, quantity }: IRequest): Promise<Product> {

    const productByName = await ProductRepository.findByName(name)

    if (productByName?.name === name) {
      throw new AppError('Product already exists')
    }

    const product = ProductRepository.create({
      name, price, quantity
    })
    await ProductRepository.save(product)

    return product
  }
  /**Method for searching for all products in the service layer */
  public async ListProduct(): Promise<Product[]> {
    const products = ProductRepository.find()

    return products
  }

  /**Method for searching for a single service, in the service layer */
  public async ShowProduct(id: string): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError("Product not found.")
    }

    return product;
  }

  /**Method to modify a product according to the id passed */
  public async UpdateProduct({ id, name, price, quantity }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError("Product not found.")
    }

    const productByName = await ProductRepository.findByName(name)

    if (productByName && name !== product.name) {
      throw new AppError('Product already exists')
    }

    product.name = name
    product.price = price
    product.quantity = quantity

    await ProductRepository.save(product)

    return product;
  }

  /**Method to delete a product according to the id passed */
  public async DeleteProduct(id: string): Promise<void> {
    const product = this.ShowProduct(id)
    if (await product) {
      ProductRepository.delete(id)
    }
  }
}
