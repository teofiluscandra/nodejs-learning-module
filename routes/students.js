const fs = require('fs');

function addStudentPage (req, res) {
    res.render('students/add.ejs', {
        title: "Pendaftaran Siswa",
        message: ""
    })
}

function addStudent (req, res) {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let address = req.body.address;
    let number = req.body.number;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = number + Date.now() + '.' + fileExtension;
    let message = '';

    
    // check the filetype before uploading it
    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        // upload the file to the /public/assets/img directory
        uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
            if (err) {
                return res.status(500).send(err);
            }
            // query for add data
            let query = "INSERT INTO `students` (first_name, last_name, address, number, image) VALUES ('" +
                first_name + "', '" + last_name + "', '" + address + "', '" + number + "', '" + image_name + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
        res.render('student/add.ejs', {
            message,
            title: 'Pendaftaran Siswa'
        });
    }
}

function editStudentPage (req, res) {
    let id = req.params.id;
    let query = "SELECT * FROM `students` WHERE id = '" + id + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('students/edit.ejs', {
            title: 'Edit Student',
            student: result[0],
            message: ''
        });
    });
}

function editStudent (req, res) {
    let id = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let address = req.body.address;
    let number = req.body.number;

    let query = "UPDATE `students` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `address` = '" + address + "', `number` = '" + number + "' WHERE `students`.`id` = '" + id + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
}

function deleteStudent (req, res) {
    let id = req.params.id;
    let getImageQuery = 'SELECT image from `students` WHERE id = "' + id + '"';
    let deleteStudentQuery = 'DELETE FROM students WHERE id = "' + id + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteStudentQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    });
}

module.exports = {
    addStudentPage,
    addStudent,
    editStudentPage,
    editStudent,
    deleteStudent
}