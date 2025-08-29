import { IsString, IsNumber, IsPositive, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Lenovo' })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({ description: 'Precio del producto', example: 2500 })
  @IsNumber()
  @IsPositive()
  precio: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}