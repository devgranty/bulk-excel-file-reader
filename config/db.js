const mysql = require('mysql2');

// create connection to db
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

db.connect((error) => {
    if(error){
        console.error('Failed to connect to DB:', error);
    }else{
        console.log('Successfully connected to DB');   
    }
});

//export db connection
module.exports = db;