const ChatBot = require('./chatbot/chatbot');

const app = new ChatBot;
app.connect().then( () => {
  app.run();
});
