const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 8000;

app.set('port', process.env.port || port);

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'schools'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.set('views', __dirname + '/views'); // perintah untuk express merender views yang ada dalam folder news
app.set('view engine', 'ejs'); // konfigurasi template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express untuk memakai public folder
app.use(fileUpload()); // configure fileupload


const {getStudentIndex} = require('./routes/index');
const {addStudentPage, addStudent, editStudentPage, editStudent, deleteStudent} = require('./routes/students');

app.get('/', getStudentIndex);
app.get('/student/add', addStudentPage);
app.post('/student/add', addStudent);
app.get('/student/edit/:id', editStudentPage);
app.post('/student/edit/:id', editStudent);
app.get('/student/delete/:id', deleteStudent);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

