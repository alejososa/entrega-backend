import winston from "winston";
import config from "./config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "blue",
        http: "green",
        debug: "green",
    },
};

export let logger

if (config.enviroment === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({level: "info"}),
            new winston.transports.File({
                filename: "./errors.log",
                level: "error",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
        ],
    });
} else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevels.colors}),
                    winston.format.simple()
                ),
            }),
        ],
    });
}

export default logger;