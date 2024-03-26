const router = require('express').Router();


// GET ALL Invoices
router.get('/',(req,res)=>{
    res.status(200).send("GET ALL")
})

// GET Invoice By ID
router.get('/:id',(req,res)=>{
    res.status(200).send("GET BY ID" + req.params.id)
})

// ADD Invoice
router.post('/add',(req,res)=>{
    res.status(200).send("ADD")
})

// UPDATE Invoice
router.get('/update/:id',(req,res)=>{
    res.status(200).send("Update " + req.params.id)
})

// REMOVE Invoice
router.delete('/remove/:id',(req,res)=>{
    res.status(200).send("Delete " + req.params.id)
});

// UPLOAD CSV
router.post('/csv',(req,res)=>{
    res.status(200).send("Upload CSV ")
})