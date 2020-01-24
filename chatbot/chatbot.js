const EventEmitter = require('events').EventEmitter;
const Channel = require('./channel');
const database = require('../database/database');

const chatDB = database.load();


class ChatBot extends EventEmitter {
  constructor() {
    super();
    this.user = null;
  }

  /**
   *  Connect the ChatBot to a User (receive and set username)
   */
  async connect() {
    Channel.botMessage('Welcome to Routefusion Chat!\n\n');
    this.user = await this.setUser();
    this.greetUser();
  }

  /**
   *  Program loop to retrieve and handle messages and
   *  responses
   */
  async run() {
    while (true) {
      const userInput = await this.getMessage();
      const response = this.handleMessage(userInput);
      this.handleResponse(response);
    }
  }

  /**
   *  Handler for Messages received by the User,
   *  Response is primarily chosen by ChatBot Database
   *  @param {String} message The message received from user
   */
  handleMessage(message) {

    if (message === 'exit') {
      this.exitHandler();
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

  /**
   *  Handler for sending the response to STDOUT
   *  @param {String} response The response chosen for the user
   */
  handleResponse(response){
    Channel.botMessage(`\n${response}\n\n`)
  }

  /**
   *  function to prompt and receive the User's username
   */
  async setUser() {
    return Channel.promptedMessage('What\'s your username?\n\n> ');
  }

  /**
   *  Save the user to list of previous users in Chat Database
   *  @param {String} user The username for this.user
   */
  saveUser(user) {
    if (!(chatDB.userHistory.includes(user))) {
      chatDB.userHistory.push(user);
    }
  }

  /**
   *  function to greet the user once received
   */
  greetUser() {
    Channel.botMessage(`\nHello, ${this.user}!\n\n`)
  }

  /**
   *  Get the unprompted messages from the user for
   *  user intended conversations
   */
  async getMessage() {
    return Channel.unpromptedMessage();
  }

  /**
   *  handler for exiting gracefully
   */
  exitHandler() {
    this.saveUser(this.user);
    Channel.botMessage(`\nGoodbye, ${this.user}!\n\n`);
    database.save(chatDB);
    process.exit(0);
  }

}

module.exports = ChatBot;
