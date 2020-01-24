const assert = require('assert');
const ChatBot = require('./chatbot/chatbot');

const testBot = new ChatBot;

assert(testBot.user === null, 'The username is null before the chatbot starts');

assert(testBot.handleMessage('hi') === 'Hi, how are you?',
  'The response returned from the message Hi is \'Hi, how are you?\'');

assert(testBot.handleMessage('garbled') === 'Sorry, I don\'t understand.',
  'The response returned from any other garbled message: \'Sorry, I don\'t understand.\'');

testBot.connect().then( () => {
  assert.notEqual(testBot.user, null,
    'The username won\'t be null after completion');
});
