import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  try {
    await app.listen(process.env.PORT || 3000);
    const url = await app.getUrl();
    console.log(`Server started on ${url}`);
  } catch (err) {
    console.error('Error starting server:', err);
  }
}
bootstrap().catch((err) => {
  console.error('Unhandled error in bootstrap:', err);
});
