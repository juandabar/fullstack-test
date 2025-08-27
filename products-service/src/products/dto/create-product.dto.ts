import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @IsPositive()
  precio: number;
}