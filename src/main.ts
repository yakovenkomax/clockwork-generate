import * as fs from 'fs';
import { writeJson } from 'utils/writeJson';
import { transform } from './transform/transform';

try {
  fs.readdirSync('data');
} catch (e) {
  fs.mkdirSync('data');
}

const sourceData = fs.readFileSync('data/input.txt', { encoding: 'utf-8' });

const output = transform(sourceData);

writeJson('data/output.json', output);
