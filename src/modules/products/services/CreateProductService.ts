import AppError from "@shared/errors/AppError";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import { Repository } from "typeorm";
import { Product } from "../typeorm/entities/Product";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
export class CreateProductService {
  public async createService({ name, price, quantity }: IRequest): Promise<Product> {

    const productRepository = await ProductRepository.findByName(name)

    if (productRepository) {
      throw new AppError('Product already exists')
    }

    const product = ProductRepository.create({
      name, price, quantity
    })
    await ProductRepository.save(product)

    return product
  }
}
