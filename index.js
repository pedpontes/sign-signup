const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000;
const { mongoConnect } = require("./src/schema/schema");
const router = require("./src/routes/routes");

app.use(cors(), express.json(), router);

mongoConnect();

app.listen(PORT, () => console.log("Server running..."));