#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const convert = require('./convert');

const jsonPath = path.resolve(process.argv[2]);
const cuePath = path.resolve(path.dirname(jsonPath), `${path.parse(jsonPath).name}.cue`);

const json = JSON.parse(fs.readFileSync(jsonPath));
const cue = convert(json);

fs.writeFileSync(cuePath, cue);

console.log(`Successfully saved CUE at: ${cuePath}`);
