function codeRunner(input) {
    // Evaluate each line of the input code
    const lines = input.split('\n').filter(line => line.trim() !== ''); // Split code into lines and remove empty lines
    lines.forEach(line => eval(line));
}

function codeGenerate(node) {
    switch (node.type) {
        case "Program":
            return node.body.map(codeGenerate).join("\n");

        case "Declaration":
            // Check if the value is a string and needs to be quoted
            let value = node.value;
            // Assuming all strings are passed as is, without quotes
            if (typeof value === 'string' || value instanceof String) {
                value = JSON.stringify(value); // This will add quotes and escape existing ones
            }
            return `${node.name} = ${value};`;

        case "PrintStatement": // Handling PrintStatement node type
            return `console.log(${JSON.stringify(node.value)});`;

        case "Print": // This handles the existing print logic
            return `console.log(${node.expression});`;

        case "ConditionalPrint":
            return `console.log(${node.condition} ? ${node.trueExpression} : ${node.falseExpression});`;

        case "String":
            return `"${node.value}"`;

        default:
            throw new Error(`Unsupported node type: ${node.type}`);
    }
}

module.exports = { codeRunner, codeGenerate };