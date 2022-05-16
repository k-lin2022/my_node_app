const mysql = require('mysql');

module.exports = function getDbConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'my_node_app',
    password: 'my_node_app',
    database: 'my_node_app'
  });
}
