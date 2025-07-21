import winston, { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '@config';
import path from 'path';
import fs from 'fs';

const logDir = 'src/logs';
const logFileName = 'logfile.log'

if(!fs.existsSync(logDir)){
  fs.mkdirSync( logDir );
}

const formatLogger = format.combine(
  format.timestamp({
    format: 'YYYY-MM-dd HH:mm:ss,SSS'
  }),
  format.printf((info) => {
    const folio = info.folio ? `, ${info.folio}` : '';
    return `[${info.timestamp}] - [${info.level.toUpperCase().padEnd(7)}${folio}] : ${info.message}`;
  })
);


const logTransportsOptions = [
  new transports.Console({
    format: format.colorize({ all: true })
  }),
  new transports.File({ filename: path.join(logDir, logFileName) }),
  new DailyRotateFile({
    // frequency: '3m',
    dirname: logDir,
    filename: path.join(logDir, '/%DATE%.log'),
    datePattern: 'DD-MM-YYYY',
    zippedArchive: false,
    maxSize: '50m',
    maxFiles: '14d',
    json: true,

    createSymlink: true,
    symlinkName: path.join(logDir, logFileName),
  }),
]


const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    notice: 4,
    debug: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    notice: 'cyan',
    debug: 'blue',
  }
  // ? AVAILABLE COLORS: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
};

const logger = createLogger({ 
  level: config.logs.level,
  levels: customLevels.levels,
  format: formatLogger,
  defaultMeta: {service : 'user-service'},
  transports: logTransportsOptions
});


winston.addColors(customLevels.colors);


export default logger;
