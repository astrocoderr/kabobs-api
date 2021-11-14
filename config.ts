// import config from 'config'
// import dotenv from 'dotenv'
// import fs from 'fs'
//
// import envs from './constants/envs'
// import env, { IS_TEST } from './utils/env'
//
// import logger from './utils/logs/logger'
//
// if(!IS_TEST){
//   dotenv.config();
// }
//
// if(!envs[env]){
//   logger.error(`unknown env '${env}'`);
//   throw Error(`unknown env '${env}'`);
// }
//
const PORT = Number(process.env.PORT),

      DB_DIALECT = String(process.env.DB_DIALECT),
      DB_HOST = process.env.DB_HOST,
      DB_NAME = process.env.DB_NAME,
      DB_PORT = Number(process.env.DB_PORT),
      DB_USER = process.env.DB_USER,
      DB_PASS = process.env.DB_PASS;

console.log(PORT)
console.log(process.env.EXPIRES_IN)
console.log(DB_DIALECT)
console.log(DB_HOST)
console.log(DB_NAME)
console.log(DB_PORT)
console.log(DB_USER)
console.log(DB_PASS)

//
//
//   SMS_HOST = config.has('sms.host') ?
//     config.get('sms.host') : null,
//   SMS_LOGIN = config.has('sms.login') ?
//     config.get('sms.login') : null,
//   SMS_PASSWORD = config.has('sms.password') ?
//     config.get('sms.password') : null
//
//
// if(!JWT_SECRET){
//   logger.error(`----- You must pass jwt secret string -----      `)
//   throw Error(`You must pass jwt secret string`)
// }
//
// if(!ERRS){
//   logger.error(`----- Error messages file is not found -----      `)
//   throw Error(`Error file is not found`)
// }
//

//
if(!PORT){
  throw new Error(`UTF length is not found`);
}

if(!DB_DIALECT || !DB_HOST || !DB_NAME || !DB_PORT || !DB_USER || !DB_PASS){
  // logger.error(`----- uri is not found -----      `)
  throw new Error(`DB credential(s) is not found`)
}
//
// if(!GENERATE_PASSWORD_LENGTH){
//   logger.error(`----- Generate password length is not found -----      `)
//   throw Error(`Generate password length is not found`)
// }
//
// // if(!CLIENT_APP_IMAGES_PATH){
// // 	logger.error(`----- Client app images path is not found -----      `)
// // 	throw Error(`Client app images path is not found`)
// // }
//
// if(!SMS_HOST && !SMS_LOGIN && !SMS_PASSWORD){
//   logger.error(`----- SMS credential is not found -----      `);
//   throw Error(`----- SMS credential is not found -----      `);
// }
//
// const errors_raw_data = fs.readFileSync(__dirname + ERRS);
// const errors = JSON.parse(errors_raw_data);
//
// const ERRORS = errors['errors']
//
// export {
//   PORT, MONGO_URI, JWT_SECRET, REDIS_PORT,
//   ERRORS, errors, CHARSET, GENERATE_PASSWORD_LENGTH,
//   // CLIENT_APP_IMAGES_PATH,
//
//   SMS_HOST, SMS_LOGIN, SMS_PASSWORD
// }
//

export {
  PORT,

  DB_DIALECT, DB_HOST, DB_NAME,
  DB_PORT, DB_USER, DB_PASS
}
