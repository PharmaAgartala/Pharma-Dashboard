const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to Pharma Dashboard API's")
})

app.listen(PORT, ()=>{
    console.log("Listing on post" + PORT)
})