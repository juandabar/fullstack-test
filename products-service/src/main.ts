import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JsonApiInterceptor } from './common/interceptors/json-api.interceptor'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalInterceptors(
    new JsonApiInterceptor()
  );

  const config = new DocumentBuilder()
    .setTitle('Productos API')
    .setDescription('API para gestión de productos')
    .setVersion('1.0')
    .addTag('products')
    .addApiKey(
      {type: 'apiKey', name: 'x-api-key', in: 'header'},
      'API-KEY'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT ?? 3001;
  await app.listen(PORT, () => {
    console.log(`products-service::${PORT}`)
  });

}
bootstrap();
