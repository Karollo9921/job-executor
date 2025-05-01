import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export async function init(app: INestApplication, port: number): Promise<void> {
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
