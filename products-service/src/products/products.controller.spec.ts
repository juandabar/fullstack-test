import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        findAll: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);

    });

    it('debería estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {

        it('debería crear un producto y devolverlo', async () => {

            const dto: CreateProductDto = { nombre: 'Laptop', precio: 2500 };
            const result = { id: 1, ...dto };

            jest.spyOn(service, 'create').mockResolvedValue(result);

            expect(await controller.create(dto)).toEqual(result);
            expect(service.create).toHaveBeenCalledWith(dto);

        });
    });

    describe('findOne', () => {

        it('debería devolver un producto por id', async () => {

            const result = { id: 1, nombre: 'Mouse', precio: 150 };
            jest.spyOn(service, 'findOne').mockResolvedValue(result);

            expect(await controller.findOne(1)).toEqual(result);
            expect(service.findOne).toHaveBeenCalledWith(1);

        });

    });

    describe('findAll', () => {
        it('debería devolver lista de productos', async () => {

            const result = [
                { id: 1, nombre: 'Laptop', precio: 2500 },
                { id: 2, nombre: 'Mouse', precio: 150 },
            ];
            jest.spyOn(service, 'findAll').mockResolvedValue(result);

            expect(await controller.findAll()).toEqual(result);
            expect(service.findAll).toHaveBeenCalled();

        });
    });

    describe('update', () => {
        it('debería actualizar un producto y devolverlo', async () => {

            const dto = { nombre: 'Teclado mecánico' };
            const result = { id: 1, nombre: 'Teclado mecánico', precio: 500 };

            jest.spyOn(service, 'update').mockResolvedValue(result);

            expect(await controller.update(1, dto)).toEqual(result);
            expect(service.update).toHaveBeenCalledWith(1, dto);

        });
    });

    describe('remove', () => {

        it('debería eliminar un producto', async () => {

            const result = { id: 1, nombre: 'Monitor', precio: 1200 };

            jest.spyOn(service, 'remove').mockResolvedValue(result);

            expect(await controller.remove(1)).toEqual(result);
            expect(service.remove).toHaveBeenCalledWith(1);
            
        });

    });
    
});