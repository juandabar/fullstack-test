import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiBody, ApiTags, ApiResponse, ApiParam, ApiSecurity } from '@nestjs/swagger';
import {
  createInventoryResponse,
  getInventoryProductResponse,
  updateInventoryResponse
} from './dto/inventory.response.dto'


@ApiTags('inventory')
@ApiSecurity('API-KEY')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  @ApiBody({
    description: 'Datos del inventario a crear.',
    schema: {
      example: {
          producto_id: 1,
          cantidad: 10
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Inventario creado', schema: {example: createInventoryResponse} })
  create(@Body() body: { producto_id: number; cantidad: number }) {
    return this.service.create(body.producto_id, body.cantidad);
  }

  @Get(':producto_id')
  @ApiParam({ name: 'producto_id', type: Number })
  @ApiResponse({ status: 200, description: 'Inventario encontrado', schema: {example: getInventoryProductResponse} })
  getStock(@Param('producto_id') producto_id: number) {
    return this.service.getStock(producto_id);
  }

  @Put(':producto_id')
  @ApiBody({
    description: 'Cantidad de producto comprado para descontar del stock',
    schema: {
      example: {
        cantidadComprada: 5,
      },
    },
  })
  @ApiParam({ name: 'producto_id', type: Number })
  @ApiResponse({ status: 200, description: 'Inventario actualizado', schema: {example: updateInventoryResponse} })
  updateStock(
    @Param('producto_id') producto_id: number,
    @Body() body: { cantidadComprada: number },
  ) {
    return this.service.updateStock(producto_id, body.cantidadComprada);
  }
}