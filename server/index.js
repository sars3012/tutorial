const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost', // the host name MYSQL_DATABASE: node_mysql
  user: 'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
  password: 'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'libros' // database name MYSQL_HOST_IP: mysql_db
})

  const app = express();
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  
  app.get('/', (req, res) => {
    res.send('Soy el Backend y estoy ejecutandome desde Node.js')
  });
  
  app.listen('7000' ,() => {}) 

  app.get('/libros/get', (req, res) => {
    const SelectQuery = " SELECT * FROM libro_criticas";
    db.query(SelectQuery, (err, result) => {
      res.send(result)
    })
  })
  
  app.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO libros_criticas (libro_nombre, critica) VALUES (?, ?)";
    db.query(InsertQuery, [libro_nombre, critica], (err, result) => {
      console.log(result)
    })
  })
  
  app.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM libro_criticas WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
      if (err) console.log(err);
    })
  })

  app.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE libro_criticas SET libro_critica = ? WHERE id = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
      if (err) console.log(err)
    })
  })

