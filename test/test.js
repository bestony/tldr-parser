const assert = require('assert');
const fs = require('fs');
const path = require('path');
const parser = require('../lib/parser.js');

describe('Parser can Parse',function(){
    before(function() {
     this.fileContent = fs.readFileSync(path.join(__dirname, "./7z.md"), 'utf8');
    });
    it('should get title',function(){
      let obj = parser.parse(this.fileContent)
      /**
       * 对比命令名
       */
      assert.equal('7z',obj.name)
    })
    it('should get description', function(){
      let obj = parser.parse(this.fileContent)
      /**
       * 对比 Description
       * 此处有坑，assert.equal 无法对比数组、Object, 需要使用 deepEqual
       * @type {[type]}
       */
      assert.deepEqual([
        'A file archiver with high compression ratio.',
        'Homepage: <https://www.7-zip.org/>.'
        ],obj.description)
    })

    it('should get Example',function(){
      let obj = parser.parse(this.fileContent)
      assert.deepEqual([
          {
            "description":"Archive a file or folder",
            "command":"7z a {{archived.7z}} {{path/to/file}}"
          },
          {
            "description":"Encrypt an existing archive (including headers)",
            "command":"7z a {{encrypted.7z}} -p{{password}} -mhe {{archived.7z}}"
          }
        ],obj.examples)
    })
})

describe('Parser can Build',function(){
  it('should generate markdown',function(){
    fileContent = fs.readFileSync(path.join(__dirname, "./7z.md"), 'utf8');
    let obj = parser.parse(fileContent)
    let buildContent = parser.build(obj)
    assert.equal(fileContent,buildContent)
  })
})
