

const express = require('express')
const app = express()
const MongoClient = require("mongodb").MongoClient;

// DB 연결정보 가져오기
const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER } = require('./public/config.js');

app.use(express.static(__dirname + '/public'));



let db

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.pssoytl.mongodb.net/?retryWrites=true&w=majority&appName=${DB_CLUSTER}`;


new MongoClient(uri).connect().then((client) => {
    console.log("db connect")
    db = client.db('forum')

    app.listen(8080, () => {
        console.log("server is running")
    })
}).catch((err) => {
    console.log("db connect error : " + err)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
