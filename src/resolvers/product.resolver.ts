import { GetProduct } from '../schema/product.schema';
import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';
import { CreateProductInput, Product } from '../schema/product.schema';
import { ProductService } from '../service/product.service';
import { Context } from '../types/context';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }
  @Mutation(() => Product)
  async createProduct(
    @Arg('input') input: CreateProductInput,
    @Ctx() { user }: Context
  ): Promise<Product | null> {
    return await this.productService.createProductSrv({
      ...input,
      createdBy: user!._id,
    });
  }
  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg('input') input: CreateProductInput,
    @Arg('query') query: GetProduct
  ): Promise<Product | null> {
    return await this.productService.updateProductSrv(query, input);
  }

  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Arg('query') query: GetProduct): Promise<null> {
    await this.productService.deleteProductSrv(query);
    return null;
  }

  @Query(() => Product)
  getProduct(@Arg('query') query: GetProduct): Promise<Product | null> {
    return this.productService.getProductSrv(query);
  }

  @Query(() => Product)
  async getAllProducts() {
    return await this.productService.getAllProductSrv();
  }
}
