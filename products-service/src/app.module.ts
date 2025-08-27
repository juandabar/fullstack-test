import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { ApiKeyMiddleware } from './common/middleware/key.middleware';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: Number(process.env.DATABASE_PORT) || 3308,
      username: process.env.DATABASE_USER || 'testuser',
      password: process.env.DATABASE_PASSWORD || 'testpass',
      database: process.env.DATABASE_NAME || 'fullstack',
      entities: [Product],
      synchronize: true,
    }),
    ProductsModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiKeyMiddleware).forRoutes('*')
  }
}
