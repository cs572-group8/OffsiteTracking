const express = require('express')
const cors = require("cors");
const db = require("./dbconnection/dbconnection")
const auth = require("./authorization/auth");
const authApi = require('./routes/authApi')
const userApi = require('./routes/employeeApi')
const adminApi = require('./routes/adminApi')

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(db());

//app.use('*/api', auth);
app.use("/auth", authApi);
<<<<<<< HEAD
//app.use("/api", userApi);
app.use("/api", adminApi);
=======
app.use("/api/employee", userApi);
app.use("/api/admin", adminApi);
app.all('/*', app.Router().end())
>>>>>>> 127472db1caa5ce06ccd56198cfb8c002160ad53

app.listen(port, () => console.log(`listening port ${port}`));