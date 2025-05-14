# OpenAI Integration for Nismah

This module provides a complete OpenAI integration for the Nismah application, enabling AI-powered assistance for both web interface and command-line usage.

## Features

- **Modular Design**: Easy to extend and customize for future AI features
- **Web UI Integration**: React component and hooks for seamless UI integration
- **API Endpoint**: Next.js API route for client-side requests
- **CLI Tool**: Command-line interface for quick testing and scripting
- **Streaming Support**: Real-time streaming of AI responses
- **Configurable**: Easily adjust models, parameters, and system messages

## Getting Started

### 1. Set up your OpenAI API Key

Create a `.env.local` file in the root of your project with your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Install Dependencies

```bash
npm install openai dotenv
# or
yarn add openai dotenv
# or
pnpm add openai dotenv
```

## Web UI Usage

The `AIAssistant` component provides a ready-to-use chat interface:

```jsx
import AIAssistant from "@/components/AIAssistant";

export default function MyPage() {
  return (
    <div>
      <h1>My AI Assistant</h1>
      <AIAssistant 
        title="Custom Assistant"
        systemMessage="You are a specialized assistant for..."
        placeholder="Ask me something..."
      />
    </div>
  );
}
```

Or use the hook directly for custom UI:

```jsx
import { useAI } from "@/hooks/useAI";

export default function CustomAssistant() {
  const { prompt, response, isLoading, error } = useAI({
    model: "gpt-4",
    temperature: 0.7,
    systemMessage: "You are a helpful assistant..."
  });

  const handleSubmit = async () => {
    await prompt("Your prompt here");
  };

  return (
    <div>
      {/* Your custom UI */}
    </div>
  );
}
```

## CLI Usage

Run the CLI assistant with:

```bash
npm run ai
# or
node lib/openai/cli.js
```

Commands:
- Type your message and press Enter to chat
- Type "exit" to quit
- Type "clear" to reset conversation history
- Type "save" to save the conversation to a JSON file

## API Reference

### OpenAI Service

```typescript
// Import the service
import { OpenAIService } from '@/lib/openai/service';

// Create service instance
const openAIService = new OpenAIService({
  apiKey: 'your-api-key', // Optional, defaults to env var
  model: 'gpt-4', // Optional
  maxTokens: 1000, // Optional
  temperature: 0.7 // Optional
});

// Get a completion
const response = await openAIService.getCompletion({
  prompt: 'Hello, AI!',
  systemMessage: 'You are a helpful assistant.'
});

// Stream a completion
await openAIService.streamCompletion(
  { prompt: 'Tell me a story...' },
  (chunk) => {
    console.log(chunk); // Handle each chunk
  }
);
```

## Customization

### Changing Default Model

Update the `defaultConfig` in `lib/openai/config.ts` or set the `OPENAI_MODEL` environment variable.

### Adding Custom Assistants

Create new specialized assistant components by extending the base functionality:

```jsx
// components/SpecializedAssistant.tsx
import AIAssistant from "@/components/AIAssistant";

export default function SpecializedAssistant() {
  return (
    <AIAssistant
      title="Specialized Assistant"
      systemMessage="You are an expert in..."
      placeholder="Ask about..."
    />
  );
}
``` 