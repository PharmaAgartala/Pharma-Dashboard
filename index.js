const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const InvoiceRouter = require('./routes/invoice')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8080;
const pool = require('./utils/dbConnection.module')


app.get('/', (req, res) => {
    res.send("Welcome to Pharma Dashboard API's")
})

//* INVOICE ROUTES
app.use('/invoice', InvoiceRouter)


// //! TESTING
//     app.post('/sql',(req,res) => {
//         const {sql} = req.body;
//         pool.query(sql, (err, result) => {
//             if(err){
//                 res.status(500).send(err)
//             }else{
//                 res.status(200).send(result);
//             }
//         })
//     })


app.listen(PORT, ()=>{
    console.log("Listing on post" + PORT)
})


