#!/usr/bin/env node

'use strict';

const program = require('commander');
const fs = require('fs');
const path = require('path');
const parser = require('../lib/parser.js')

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

program
    .command('dir <dir>')
    .description("Parse all md File in specific Directory, and set it into a File")
    .option('--platform [platform]','Specific Platform, Like common、osx、windows、linux、sunos')
    .action(function(dir,options){
      /**
       * 路径处理
       * @type {[type]}
       */
      let dirPath = dir;
      if (!path.isAbsolute(dir)){
        let dirPath = path.join(__dirname, dir)
      }

      let result = [];

      /**
       * 目录文件处理
       * @type {[type]}
       */
      let directoryArray = fs.readdirSync(dirPath)
      let outputPath = dirPath + '/tldr.json'

      directoryArray.map(item => {
        var info = fs.statSync(dirPath+"/"+item)
        if(info.isFile() && path.extname(item) == '.md'){
            let content = fs.readFileSync(dirPath+"/"+item,'utf8');
            let tldrObj = parser.parse(content);

            if (options.platform){
              tldrObj.platform = options.platform
            }
            fs.appendFileSync(outputPath,JSON.stringify(tldrObj))
        }
      })

      console.log("Export at " + outputPath);

    })

program.parse(process.argv);
