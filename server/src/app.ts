import { PORT } from "./utils/constant";
import createServer from "./utils/createServer";
import logger from "./utils/logger";
import { connectToDb, disconnectFromDb } from "./utils/db";

function graceFulShutdown(signal: string, server: any) {
  process.on(signal, async () => {
    logger.info(`Goodbye,got signal ${signal}`);
    server.close();
    await disconnectFromDb();
    logger.info(`My Work here is done`);
    process.exit(0);
  });
}
function main() {
  const app = createServer();

  const server = app.listen(PORT, async () => {
    logger.info(`Server is listening at http://localhost:${PORT}`);
    await connectToDb();
  });

  const SIGNALS = ["SIGTERM", "SIGINT"];

  for (let i = 0; i < SIGNALS.length; i++) {
    graceFulShutdown(SIGNALS[i], server);
  }
}
main();
