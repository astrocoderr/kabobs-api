import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(8081),
  GLOBAL_PREFIX: Joi.string().default('v1'),
  DB_DIALECT: Joi.string().default('postgres'),
  DB_HOST: Joi.string().default('127.0.0.1'),
  DB_NAME: Joi.string().valid('nutritionpro'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string(),
  DB_PASS: Joi.string(),
  DB_AUTOLOAD_MODELS: Joi.boolean().default(true),
  JWT_SECRET: Joi.string(),
  JWT_EXPIRES_IN: Joi.string().default('24h'),
  BCRYPT_SALT: Joi.number().default(10),
  REDIS_HOST: Joi.string().default('127.0.0.1'),
  REDIS_PORT: Joi.number().default(6379),
  LOGGER_INFO_LEVEL: Joi.string().default('info'),
  LOGGER_WARN_LEVEL: Joi.string().default('debug'),
  LOGGER_ERROR_LEVEL: Joi.string().default('error'),
  LOGGER_META: Joi.string().default('api'),
  LOGGER_INFO_FILE_PATH: Joi.string(),
  LOGGER_WARN_FILE_PATH: Joi.string(),
  LOGGER_ERROR_FILE_PATH: Joi.string(),
  LOGGER_APPNAME: Joi.string().default('api'),
  PROD_ENV: Joi.string().default('.production.env')
})