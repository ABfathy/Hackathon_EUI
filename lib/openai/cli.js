#!/usr/bin/env node

const { createInterface } = require('readline');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Configuration
const config = {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4',
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10),
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
};

// Create OpenAI client
const openai = new OpenAI({
    apiKey: config.apiKey,
});

// Check if API key is provided
if (!config.apiKey) {
    console.error('Error: OpenAI API key is required');
    console.error('Please set the OPENAI_API_KEY environment variable or create a .env file');
    process.exit(1);
}

// Chat history
const messages = [
    { role: 'system', content: 'You are a helpful assistant. Provide concise and accurate information.' },
];

// Create readline interface
const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Display welcome message
console.log('\n🤖 OpenAI CLI Assistant\n');
console.log('Model: ' + config.model);
console.log('Type "exit" or press Ctrl+C to quit');
console.log('Type "clear" to clear conversation history');
console.log('Type "save" to save conversation to a file');
console.log('-------------------------------------------\n');

// Main prompt function
async function promptUser() {
    rl.question('\n> ', async (input) => {
        // Handle special commands
        if (input.toLowerCase() === 'exit') {
            console.log('\nGoodbye! 👋');
            rl.close();
            return;
        }

        if (input.toLowerCase() === 'clear') {
            messages.length = 1; // Keep only the system message
            console.log('\nConversation history cleared');
            promptUser();
            return;
        }

        if (input.toLowerCase() === 'save') {
            saveConversation();
            promptUser();
            return;
        }

        // Add user message to history
        messages.push({ role: 'user', content: input });

        try {
            // Show "thinking" indicator
            process.stdout.write('Thinking');
            const thinkingInterval = setInterval(() => {
                process.stdout.write('.');
            }, 500);

            // Call OpenAI API
            const response = await openai.chat.completions.create({
                model: config.model,
                messages: messages,
                max_tokens: config.maxTokens,
                temperature: config.temperature,
            });

            // Clear thinking indicator
            clearInterval(thinkingInterval);
            process.stdout.write('\r' + ' '.repeat(20) + '\r');

            // Get the response content
            const responseContent = response.choices[0].message.content;

            // Add assistant response to history
            messages.push({ role: 'assistant', content: responseContent });

            // Display the response
            console.log(`\n${responseContent}`);

            // Display token usage
            if (response.usage) {
                console.log(
                    `\n[Tokens: ${response.usage.total_tokens} | ` +
                    `Prompt: ${response.usage.prompt_tokens} | ` +
                    `Completion: ${response.usage.completion_tokens}]`
                );
            }
        } catch (error) {
            console.error('\nError:', error.message);
        }

        // Prompt again
        promptUser();
    });
}

// Save conversation to file
function saveConversation() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `conversation-${timestamp}.json`;

    fs.writeFileSync(
        filename,
        JSON.stringify(messages, null, 2),
        'utf8'
    );

    console.log(`\nConversation saved to ${filename}`);
}

// Handle SIGINT (Ctrl+C)
rl.on('SIGINT', () => {
    console.log('\nGoodbye! 👋');
    rl.close();
});

// Start the conversation
promptUser(); 