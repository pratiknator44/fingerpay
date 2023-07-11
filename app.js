const express = require('express');
const app = express();
const userRoutes = require("./routes/user-crud.routes.js");
const cors = require('cors');
const mongo_dev = 'mongodb://localhost:27017/fingerpay-dev';
const credRoutes = require("./routes/credentials.routes.js");
// const mongo_prod = 'mongodb+srv://shv0:qwertyuiop@cluster0.h0vmr.mongodb.net/picsus?authSource=admin&replicaSet=atlas-csxoir-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
// // app.use('/', express.static(path.join(__dirname, 'public')));
const mongoose = require("mongoose");
app.use(express.urlencoded({extended: false}));     // shows req.body
app.use(express.json());

app.use(cors());

mongoose.set('strictQuery', true);      // suppress warning
// mongodb+srv://shv0:qwertyuiop@cluster0.h0vmr.mongodb.net/picsus?authSource=admin&replicaSet=atlas-csxoir-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
mongoose.connect(mongo_dev, { useNewUrlParser: true, useUnifiedTopology: true }).then(data => {
    console.log("=> Mongo connectivity success");
}).catch( error => {
    console.error("mongoose error ", error);
});
app.use("/user", userRoutes);
app.use("/creds", credRoutes);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    return res.status(404).json(error);
});

module.exports = app;       // can be used by other files

