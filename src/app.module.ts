import { Module } from '@nestjs/common';
import { config } from 'config';
import { UserModule } from 'modules/user/user.module';

@Module({
	imports: [
		config.env(),
		config.graphql(),
		config.mongodb(),
		config.mailer(),
		UserModule,
	],
})
export class AppModule {}
