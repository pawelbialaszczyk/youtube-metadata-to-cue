import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import url from 'node:url';
import convert from '../src/convert.js';

const testDataDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'data');

const readTestNames = () =>
  new Set(fs.readdirSync(testDataDir).map(file => path.parse(file).name));

const readTestFile = fileName =>
  fs.readFileSync(path.join(testDataDir, fileName), 'utf8');

describe('convert', () => {
  const testCases = Array.from(readTestNames());

  for (const name of testCases) {
    it(`should map JSON to CUE for ${name}`, () => {
      const json = JSON.parse(readTestFile(`${name}.json`));
      const cue = readTestFile(`${name}.cue`);

      assert.equal(convert(json), cue);
    });
  }
});
