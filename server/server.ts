import { createServer } from 'http';
import app from './app';

const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

// Express Server
const server = httpServer.listen(PORT, () => {
  console.log(`Server Running On Port -> ${PORT}`);
});

// Promise rejection is taken seriously
process.on('unhandledRejection', reason => {
  console.log(`unhandledRejection ${reason}`);
  server.close(() => process.exit(1));
});
