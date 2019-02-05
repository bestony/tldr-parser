#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const path = require('path');
const parser = require(path.join(__dirname, "../lib/parser.js"))

program
    .version('1.0.0','-v, --version');

program
    .command('parse <file>')
    .description("Parse a TLDR Markdown File and return a Object")
    .action(function(file,options){
      let sourceFile = path.join(process.cwd(),file);
      let content = fs.readFileSync(sourceFile,'utf8');
      let result = parser.parse(content);
      console.log(result)
    });

program.parse(process.argv);
