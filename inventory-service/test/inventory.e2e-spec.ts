import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { InventoryService } from '../src/inventory/inventory.service';

describe('InventoryController (e2e)', () => {

  let app: INestApplication;
  let service: InventoryService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(InventoryService)
      .useValue({
        getStock: jest.fn().mockResolvedValue({
          producto: { id: 1, nombre: 'Laptop mockeada', precio: 2500 },
          cantidad: 50,
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<InventoryService>(InventoryService);

  });


  afterAll(async () => {
    await app.close();
  });

  it('/inventory/:id (GET) debería devolver inventario con producto', async () => {
    
    return request(app.getHttpServer())
      .get('/inventory/1')
      .set('x-api-key', process.env.API_KEY || 'secret-inventory-456')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          producto: { id: 1, nombre: 'Laptop mockeada', precio: 2500 },
          cantidad: 50,
        });
      });

  });

});