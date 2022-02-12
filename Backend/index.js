const express = require("express");
const cors = require("cors");
const routerMeet = require("./app/routers/meet.router");
const routerPatient = require("./app/routers/patient.router");
const port = require("./app/config/index");

const app = express();
const PORT = port.server_port;
const urlBasic = "/api/v1"

app.use(express.json());
app.use(cors());
app.use(urlBasic + "/meets", routerMeet);
app.use(urlBasic + "/patients", routerPatient);

app.listen(PORT, () => {
    console.log(`Server started on port: http://localhost:${PORT}`);
});