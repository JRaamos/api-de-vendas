import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";


export class ProductsController {

  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  };

  public async ProductCreate(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const products = await this.productService.createProduct({ name, price, quantity });

    return response.status(201).json(products);
  };

  public async ProductList(request: Request, response: Response): Promise<Response> {
    const products = await this.productService.ListProduct();

    return response.json(products);
  };

  public async ProductShow(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const products = await this.productService.ShowProduct(id);

    return response.json(products);
  };

  public async ProductUpdate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const products = await this.productService.UpdateProduct({ id, name, price, quantity });

    return response.json(products);
  };

  public async ProductDelete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    console.log(id);

    await this.productService.DeleteProduct(id);

    return response.json([]);
  };
};
