import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController', () => {
    
  let controller: InventoryController;
  let service: InventoryService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: {
            create: jest.fn(),
            getStock: jest.fn(),
            updateStock: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
    service = module.get<InventoryService>(InventoryService);

  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    it('debería crear un inventario y devolverlo', async () => {

      const dto = { producto_id: 1, cantidad: 50 };
      const result = { id: 1, ...dto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(1, 50);
      
    });

  });

  describe('getStock', () => {

    it('debería devolver el stock de un producto', async () => {

      const result = {
        producto: { id: 1, nombre: 'Laptop', precio: 2500 },
        cantidad: 50,
      };

      jest.spyOn(service, 'getStock').mockResolvedValue(result);

      expect(await controller.getStock(1)).toEqual(result);
      expect(service.getStock).toHaveBeenCalledWith(1);

    });

  });

  describe('updateStock', () => {

    it('debería actualizar el stock de un producto', async () => {

      const dto = { cantidadComprada: 5 };
      const result = { id: 1, producto_id: 1, cantidad: 45 };

      jest.spyOn(service, 'updateStock').mockResolvedValue(result);

      expect(await controller.updateStock(1, dto)).toEqual(result);
      expect(service.updateStock).toHaveBeenCalledWith(1, 5);
      
    });

  });


});