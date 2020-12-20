import * as Joi from '@hapi/joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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

	/**
	 * Configuration for mongodb (mongoose)
	 ***********************************************/
	mongodb() {
		return MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				uri: config.get('DB_URL'),
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
			}),
			inject: [ConfigService],
		});
	},

	/**
	 * Configuration for nodemailer
	 ***********************************************/
	mailer() {
		return MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				transport: {
					host: config.get('MAIL_HOST'),
					port: +config.get('MAIL_PORT'),
					secure: false,
					auth: {
						user: config.get('MAIL_USER'),
						pass: config.get('MAIL_PASSWORD'),
					},
				},
				defaults: { from: 'Notebook <support@notebook.com>' },
				template: {
					dir: process.cwd() + '/src/templates/',
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),

			inject: [ConfigService],
		});
	},
};
