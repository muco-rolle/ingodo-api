import { Module } from '@nestjs/common';
import { config } from 'config';
import { UserModule } from 'modules/user/user.module';

@Module({
	imports: [config.env(), config.graphql(), UserModule],
})
export class AppModule {}
