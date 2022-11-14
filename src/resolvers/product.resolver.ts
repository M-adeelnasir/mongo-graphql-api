import { GetProduct } from '../schema/product.schema';
import { Resolver, Mutation, Arg, Query, Ctx, Authorized } from 'type-graphql';
import {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from '../schema/product.schema';
import { ProductService } from '../service/product.service';
import { Context } from '../types/context';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Authorized()
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

  @Authorized()
  @Mutation(() => Product, { nullable: true })
  async updateProduct(
    @Arg('input') input: UpdateProductInput,
    @Arg('query') query: GetProduct
  ): Promise<Product | null> {
    return await this.productService.updateProductSrv(query, input);
  }

  @Authorized()
  @Mutation(() => Product, { nullable: true })
  async deleteProduct(@Arg('query') query: GetProduct): Promise<null> {
    await this.productService.deleteProductSrv(query);
    return null;
  }

  @Query(() => Product)
  getProduct(@Arg('query') query: GetProduct): Promise<Product | null> {
    return this.productService.getProductSrv(query);
  }

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[] | null> {
    try {
      return await this.productService.getAllProductSrv();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
