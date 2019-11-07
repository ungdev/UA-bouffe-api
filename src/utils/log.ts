import { createLogger, format, transports } from 'winston';
import moment from 'moment';

const { combine, colorize, printf } = format;

const customFormat = printf(({ level, message }) => `${moment().format('H:mm:ss')} ${level}: ${message}`);

const logger = createLogger({
  transports: [new transports.Console()],
  format: combine(colorize(), customFormat),
});

export default logger;
