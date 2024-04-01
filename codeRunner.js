// codeRunner.js

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
            return `${node.name} = ${node.value};`;

        case "Print":
            return `console.log(${node.expression});`;

        case "ConditionalPrint":
            return `console.log(${node.condition} ? ${node.trueExpression} : ${node.falseExpression});`;

        case "String":
            return `${node.value}`; 

        default:
            throw new Error(`Unsupported node type: ${node.type}`);
    }
}

module.exports = { codeRunner, codeGenerate };
