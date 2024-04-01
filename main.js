// main.js
const { lexer } = require('./Lexer.js');
const { parser } = require('./Parser.js');
const { codeRunner, codeGenerate } = require('./codeRunner.js');

const input = `
  ye a = 50;
  ye b = 10;

      ye c = a + b;
      bata c;
  ye d = 20;
  bata d;
  ye greetings = 'Hello world';
  bata greetings;

`;

function compiler(input) {
  const tokens = lexer(input);
  // console.log(tokens)
  const ast = parser(tokens);
  // console.log(ast)
  const exCode = codeGenerate(ast);
  console.log(exCode)
  return exCode;
}

// Compile and execute the input
let raw = compiler(input);
codeRunner(raw);
