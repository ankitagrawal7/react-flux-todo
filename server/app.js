var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql'); 
var cors = require('cors');
var port = 5000 || process.env.port;

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_db"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/get-todos', (req, res) => {    
    con.query('SELECT * FROM todos', (err, result) => {
        if(err) throw err;
        if(result){
            res.send(result);
        }
    })
});

app.get('/get-count', (req, res) => {    
    con.query('SELECT SUM(case when t.status = 1 then 1 else 0 end) as "completed", SUM(case when t.status = 0 then 1 else 0 end) as "pending" FROM `todos` t', (err, result) => {
        if(err) throw err;
        if(result){
            const data = [result[0].pending, result[0].completed];
            res.send(data);
        }
    })
});

app.post('/add-todo', (req, res) => {
    const text = [req.body.text];
    con.query('INSERT INTO todos(text) VALUES(?)', [text], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.json({
                success: true
            });
        }
    })
});

app.post('/update-todo', (req, res) => {
    const data = req.body;
    con.query('UPDATE todos SET text=?, status=? WHERE id=?', [data.text, data.status, data.id], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.json({
                success: true
            });
        }
    })
});

app.get('/delete-todo/:id', (req, res) => {
    const id = [req.params.id];
    con.query('DELETE FROM todos WHERE id=?', [id], (err, result) => {
        if(err) throw err;
        if(result.affectedRows > 0){
            res.json({
                success: true
            });
        }
    })
});

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})