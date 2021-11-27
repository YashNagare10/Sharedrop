require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var favicon = require('express-favicon')
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const connectDB = require('./database-configuration/connection');
connectDB();

app.use(cors());

app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.use(require('./router/routes'));

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});