import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ENV_FILE } from 'config';
import { join } from 'path';

export const config = {
	/**
	 * Configuration for env files
	 ***********************************************/
	env() {
		return ConfigModule.forRoot({
			envFilePath: ENV_FILE,
			isGlobal: true,
			cache: true,
			expandVariables: true,
			validationSchema: Joi.object({
				APP_HOST: Joi.string().required(),
				APP_PORT: Joi.number().required(),
				APP_URL: Joi.string().required(),

				ACCESS_TOKEN_KEY: Joi.string().required(),
				ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().required(),

				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.number().required(),
				DB_NAME: Joi.string().required(),
				DB_URL: Joi.string().required(),

				MAIL_HOST: Joi.string().required(),
				MAIL_PORT: Joi.number().required(),
				MAIL_USER: Joi.string().required(),
				MAIL_PASSWORD: Joi.string().required(),
			}),
		});
	},

	/**
	 * Configuration for graphql (apollo server)
	 ***********************************************/
	graphql() {
		return GraphQLModule.forRoot({
			autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
		});
	},
};
