import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly price: number;
}
