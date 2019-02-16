module.exports = {
    getStudentIndex: (req, res) => {
        let query = "SELECT * FROM `students` ORDER BY id ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('students/index.ejs', {
                title: 'Welcome to School',
                students: result
            });
        });
    },
};