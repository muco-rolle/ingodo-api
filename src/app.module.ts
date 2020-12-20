import { Module } from '@nestjs/common';
import { config } from 'config';

@Module({
	imports: [config.env()],
})
export class AppModule {}
