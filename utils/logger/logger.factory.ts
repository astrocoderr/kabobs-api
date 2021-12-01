import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';


export const loggerFactory = (configService) => ({
  level: configService.get('LOGGER.INFO.LEVEL'),
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.ms(),
    winston.format.padLevels(),
    nestWinstonModuleUtilities.format.nestLike(
      configService.get('LOGGER.APPNAME'),
      { prettyPrint: true }),
  ),
  defaultMeta: { service: configService.get('LOGGER.META') },
  transports: [
    new winston.transports.File({
      filename: configService.get('LOGGER.INFO.FILE.PATH'),
      level: configService.get('LOGGER.INFO.LEVEL'),
    }),
    new winston.transports.File({
      filename: configService.get('LOGGER.ERROR.FILE.PATH'),
      level: configService.get('LOGGER.ERROR.LEVEL'),
    })
  ],
})