// start dev server
import { spawn } from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'start-demo'], {
      cwd: path.resolve(__dirname, '../../'),
      stdio: 'pipe'
    });
    server.stdout.on('data', (data) => {
      // console.log(data.toString());
      if (data.toString().includes('Local:')) {
        resolve(server);
      }
    });
    server.stderr.on('data', (data) => {
      // console.error(data.toString());
      reject(data.toString());
    });
  });
}
startServer();