const router = require('express').Router();
const pool = require('../utils/dbConnection.module')
const { invoice } = require('../utils/SQL.json')
// GET ALL Invoices
router.get('/',(req,res)=>{
    const sql = invoice.getAll;
    pool.query(sql, (err, result) => {
        if(err){
            res.status(500).send({message : "Something Went Wrong",err});
        }else{
            res.status(200).send(result.rows);
        }
    })
})

// GET Invoice By ID
router.get('/:id',(req,res)=>{
    const sql = invoice.getByID
    pool.query(sql, [req.params.id], (err, result) => {
        if(err){
            res.status(500).send({message : "Something Went Wrong",err});
        }else{
            res.status(200).send(result.rows);
        }
    })})

// ADD Invoice
router.post('/add',(req,res)=>{

    const { distributor_name, invoice_number, amount, date, payment_type, comment, delivered_by, bill_type} = req.body;

    if(distributor_name && invoice_number && amount && date && payment_type && comment && delivered_by && bill_type){
        const sql = invoice.add
        pool.query(sql, [distributor_name, invoice_number, amount, date, payment_type, comment, delivered_by, bill_type], (err, result) => {
            if(err){
                res.status(500).send({message : "Something Went Wrong",err});
            }else{
                res.status(200).send({message : "Invoice Added Successfully",rowAffected : result.rowCount})
            }
        })
    }else{
        res.status(500).send("Missing Parameter !", { distributor_name, invoice_number, amount, date, payment_type, comment, delivered_by, bill_type});
    }
})

// UPDATE Invoice
router.put('/update/:id', async (req,res)=>{
    const getByID = invoice.getByID;

    pool.query(getByID, [req.params.id], (err, result)=>{
        if(err){
            res.status(500).send({message: "GET BY ID FAILED", err})
            return
        }else{
            if(result.rows.length === 0){
                res.status(404).send({message: "Invoice Not Found"})
                return
            }
            const data = result.rows[0];
            const updateData = {
                distributor_name : req.body.distributor_name || data.distributor_name,
                invoice_number : req.body.invoice_number || data.invoice_number,
                amount : req.body.amount || data.amount,
                date : req.body.date || data.date,
                payment_type : req.body.payment_type || data.payment_type,
                comment : req.body.comment || data.comment,
                delivered_by : req.body.delivered_by || data.delivered_by,
                bill_type : req.body.bill_type || data.bill_type
            }
            pool.query(invoice.update, Object.values(updateData), (err, result)=>{
                if(err) res.status(500).send({message: "UPDATE FAILED", err})
            })
            pool.query(invoice.add,  Object.values(updateData), (err, result)=>{
                if(err) res.status(500).send({message:"ADDING NEW ENTRY FAILED", err})
                res.status(200).send({message: "Invoice Updated Successfully", rowAffected : result.rowCount})
            })

        }
    })
})

// REMOVE Invoice
router.delete('/remove/:id',(req,res)=>{
    res.status(200).send("Delete " + req.params.id)
});

// UPLOAD CSV
router.post('/csv',(req,res)=>{
    res.status(200).send("Upload CSV ")
})

module.exports = router