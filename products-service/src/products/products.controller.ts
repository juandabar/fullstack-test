import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import { 
  createProductResponse,
  getAllProductsResponse,
  getProductResponse,
  updateProductResponse,
  deleteProductResponse
} from './dto/product-response.dto'

@ApiTags('products')
@ApiSecurity('API-KEY')
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'Producto creado', schema: {example: createProductResponse} })
  create(@Body() data: CreateProductDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Productos obtenidos', schema: { example: getAllProductsResponse } })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto obtenido', schema: { example: getProductResponse } })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  @ApiResponse({ status: 200, description: 'Producto actualizado', schema: { example: updateProductResponse } })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Producto eliminado', schema: { example: deleteProductResponse } })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}