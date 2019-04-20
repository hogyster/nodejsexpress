//load our app server using express somehow...
//import
const express = require('express')
const app = express()
const mysql = require('mysql')

app.get("/user/:id", (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: 'root',
        database: 'mydb'
    })
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields)=> {
        console.log("I think we fetched users successfully")
        res.json(rows)
    })
    // res.end()
})

app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from Roooot")
})

app.get("/users", (req, res) => {
    
    var user1 = {firstName: "Stephan", lastName: "Curry"}
    const user2 = {firstName: "Kevin", lastName: "Durant"}
    res.json ([user1, user2])
    // res.send("Nodemon auto updates when I save this file")
})

//localhost:3003
app.listen(3006, () =>{
    console.log("Server is up and listening on 3006...");
    
})