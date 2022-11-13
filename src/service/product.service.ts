import {
  ProductModel,
  CreateProductInput,
  GetProduct,
} from '../schema/product.schema';
export class ProductService {
  async create(input: CreateProductInput) {
    const product = await ProductModel.create(input);
    return product;
  }

  async get(input: GetProduct) {
    const product = await ProductModel.findById({ _id: input._id }).lean();
    return product;
  }
  async getAll() {
    const products = await ProductModel.find({}).lean();
    return products;
  }

  async update(queryInput: GetProduct, updateInput: CreateProductInput) {
    const product = await ProductModel.findByIdAndUpdate(
      { _id: queryInput },
      updateInput,
      { new: true, runValidators: true }
    ).lean();
    return product;
  }
  async delete(queryInput: GetProduct) {
    await ProductModel.findByIdAndDelete({ _id: queryInput._id });
    return null;
  }
}
