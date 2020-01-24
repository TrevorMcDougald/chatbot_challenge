// Sometimes creating a new observable object directly from the EventEmitter class is not
// enough. Because this makes it impracticable to provide functionality that goes beyond the
// mere production of new events.

const EventEmitter = require('events').EventEmitter;
const Message = require('./message');
const database = require('../database/database');

const chatDB = database.load();


class ChatBot extends EventEmitter {
  constructor() {
    super();
    this.user = null;
  }

  async start() {
    process.stdout.write('Welcome to Routefusion Chat!\n\n');
    // this.user = await this.getUser();
    this.user = await this.getUser();
    await this.greetUser();

    while (true) {
      await this.run();
    }
  }

  async run() {
    const userInput = await this.getMessage();
    const response = this.handleMessage(userInput);
    this.handleResponse(response);
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

  async getUser() {
    // process.stdout.write('What\'s your username?\n');
    return Message.promptedMessage('What\'s your username?\n\n> ');
  }

  saveUser(user) {
    if (!(chatDB.userHistory.includes(user))) {
      chatDB.userHistory.push(user);
    }
  }

  async greetUser() {
    process.stdout.write(`\nHello, ${this.user}!\n\n`);
  }

  async getMessage() {
    return Message.unpromptedMessage();
  }

  exit() {
    this.saveUser(this.user);
    process.stdout.write(`\nGoodbye, ${this.user}!\n\n`);
    database.save(chatDB);
    process.exit(0);
  }

}

module.exports = ChatBot;
