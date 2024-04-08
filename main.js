// main.js
const { lexer } = require('./Lexer.js');
const { parser } = require('./Parser.js');
const { codeRunner, codeGenerate } = require('./codeRunner.js');

// const input = `
//   ye a = 50;
//   ye b = 30;
//   ye c = a + b;
//   bata c;
// `;

const input = `
  ye message = "Hello, World!";
  bata message;
`;

// const input = `
//   ye a = 10;
//   ye b = 20;
//   agar a > b:
//     ye big = "a is bigger";
//     bata big;
//   vrna:
//     ye small = "a is smaller";
//     bata small;
// `;

function compiler(input) {
  const tokens = lexer(input);
  // console.log(tokens)
  const ast = parser(tokens);
  // console.log(ast)
  const exCode = codeGenerate(ast);
  // console.log(exCode)
  return exCode;
}

// Compile and execute the input
let raw = compiler(input);
console.log("Generated Code:\n", raw)
codeRunner(raw);
