# meta-llama Chatbot

A Node.js chatbot application using the meta-llama model from Hugging Face.

## Features

- REST API endpoint for chat interactions
- Integration with meta-llama AI model
- Express.js server
- Environment-based configuration

## Prerequisites

- Node.js v16 or higher
- NPM
- Hugging Face API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat_bot_private
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
HF_TOKEN=your_huggingface_api_token
PORT=3000
```

## Usage

1. Start the server:
```bash
npm start
```

2. Send a POST request to `/chat` endpoint:
```bash
curl -X POST -H "Content-Type: application/json" -d "{\"message\":\"Hello\"}" http://localhost:3000/chat
```

## API Endpoints

### POST /chat
Send a message to the chatbot.

Request body:
```json
{
    "message": "Your message here"
}
```

Response:
```json
{
    "reply": "Bot's response here"
}
```

## Environment Variables

- `HF_TOKEN`: Hugging Face API token
- `PORT`: Server port (default: 3000)

## License

MIT

##
