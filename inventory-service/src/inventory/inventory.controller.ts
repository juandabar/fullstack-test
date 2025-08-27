import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Post()
  create(@Body() body: { producto_id: number; cantidad: number }) {
    return this.service.create(body.producto_id, body.cantidad);
  }

  @Get(':producto_id')
  getStock(@Param('producto_id') producto_id: number) {
    return this.service.getStock(producto_id);
  }

  @Put(':producto_id')
  updateStock(
    @Param('producto_id') producto_id: number,
    @Body() body: { cantidadComprada: number },
  ) {
    return this.service.updateStock(producto_id, body.cantidadComprada);
  }
}