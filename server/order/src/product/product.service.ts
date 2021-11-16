import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDocument> {
    const product = new this.productModel(createProductDto);
    await product.save();
    return product;
  }

  async findAll(): Promise<ProductDocument[]> {
    const products = await this.productModel.find();
    return products;
  }

  async findOne(id: string): Promise<ProductDocument> {
    const product = await this.productModel.findById(id);
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    await this.productModel.findByIdAndDelete(id);
    return `remove product ${id} successfully`;
  }
}
