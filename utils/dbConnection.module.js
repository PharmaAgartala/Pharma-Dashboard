const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

pool.connect((err)=>{
    if(err){
      console.error(err);
    }else{
      console.log('DB connection successful!')
    }
})

module.exports = pool