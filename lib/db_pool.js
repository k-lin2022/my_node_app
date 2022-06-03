const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host: '192.168.56.11',
  user: 'my_node_app',
  password: 'my_node_app',
  database: 'my_node_app'
});

module.exports = function getDbPool() {
  return pool;
}
