// Typically keep name of module you're importing.
const http = require('http');
const ChatBot = require('./chatbot/chatbot');

const app = new ChatBot;
app.start();
