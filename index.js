#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import convert from './src/convert.js';

const jsonPath = process.argv[2];

if (!jsonPath && process.stdin.isTTY) {
  console.log('No data provided');
  process.exit(1);
}

const input = jsonPath
  ? await fs.readFile(path.resolve(jsonPath))
  : await new Promise((resolve, reject) => {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', resolve);
    process.stdin.on('error', reject);
  });

const json = JSON.parse(input);

const cueFileName = `${path.parse(json._filename).name}.cue`;

const cuePath = jsonPath
  ? path.resolve(path.dirname(jsonPath), cueFileName)
  : path.resolve(cueFileName);

const cue = convert(json);

await fs.writeFile(cuePath, cue, { flag: 'wx' });

console.log(`Successfully saved CUE at: ${cuePath}`);
