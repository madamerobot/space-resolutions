//-----------------CONFIG---------------------//
require('dotenv').config()

//Start server
const Koa = require('koa');
const app = new Koa();

const koaStatic = require('koa-static')

//Init Koa-Body and Koa-Router
// const router = require('koa-router')();
const koaBody = require('koa-body');
const routes = require('./routes')

//Init DB
const mongoose = require('mongoose')
const db = mongoose.connection;

//-----------------KOA INIT---------------------//
//Route for static files
app.use(koaStatic(__dirname + '/public/dist'));

//Koa Body to read content of request body
app.use(koaBody());
app.use(routes.routes())

//Connecting to MongoDB
const connectToDB = () => {
    mongoose.connection.openUri('mongodb://127.0.0.1:27017')
        .once('open', () => console.log('DB connected'))
        .on('error', (error) => {
            console.warn('Warning', error);
    });
}

//Setting up localhost
const server = app.listen(process.env.PORT, () => {
    console.log('Yolo, this http://localhost is running:' + server.address().port);
    connectToDB();
})

module.exports = app