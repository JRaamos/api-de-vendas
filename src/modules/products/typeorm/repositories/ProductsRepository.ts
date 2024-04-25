import { DataSource, Repository } from "typeorm";

import { Product } from "../entities/Product";
import { PostgresDataSource } from "@shared/typeorm";

export const ProductRepository = PostgresDataSource.getRepository(Product).extend({
  findByName(name: string): Promise<Product | null> {
    return this.findOne({ where: { name } });
  }
})
