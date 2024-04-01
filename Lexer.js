// lexer.js

function lexer(input) {
    const tokens = [];
    let cursor = 0;
  
    while (cursor < input.length) {
      let char = input[cursor];
  
      // skipping spaces
      if (/\s/.test(char)) {
        cursor++;
        continue;
      }
  
      // Character
      if (/[a-zA-Z]/.test(char)) {
        let word = "";
        while (/[a-zA-Z]/.test(char)) {
          word += char;
          char = input[++cursor];
        }
        if (
          word === "ye" ||
          word === "bata" ||
          word === "agar" ||
          word === "warna" ||
          word === "karo" ||
          word === "bar" ||
          word === "kitni"
        ) {
          tokens.push({ type: "keyword", value: word });
        } else {
          tokens.push({ type: "identifier", value: word });
        }
        continue;
      }
  
      // Number
      if (/[0-9]/.test(char)) {
        let num = "";
        while (/[0-9]/.test(char)) {
          num += char;
          char = input[++cursor];
        }
        tokens.push({ type: "number", value: parseInt(num) });
        continue;
      }
  
      // String
      if (char === "'") {
        let str = "";
        char = input[++cursor]; // skip the opening quote
        while (char !== "'") {
          str += char;
          char = input[++cursor];
        }
        tokens.push({ type: "string", value: str });
        cursor++; // skip the closing quote
        continue;
      }
  
      // Semicolon
      if (char === ";") {
        tokens.push({ type: "semicolon", value: ";" });
        cursor++;
        continue;
      }
  
      // Operator
      if (/[\+\-\*\%\/\\\<\>\=]/.test(char)) {
        tokens.push({ type: "operator", value: char });
        cursor++;
        continue;
      }
    }
  
    return tokens;
  }
  
  module.exports = { lexer };
  