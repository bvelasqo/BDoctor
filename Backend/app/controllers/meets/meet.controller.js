const PostgresService = require("../../services/postgres.service");
const MailerService = require("../../services/mailer.service");

const _pg = new PostgresService();
const _mailer = new MailerService();

/**
 * Método para consultar una cita en específico
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getOneMeet = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "select * from meets WHERE id=" + id + " ;";
        let result = await _pg.executeSql(sql);
        let row = result.rows[0];


        return res.send({
            ok: true,
            message: "Meet queried",
            content: row,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Wrong querying one meet",
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
const createMeet = async (req, res) => {
    try {
        let meet = req.body;
        let sql = `INSERT INTO public.meets ("time", "date", id_patient) 
    VALUES($1, $2, $3);`;
        let data = [];
        data[0] = meet.time_meet;
        data[1] = meet.date_meet;
        data[2] = meet.id_patient;
        let result = await _pg.executeSqlData(sql, data);
        console.log(result);
        await sendMail(data[2], data[1], data[0], result.id, 'Create')
        let status = result.rowCount == 1 ? 201 : 400;
        return res.status(status).send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Meet created" : "the meet dont be created",
            content: meet,
        });
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: "Wrong creating the meet",
            content: error,
        });
    }
};

/**
 * Método para actualizar la cita
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const editMeet = async (req, res) => {
    try {
        let id = req.params.id;
        let meet = req.body;
        let sql = `UPDATE public.meets SET "date"=$1, "time"=$2, id_patient=$3 WHERE id=$4`;
        let data = [];
        data[0] = meet.name;
        data[1] = meet.price;
        data[2] = meet.brand;
        data[3] = id;
        await sendMail(data[2], data[1], data[0], data[3], 'Update')
        let result = await _pg.executeSqlData(sql, data);
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "meet updated" : "meet not update",
            content: meet,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "has been occurring a wrong updating the meet ",
            content: error,
        });
    }
};

/**
 * Método para eliminar la cita
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteMeet = async (req, res) => {
    try {
        let id = req.params.id;
        let meet = req.body;
        let sql = `delete * from public.meets WHERE id=$1;  `;
        let result = await _pg.executeSqlData(sql, [id]);
        await sendMail(meet.id_patient, meet.date, meet.time, id, 'Delete')
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Meet deleted" : "Meet not deleted",
            content: id,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "has been occurring a wrong trashing the meet",
            content: error,
        });
    }
};
/**
 * Método para obtener las horas disponibles en esa fecha
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getDates = async (req, res) => {
    try {
        let daily = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:30', '16:00', '16:30']
        let id = req.params.id;
        let date = req.body.date;
        let sql = "select time from meets WHERE date = '" + date + "' and time=" + meet.time + " ;";
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
        console.log(rows);
        if (rows.rowCount == 1) {
            rows.map((x) => {
                if (daily.find(x)) {
                    daily.slice(daily.findIndex(x), 1)
                }
            })
        }
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Date Validate" : "Date Validate",
            content: daily,
        });
    } catch (error) {
        return res.send({
            ok: result.rowCount == 1,
            message:
                result.rowCount == 1 ? "Meet deleted" : "Meet not deleted",
            content: error,
        });
    }

}
/**
 * Método para obtener las horas disponibles en esa fecha
 * @param {String} id_patient
 * @param {String} date
 * @param {String} time
 * @param {Integer} id_meet
 * @param {String} state
 * @returns
 */
const sendMail = async (id_patient, date, time, id_meet, state) => {
    let sql = "select * from patients WHERE id='" + id_patient + "';";
    let result = await _pg.executeSql(sql);
    let row = result.rows;
    switch (state) {
        case "Create":
            // Enviar correo al paciente
            await _mailer.sendMessage(row.email, 'Cita programada', `Tienes una cita con el doctor Brandon Velásquez el dia ${date} a las ${time}.\n Si quieres reagendar o cancelar esta cita visita esta url: localhost:4200/meet/${id_meet}`);
            // Enviar correo al doctor
            await _mailer.sendMessage('brandon.velasquez.osorio@gmail.com', 'Cita programada', `Tienes una cita con el paciente ${row.name} el dia ${date} a las ${time} su correo es ${row.email} y su número de celular es ${row.phone_number}.\n Si quieres reagendar o cancelar esta cita visita esta url: localhost:4200/meet/${id_meet}`);
            break;
        case "Update":
            // Enviar correo al paciente
            await _mailer.sendMessage(row.email, 'Cita reprogramada', `Tienes una cita con el doctor Brandon Velásquez el dia ${date} a las ${time}.\n Si quieres reagendar o cancelar esta cita visita esta url: localhost:4200/meet/${id_meet}`);
            // Enviar correo al doctor
            await _mailer.sendMessage('brandon.velasquez.osorio@gmail.com', 'Cita reprogramada', `Tienes una cita con el paciente ${row.name} el dia ${date} a las ${time} su correo es ${row.email} y su número de celular es ${row.phone_number}.\n Si quieres reagendar o cancelar esta cita visita esta url: localhost:4200/meet/${id_meet}`);
            break;
        case "Delete":
            // Enviar correo al paciente
            await _mailer.sendMessage(row.email, 'Cita Cancelada', `Cancelaste tu cita con el doctor Brandon`);
            // Enviar correo al doctor
            await _mailer.sendMessage('brandon.velasquez.osorio@gmail.com', 'Cita Cancelada', `Se cancelo una cita del ${date} a las ${time}`);
            break;
        default:
            break;
    }
}

module.exports = {
    getOneMeet,
    createMeet,
    editMeet,
    deleteMeet,
    getDates
};