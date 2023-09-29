import 'dotenv/config';

import express from 'express';
import http from 'http';
import Router from './src/routers/index.js'
import dbConnection from "./src/config/db.js";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
await dbConnection()

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(Router);

app.use ((err, req, res, next) => {
    console.log("======" , err, "=====");
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message : err.message,
        statusCode,
        err : err
    });
})

const port = process.env.PORT || 4000;

const server  = http.createServer(app);
server.listen( port, () => {
    console.log( `server started at port : ${ port }` );
});

console.log("done")