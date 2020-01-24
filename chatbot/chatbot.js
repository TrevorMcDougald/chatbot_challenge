// Sometimes creating a new observable object directly from the EventEmitter class is not
// enough. Because this makes it impracticable to provide functionality that goes beyond the
// mere production of new events.

const EventEmitter = require('events').EventEmitter;
const readline = require('readline');

function getResponse(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}




// Chatbot extends EventEmitter using the inherits() function provided by core
// "util" module. Makes it a fully fledged observable class.

// Observer class: any object that wishes to be notified when the state of another
// object changes.

// Observable class: any object whose state may be of interest, and in whom
// another object may register an interest.
class ChatBot extends EventEmitter {
  constructor() {
    super();
    this.user = null;
    this.exiting = false;
    this.messages = [];
  }

  async start() {
    process.stdout.write('Welcome to Routefusion Chat!\n\n');
    // this.user = await this.getUser();
    this.user = await this.getUser().trim();
    await this.newUser();

    let message;
    while (true) {
      message = await this.getMessage();
      const standardize_message = message.toLowerCase();
      if (standardize_message === 'exit') {
        this.exit();
      }
      this.messages.push(standardize_message);

      if (standardize_message === 'hi') {
        this.greeting();
      }
      else {
        process.stdout.write('\nSorry, I don\'t understand.\n\n');
      }
    }
  }

  async getUser() {
    // process.stdout.write('What\'s your username?\n');
    return await getResponse('What\'s your username?\n\n');
  }

  async newUser() {
    process.stdout.write(`\nHello, ${this.user}!\n\n`);
  }

  async getMessage() {
    return await getResponse('');
  }

  exit() {
    process.stdout.write(`\nGoodbye, ${this.user}!\n\n`);
    process.exit(0);
  }

  greeting() {
    process.stdout.write('\nHi, how are you?\n\n');

  }

}

module.exports = ChatBot;
