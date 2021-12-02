export const configuration = () => {
  return {
    // application credentials
    ENVIRONMENT: `.${process.env.NODE_ENV}.env`,
    PORT: process.env.PORT,
    GLOBAL_PREFIX: process.env.GLOBAL_PREFIX,

    // database
    DB: {
      DIALECT: process.env.DB_DIALECT,
      HOST: process.env.DB_HOST,
      NAME: process.env.DB_NAME,
      PORT: process.env.DB_PORT,
      USER: process.env.DB_USER,
      PASS: process.env.DB_PASS,
      AUTOLOADMODELS: process.env.DB_AUTOLOAD_MODELS
    },

    // json web token
    JWT: {
      SECRET: process.env.JWT_SECRET,
      EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      BEARER: process.env.JWT_BEARER
    },

    // bcrypt
    BCRYPT_SALT: process.env.BCRYPT_SALT,

    // redis
    REDIS: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT
    },

    // logger
    LOGGER: {
      META: process.env.LOGGER_META,
      APPNAME: process.env.LOGGER_APPNAME,
      INFO: {
        LEVEL: process.env.LOGGER_INFO_LEVEL,
        FILE: {
          PATH: process.env.LOGGER_INFO_FILE_PATH
        }
      },
      WARN: {
        LEVEL: process.env.LOGGER_WARN_LEVEL,
        FILE: {
          PATH: process.env.LOGGER_WARN_FILE_PATH
        }
      },
      ERROR: {
        LEVEL: process.env.LOGGER_ERROR_LEVEL,
        FILE: {
          PATH: process.env.LOGGER_ERROR_FILE_PATH
        }
      }
    },

    // roles
    ROLES: {
      KEY: process.env.ROLES_KEY,
      ADMIN: process.env.ROLES_ADMIN
    },

    // other params
    PROD_ENV: process.env.PROD_ENV
  }
}