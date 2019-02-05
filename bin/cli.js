#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const path = require('path');
const parser = require(path.join(__dirname, "../lib/parser.js"))

program
    .version('1.0.0','-v, --version');

program
    .command('parse <file> [outputfile]')
    .description("Parse a TLDR Markdown File and return a Object or Output to a File")
    .action(function(file,outputfile,options){
      let sourceFile = path.join(process.cwd(),file);
      let content = fs.readFileSync(sourceFile,'utf8');
      let result = JSON.stringify(parser.parse(content));
      if(outputfile){
        let outputFile = path.join(process.cwd(),outputfile);
        fs.writeFileSync(outputFile,result)
        console.log("TLDR Object Output at: " + outputFile)
      }else{
        console.log(result)
      }
    });

program.parse(process.argv);
