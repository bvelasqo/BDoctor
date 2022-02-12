
const pg = require("pg");
const config = require("./index")

const connectionString =`postgresql://${config.db_username}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`;
const pool = new pg.Pool({ connectionString: connectionString });

module.exports = pool