const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

/**
 * Método para consultar un cliente en específico
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getPatient = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "select * from patients WHERE id='" + id + "';";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "patient queried",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Wrong querying one patient",
            content: error,
        });
    }
};

/**
 * Método para crear una cita
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createPatient = async (req, res) => {
    try {
        let patient = req.body;
        let sql = `INSERT INTO public.patients (id,"name", phone_number, email) 
    VALUES($1, $2, $3, $4)`;
        let data = [];
        data[0] = id;
        data[1] = patient.name;
        data[2] = patient.phone_number;
        data[3] = patient.email;
        let result = await _pg.executeSqlData(sql, data);
        let status = result.rowCount == 1 ? 201 : 400;
        return res.status(status).send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "patient created" : "the patient dont be created",
            content: patient,
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "Wrong creating the patient",
            content: error,
        });
    }
};


module.exports = {
    getPatient,
    createPatient,
};