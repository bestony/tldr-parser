# tldr-parser
![](https://img.shields.io/travis/com/bestony/tldr-parser.svg?style=popout-square) ![](https://img.shields.io/appveyor/ci/bestony/tldr-parser.svg?style=popout-square) ![](https://img.shields.io/circleci/project/github/bestony/tldr-parser.svg?style=popout-square)

A tldr pages parser


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
``
