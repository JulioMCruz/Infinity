import * as http from "http";
import * as https from "https";
// import path from "path";
import {App} from "./app";

interface ServerConfig {
  environment: string;
  httpsOptions?: {
    key: Buffer;
    cert: Buffer;
    ca: Buffer;
  };
}

// lógica para leer certificados ssl
// Ejemplo (comentado porque no hay certificados en el proyecto):
// const keyPath = path.join(__dirname, 'certs', 'server.key');
// const certPath = path.join(__dirname, 'certs', 'server.crt');
// const caPath = path.join(__dirname, 'certs', 'ca.crt');
// const sslExists = fs.existsSync(keyPath) && fs.existsSync(certPath) && fs.existsSync(caPath);

const environment = process.env.NODE_ENV || "local";
const serverConfig: ServerConfig = {
  environment,
};

// if (sslExists) {
//   serverConfig.httpsOptions = {
//     key: fs.readFileSync(keyPath),
//     cert: fs.readFileSync(certPath),
//     ca: fs.readFileSync(caPath)
//   };
// }

export const createServer = (): http.Server | https.Server => {
  const app = new App().expressApp;
  let server: http.Server | https.Server;

  if (serverConfig.httpsOptions) {
    server = https.createServer(serverConfig.httpsOptions, app);
  } else {
    server = http.createServer(app);
  }

  return server;
};
