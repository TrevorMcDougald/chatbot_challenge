const EventEmitter = require('events').EventEmitter;
const Channel = require('./channel');
const database = require('../database/database');

const chatDB = database.load();


class ChatBot extends EventEmitter {
  constructor() {
    super();
    this.user = null;
  }

  async connect() {
    Channel.botMessage('Welcome to Routefusion Chat!\n\n');
    this.user = await this.setUser();
    this.greetUser();
  }

  async run() {
    while (true) {
      const userInput = await this.getMessage();
      const response = this.handleMessage(userInput);
      this.handleResponse(response);
    }
  }

  handleMessage(message) {

    if (message === 'exit') {
      this.exit();
    }

    let response;
    if (message in chatDB.messages) {
      response = chatDB.messages[message]
    }
    else {
      response = 'Sorry, I don\'t understand.';
      chatDB.messages[message] = response;
    }
    return response
  }

  handleResponse(response){
    process.stdout.write('\n' + response + '\n\n');
  }

  async setUser() {
    return Channel.promptedMessage('What\'s your username?\n\n> ');
  }

  saveUser(user) {
    if (!(chatDB.userHistory.includes(user))) {
      chatDB.userHistory.push(user);
    }
  }

  greetUser() {
    Channel.botMessage(`\nHello, ${this.user}!\n\n`)
  }

  async getMessage() {
    return Channel.unpromptedMessage();
  }

  exit() {
    this.saveUser(this.user);
    Channel.botMessage(`\nGoodbye, ${this.user}!\n\n`);
    database.save(chatDB);
    process.exit(0);
  }

}

module.exports = ChatBot;
