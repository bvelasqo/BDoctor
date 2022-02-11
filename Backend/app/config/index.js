require("dotenv").config()

const config = {
    mode: process.env.MODE,
    server_port:process.env.SERVER_PORT,
    db_password: process.env.DB_PASSWORD,
    db_username: process.env.DB_USERNAME,
    db_host:process.env.DD_HOST,
    db_name:process.env.DB_NAME,
    db_port:process.env.DB_PORT
}

module.exports = config