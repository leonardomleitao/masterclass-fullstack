import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ErrorFilter from './shared/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().catch((err) => {
  console.error('Erro ao iniciar a aplicação:', err);
  process.exit(1);
});
