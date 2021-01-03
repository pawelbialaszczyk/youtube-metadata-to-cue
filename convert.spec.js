const fs = require('fs');
const path = require('path');
const convert = require('./convert');

describe('convert', () => {
  const testDataDir = path.join(__dirname, 'test-data');

  const testCases = fs.readdirSync(testDataDir)
    .map(path.parse)
    .reduce((cases, { name, ext, base }) => {
      const file = fs.readFileSync(path.join(testDataDir, base), 'utf8');

      cases[name] = cases[name] ?? [];

      switch (ext) {
        case '.json': cases[name][0] = JSON.parse(file); break;
        case '.cue': cases[name][1] = file; break;
      }

      return cases;
    }, {});

  it.each(Object.values(testCases))('should map JSON to CUE', (json, cue) => {
    expect(convert(json)).toBe(cue);
  });
});
