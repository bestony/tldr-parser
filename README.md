<div align="center">
    	<img width="500"  src="https://ws4.sinaimg.cn/large/006tNc79ly1fzvgvf24j1j30p00anq2x.jpg" alt="Awesome">
        <br>
	    <br>
        <h1>tldr-parser</h1>
        <h2>A tldr pages parser</h2>
        <p> <img src="https://img.shields.io/travis/com/bestony/tldr-parser.svg?style=popout-square"> <img src="https://img.shields.io/appveyor/ci/bestony/tldr-parser.svg?style=popout-square">
    </p>
</div>


## TLDR Object

```json
{
    "name": "7z",
    "description": ["A file archiver with high compression ratio.", "Homepage: <https://www.7-zip.org/>."],
    "examples": [{
        "description": "Archive a file or folder",
        "command": "7z a {{archived.7z}} {{path/to/file}}"
    }, {
        "description": "Encrypt an existing archive (including headers)",
        "command": "7z a {{encrypted.7z}} -p{{password}} -mhe {{archived.7z}}"
    }]
}
```

## Usage

### Use as a Command line tool

```
npm install -g tldr-parser
tldr-parser parse path_to_tldr_markdown_file path_to_export_file
```


### use as a Node Modules

```bash
npm install tldr-parser --save
```

```javascript
const parser = require('tldr-parser')

parser.parse('Content Of a TLDR File')
```

