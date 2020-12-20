import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const logger = new Logger('Bootstrap');

	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const port = config.get('APP_PORT');
	const url = config.get('APP_URL');

	await app.listen(port, () => logger.log(`Server running on: ${url}`));
}
bootstrap();
