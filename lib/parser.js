const nameRegex = new RegExp('^(# )(.*)');
const descriptionArrayRegex = new RegExp('^(> )(.*)', 'gm');
const descriptionRegex = new RegExp('^(> )(.*)');
const exampleDescriptionArrayRegex = new RegExp('^(- )(.*)(:)', 'gm');
const exampleDescriptionRegex = new RegExp('^(- )(.*)(:)');
const commandArrayRegex = new RegExp('^(`)(.*)(`)', 'gm');
const commandRegex = new RegExp('^(`)(.*)(`)');

class Parser {
  parse(source) {
    const parserObj = {
      name: '',
      description: [],
      examples: [],
    };
    const descriptionArray = source.match(descriptionArrayRegex);
    const exampleDescriptionArray = source.match(exampleDescriptionArrayRegex);
    const commandArray = source.match(commandArrayRegex);
    if (exampleDescriptionArray.length != commandArray.length) {
      return {};
    }
    parserObj.name = source.match(nameRegex)[2];

    descriptionArray.forEach((item) => {
      parserObj.description.push(item.match(descriptionRegex)[2]);
    });

    exampleDescriptionArray.forEach((item, index) => {
      if (commandArray[index]) {
        parserObj.examples.push({
          'description': item.match(exampleDescriptionRegex)[2],
          'command': commandArray[index].match(commandRegex)[2],
        });
      }
    });

    return parserObj;
  }

  build(parserObj) {
    let buildContent = `# ${parserObj.name}\n\n`;

    parserObj.description.forEach((item) => {
      buildContent = buildContent + `> ${item}\n`;
    });

    buildContent = buildContent + '\n';

    parserObj.examples.forEach((item) => {
      buildContent = buildContent + `- ${item.description}:\n\n\`${item.command}\`\n\n`;
    });

    return buildContent;
  }
}

module.exports = new Parser();
