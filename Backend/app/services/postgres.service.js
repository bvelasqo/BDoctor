const db = require("../config/db")
class PostgresService {
    constructor() {
        this.pool = db;
    }

    async executeSql(sql) {
        let result = await this.pool.query(sql);
        return result;
    }

    async executeSqlData(sql, data) {
        let result = await this.pool.query(sql, data);
        return result;
    }
}

module.exports = PostgresService;