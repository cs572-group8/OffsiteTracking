const express = require('express')
const cors = require("cors");
const db = require("./dbconnection/dbconnection")
const router = require('./routes/user')

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(db());
app.use(router);

app.listen(port, () => console.log(`listening port ${port}`));