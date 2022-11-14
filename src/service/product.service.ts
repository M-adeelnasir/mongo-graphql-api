import { User } from '../schema/user.schema';
import {
  ProductModel,
  CreateProductInput,
  GetProduct,
} from '../schema/product.schema';
export class ProductService {
  async createProductSrv(
    input: CreateProductInput & { createdBy: User['_id'] }
  ) {
    try {
      const product = await ProductModel.create(input);
      return product;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getProductSrv(input: GetProduct) {
    try {
      const product = await ProductModel.findById({ _id: input._id }).lean();
      return product;
    } catch (err) {
      return null;
    }
  }
  async getAllProductSrv() {
    const products = await ProductModel.find({}).lean();
    return products;
  }

  async updateProductSrv(
    queryInput: GetProduct,
    updateInput: CreateProductInput
  ) {
    try {
      const product = await ProductModel.findByIdAndUpdate(
        { _id: queryInput },
        updateInput,
        { new: true, runValidators: true }
      ).lean();
      return product;
    } catch (err) {
      return null;
    }
  }
  async deleteProductSrv(queryInput: GetProduct) {
    await ProductModel.findByIdAndDelete({ _id: queryInput._id });
    return null;
  }
}
