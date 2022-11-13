import { Resolver, Mutation } from 'type-graphql';
import { Product } from '../schema/product.schema';

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct() {}
}
