import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateProductDto } from 'product/dto/create-product.dto';

class ProductDto extends CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  readonly products: ProductDto[];

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly address: string;
}
