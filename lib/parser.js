const nameRegex = new RegExp('(# )(.*)')
const descriptionArrayRegex = new RegExp('(> )(.*)','gm')
const descriptionRegex = new RegExp('(> )(.*)');
const exampleDescriptionArrayRegex = new RegExp('(- )(.*)(:)','gm')
const exampleDescriptionRegex = new RegExp('(- )(.*)(:)')
const commandArrayRegex = new RegExp('(`)(.*)(`)','gm')
const commandRegex = new RegExp('(`)(.*)(`)')
class Parser {
  parse(str){
    /**
     * 提取 Title
     * @type String
     */
    const name = str.match(nameRegex)[2]
    /**
     * 提取出多行的 Description 数据
     * @type String
     */
    const descriptionArray = str.match(descriptionArrayRegex);
    /**
     * 利用 map 将 description 移动到临时的数据里
     * @type {Array}
     */
    let description = [];
    descriptionArray.map(item => {
      description.push(item.match(descriptionRegex)[2])
    })

    let exampleDescriptionArray = str.match(exampleDescriptionArrayRegex);
    let commandArray = str.match(commandArrayRegex)
    let examples = [];
    exampleDescriptionArray.map((item,index) => {
      examples.push({
        'description':item.match(exampleDescriptionRegex)[2],
        'command':commandArray[index].match(commandRegex)[2]
      })
    })

    return {
      name: name,
      description: description,
      examples: examples
    }
  }

  build(parserObj){
    /**
     * 拼接 title
     * @type {String}
     */
    let buildContent = `# ${parserObj.name}\n\n`
    parserObj.description.map(item => {
      buildContent = buildContent + `> ${item}\n`
    })

    buildContent = buildContent + "\n"

    parserObj.examples.map(item => {
      buildContent = buildContent + `- ${item.description}:\n\n\`${item.command}\`\n\n`
    })

    return buildContent;
  }
}
module.exports = new Parser()
