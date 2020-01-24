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

class Channel {

  /**
   *  Get the user's message (response) to a prompt
   *  @param {String} prompt The query for the user to answer
   */
  static async promptedMessage(prompt) {
    const response = await getResponse(prompt);
    return response.trim();
  }

  /**
   *  Get the user's unprompted message
   */
  static async unpromptedMessage() {
    const response = await getResponse('> ');
    return response.toLowerCase();
  }

  /**
   *  Send the user a message through STDOUT
   *  @param {String} message The message to send to STDOUT
   */
  static botMessage(message) {
    process.stdout.write(message);
  }

}

module.exports = Channel;
