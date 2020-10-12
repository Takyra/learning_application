const winston = require('winston');
const ENV     = process.env.NODE_ENV;

module.exports = module => {
    const path   = module.filename.split('/').slice(-2).join('/');
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.label({ label: path }),
            winston.format.colorize(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.File({
                filename: 'error.log',
                level: 'error'
            }),
            new winston.transports.File({
                filename: 'combined.log'
            }),
        ],
    });

    if (ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

    return logger;
};