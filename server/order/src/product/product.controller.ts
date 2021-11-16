import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  SerializeOptions,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'auth/auth/decorators/roles.decorator';
import { RolesGuard } from 'auth/auth/guards/roles.guard';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
@UseGuards(RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    return new ProductEntity(product.toObject());
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findAll() {
    const products = await this.productService.findAll();
    return products.map((product) => new ProductEntity(product.toObject()));
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return new ProductEntity(product.toObject());
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
