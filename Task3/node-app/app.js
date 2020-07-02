const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;
let data = {};
let con;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => res.send("Hello node app!"));
app.post("/csv", (req, res) => {
  data = req.body;
  res.send("/csv");
});

app.post("/auth", (req, res) => {
  // db connection
  con = mysql.createConnection({
    host: "localhost",
    user: req.body.username,
    database: "csv",
    password: req.body.password,
  });
  if (req.body.username && req.body.password) {
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
      let query = `insert into table1 (client, deal, hour, accepted, refused) values ? ;`;
      con.query(query, [data], function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });
    });
  }
  res.send("/auth");
});

app.get("/import", (req, res) => {
  let query = `select * from table1`;
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  res.send(data);
});

app.delete("/import", (req, res) => {
  let query = `truncate table table1`;
  con.query(query, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });
  res.send(data);
});

// start server
app.listen(port, () =>
  console.log(`Node app listening at http://localhost:${port}`)
);
