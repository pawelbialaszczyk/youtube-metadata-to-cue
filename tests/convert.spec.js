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

  it.each(testCases)('should map JSON to CUE for %s', name => {
    const json = JSON.parse(readTestFile(`${name}.json`));
    const cue = readTestFile(`${name}.cue`);

    expect(convert(json)).toBe(cue);
  });
});
