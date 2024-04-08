function parser(tokens) {
  const ast = {
    type: "Program",
    body: [],
  };

  while (tokens.length > 0) {
    let token = tokens.shift();

    if (token.type === "keyword" && token.value === "ye") {
      let declaration = {
        type: "Declaration",
        name: tokens.shift().value,
        value: null,
      };

      if (tokens[0].type === "operator" && tokens[0].value === "=") {
        tokens.shift();

        let expression = "";
        while (tokens.length > 0 && tokens[0].type !== "keyword") {
          expression += tokens.shift().value;
        }
        declaration.value = expression.trim();
      }
      ast.body.push(declaration);
    }

    // Handling print statements
    if (token.type === "print") {
      let nextToken = tokens.shift();
      if (nextToken.type === "string") {
        ast.body.push({
          type: "PrintStatement",
          value: nextToken.value,
        });
      } else {
        // Handle other types of expressions for printing if necessary
        let expression = nextToken.value;
        while (tokens.length > 0 && tokens[0].type !== "semicolon") {
          expression += tokens.shift().value;
        }
        tokens.shift(); // Remove the semicolon from the tokens list
        ast.body.push({
          type: "PrintStatement",
          value: expression.trim(),
        });
      }
    }

    // Existing logic for handling "bata" keyword
    if (token.type === "keyword" && token.value === "bata") {
      // Parsing print statements
      let expression = tokens.shift().value;
      // Check if it's an if-else condition
      if (expression.includes("?")) {
        let parts = expression.split("?");
        let condition = parts[0].trim();
        let trueExpression = parts[1].split(":")[0].trim();
        let falseExpression = parts[1].split(":")[1].trim();
        ast.body.push({
          type: "ConditionalPrint",
          condition: condition,
          trueExpression: trueExpression,
          falseExpression: falseExpression,
        });
      } else {
        ast.body.push({
          type: "Print",
          expression: expression,
        });
      }
    }
  }
  return ast;
}

module.exports = { parser };