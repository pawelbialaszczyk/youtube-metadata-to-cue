const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const fs = require('fs');
const path = require('path');
const convert = require('../src/convert');

const testDataDir = path.join(__dirname, 'data');

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
