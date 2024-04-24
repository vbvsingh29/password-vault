import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
