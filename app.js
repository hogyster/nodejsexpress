//load our app server using express somehow...
//import
const express = require('express')
const app = express()
const mysql = require('mysql')
const morgan = require('morgan')

// app serve all the files inside public directory 
app.use(express.static('./public'))
app.use(morgan('short'))

app.get('/user_create', (req, res) => {
    console.log("Trying to create new user...")
    console.log("how do get the form data???")
    res.end()
})
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
        if (err) {
            console.log("failled to query for users" + err)
            res.sendStatus(500)
            return
            // throw err
        }
        // console.log("I think we fetched users successfully")

        // const users = rows.map((row) => {
        //     return {firstName: row.first_name}
        // })
        // res.json(users)
        res.json(rows)

    })
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