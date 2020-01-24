const fs = require('fs');

module.exports = {
  load() {
    let database = fs.readFileSync(__dirname + '/database.json', 'utf8');
    return JSON.parse(database);
  },

  save(database) {
    const databaseJSON = JSON.stringify(database, null, 4);
    fs.writeFileSync(__dirname + '/database.json', databaseJSON, 'utf8');
  }
};
