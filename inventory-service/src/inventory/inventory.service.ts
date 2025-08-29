import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly repo: Repository<Inventory>,
    private readonly http: HttpService,
  ) {}

  async create(producto_id: number, cantidad: number) {

    const product = await this.fetchProduct(producto_id);

    if (!product) throw new NotFoundException('Producto no encontrado');

    const inventory = await this.repo.findOne({ where: { producto_id } });

    if (!inventory) {

      const newInventory = this.repo.create({ producto_id, cantidad });
      return this.repo.save(newInventory);

    }

    return inventory;

  }

  async getStock(producto_id: number) {

    const inventory = await this.repo.findOne({ where: { producto_id } });

    if (!inventory) throw new NotFoundException('Inventario no encontrado');
    
    const product = await this.fetchProduct(producto_id);

    return {
      producto: product,
      cantidad: inventory.cantidad,
    };

  }

  async updateStock(producto_id: number, cantidadComprada: number) {

    const inventory = await this.repo.findOne({ where: { producto_id } });

    if (!inventory) throw new NotFoundException('Inventario no encontrado');

    inventory.cantidad -= cantidadComprada;

    if (inventory.cantidad < 0) inventory.cantidad = 0;

    const updated = await this.repo.save(inventory);

    console.log(`Inventario actualizado: producto ${producto_id}, cantidad ${updated.cantidad}`);

    return updated;

  }

  private async fetchProduct(producto_id: number) {

    try {
      
      const res = await firstValueFrom(
        this.http.get(`${process.env.PRODUCTS_API_URL}/api/v1/products/${producto_id}`,
          { headers: { 'x-api-key': process.env.PRODUCTS_API_KEY || 'secret-products-123' } }
        )
      );

      return res.data.data.attributes;

    } catch (err) {

      throw new NotFoundException('Producto no encontrado en products-service');

    }

  }
}