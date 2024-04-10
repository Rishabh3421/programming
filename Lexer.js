function lexer(input) {
    const tokens = [];
    let cursor = 0;

    while (cursor < input.length) {
        let char = input[cursor];

        // Skipping spaces
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
            const keywords = ["ye", "bata", "agar", "vrna"];
            const type = keywords.includes(word) ? "keyword" : "identifier";
            tokens.push({ type, value: word });
            continue;
        }

        // Number
        if (/[0-9]/.test(char)) {
            let num = "";
            while (/[0-9]/.test(char) || char === ".") {
                num += char;
                char = input[++cursor];
            }
            tokens.push({ type: "number", value: parseFloat(num) });
            continue;
        }

        // Handle string literals
        if (char === '"') {
            let str = "";
            char = input[++cursor]; // Move cursor past the opening quote
            while (char !== '"') {
                if (char === undefined) {
                    throw new Error("Unterminated string literal");
                }
                str += char;
                char = input[++cursor];
            }
            tokens.push({ type: "string", value: str });
            cursor++; // Move cursor past the closing quote
            continue;
        }

        // Handle special characters
        const specialChars = ['"', ";", "(", ")", "?", ":", "+", "-", "*", "%", "/", "\\", "<", ">", "=", "{", "}", ","];
        if (specialChars.includes(char)) {
            tokens.push({ type: "operator", value: char });
            cursor++;
            continue;
        }

        // Handle conditional statements (agar/vrna)
        if (char === "a" || char === "v") {
            let conditional = char;
            char = input[++cursor];
            if ((char === "g" && input[cursor + 1] === "a") || (char === "r" && input[cursor + 1] === "n")) {
                conditional += char + input[cursor + 1];
                cursor += 2;
                tokens.push({ type: "keyword", value: conditional });
                continue;
            }
        }

        // If none of the above matches, there's an error
        throw new Error(`Unexpected character: ${char} at position ${cursor}`);
    }

    return tokens;
}

module.exports = { lexer };
