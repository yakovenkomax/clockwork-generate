import * as fs from 'fs';
import { download } from 'download';

try {
  fs.readdirSync('data');
} catch(e) {
  fs.mkdirSync('data');
}

const words = await download();
