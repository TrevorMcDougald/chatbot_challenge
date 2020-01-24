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

  static async promptedMessage(prompt) {
    const response = await getResponse(prompt);
    return response.trim();
  }

  static async unpromptedMessage() {
    const response = await getResponse('> ');
    return response.toLowerCase();
  }

  static botMessage(message) {
    process.stdout.write(message);
  }

}

module.exports = Channel;
