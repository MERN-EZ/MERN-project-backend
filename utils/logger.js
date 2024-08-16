import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: `SYS:hh:MM`,
      ignore: 'pid,hostname',
    },
  },
});

export default logger;
