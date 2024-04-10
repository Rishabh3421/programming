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
                // Assign the expression as is, without further processing
                declaration.value = expression.trim();
            }
            ast.body.push(declaration);
        }

        // Handling print statements
        if (token.type === "keyword" && token.value === "bata") {
            let expression = "";
            while (tokens.length > 0 && tokens[0].type !== "semicolon") {
                expression += tokens.shift().value;
            }
            tokens.shift(); // Remove the semicolon from the tokens list

            // Check if it's a conditional print
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
                    expression: expression.trim(),
                });
            }
        }

        // Handling conditional statements (agar/vrna)
        if (token.type === "keyword" && (token.value === "agar" || token.value === "vrna")) {
            let condition = token.value;
            let body = [];
            // Collect tokens until the next agar/vrna or the end of the input
            while (tokens.length > 0 && tokens[0].value !== "agar" && tokens[0].value !== "vrna") {
                body.push(tokens.shift());
            }
            ast.body.push({
                type: "ConditionalStatement",
                condition: condition,
                body: parser(body),
            });
        }
    }
    return ast;
}

module.exports = { parser };
