const fs = require('fs');

module.exports = {
  /**
   *  Load the database JSON file
   */
  load() {
    let database = fs.readFileSync(__dirname + '/database.json', 'utf8');
    return JSON.parse(database);
  },

  /**
   *  Save the updated database to the JSON file (rewrite)
   *  @param {String} database The new database to overwrite
   */
  save(database) {
    const databaseJSON = JSON.stringify(database, null, 4);
    fs.writeFileSync(__dirname + '/database.json', databaseJSON, 'utf8');
  }
};
