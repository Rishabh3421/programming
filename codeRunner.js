function codeRunner(input) {
    // Wrap the input code in a function before evaluating
    const wrappedInput = `(function() {\n${input}\n})()`;

    try {
        eval(wrappedInput);
    } catch (error) {
        console.error("Error executing generated code:", error);
    }
}

function codeGenerate(node) {
    switch (node.type) {
        case "Program":
            return node.body.map(codeGenerate).join("\n");

        case "Declaration":
            // Check if the value is a string containing an arithmetic expression or a numeric literal
            if (typeof node.value === 'string') {
                // Check if the string contains any arithmetic expression
                if (node.value.match(/[+\-*\/]/)) {
                    return `${node.name} = ${node.value};`;
                } else {
                    // Check if the string represents a numeric literal or an integer
                    const isNumeric = !isNaN(parseFloat(node.value)) && isFinite(node.value);
                    if (isNumeric) {
                        // If the value is a numeric literal, convert it to a number
                        return `${node.name} = ${parseFloat(node.value)};`;
                    } else {
                        // If it's not numeric, keep it as a string
                        return `${node.name} = "${node.value}";`; // Enclose string value in quotation marks
                    }
                }
            }
            // Assuming all other values are passed as is
            return `${node.name} = ${node.value};`;

        case "PrintStatement": // Handling PrintStatement node type
            return `console.log(${JSON.stringify(node.value)});`;

        case "Print": // This handles the existing print logic
            return `console.log(${node.expression});`;

        case "ConditionalPrint":
            return `${node.condition} ? ${node.trueExpression} : ${node.falseExpression};`;

        case "ConditionalStatement":
            let conditionCode = node.condition === "agar" ? "if" : "else if"; // Translate agar to if, vrna to else if
            let bodyCode;
            if (Array.isArray(node.body)) {
                // If body is an array, map over it directly
                bodyCode = node.body.map(codeGenerate).join("\n");
            } else {
                // If body is not an array, wrap it in an array
                bodyCode = codeGenerate(node.body);
            }
            return `${conditionCode} (${node.condition}) {\n${bodyCode}\n}`;

        case "String":
            return `"${node.value}"`; // Enclose string value in quotation marks

        default:
            throw new Error(`Unsupported node type: ${node.type}`);
    }
}

module.exports = { codeRunner, codeGenerate };




