import { encoding_for_model } from "tiktoken";

// Function to count tokens for LLaMA 3 70B
function countTokens(text) {
    console.log("Loading tokenizer...");
    
    // Use a model-compatible tokenizer (Groq uses LLaMA 3 & OpenAI-like models)
    const encoder = encoding_for_model(process.env.GROQ_MODEL); // Closest match since tiktoken doesn't have LLaMA 3 yet

    console.log("Tokenizing input...");
    const tokens = encoder.encode(text);
    
    console.log(`Token count: ${tokens.length}`);
    return tokens.length;
}

export {
    countTokens
}