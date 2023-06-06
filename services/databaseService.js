const mysql = require('mysql2');
/**
 * The Database class creates a model 
 * of the database used to perform
 * transactions on the DB
 * 
 */


class Database {
    // create connection to db
    constructor() {
        this.db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB,
            connectionLimit: 10
        });
    }

    // execute queries
    executeQuery = (sql, params = []) => {
        return new Promise((resolve, reject) => {
            this.db.query(sql, params, (error, results) => {
                if(error){
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    // Retrieve all records
    getAllRecords = async (table) => {
        const sql = `SELECT * FROM ${table} ORDER BY id DESC`;
        try {
            const results = await this.executeQuery(sql);
            return results;
        } catch (error) {
            // console.log('Error fetching records:', error);
            throw new Error(error);
        }
    }


    // Retrieve a record from DB
    findRecordById = async (table, condition) => {
        const sql = `SELECT * FROM ${table} WHERE ${condition} LIMIT 1`;
        try {
            const results = await this.executeQuery(sql);
            return results;
        } catch (error) {
            // console.log('Error fetching record:', error);
            throw new Error(error);
        }
    }

    // Insert a record into the DB
    insertRecord = async (table, data) => {
        const sql = `INSERT INTO ${table} SET ?`;
        try {
            const results = await this.executeQuery(sql, data);
            return results.insertId;
        } catch (error) {
            // console.log('Error inserting record:', error);
            throw new Error(error);
        }
    }

    // Update a record in DB
    updateRecord = async (table, data, condition) => {
        const sql = `UPDATE ${table} SET ? WHERE ${condition}`;
        try {
            const results = await this.executeQuery(sql, data);
            return results.affectedRows;
        } catch (error) {
            // console.log('Error updating record:', error);
            throw new Error(error);
        }
    }

    // Delete a record in DB
    deleteRecord = async (table, condition) => {
        const sql = `DELETE FROM ${table} WHERE ${condition}`;
        try {
            const results = await this.executeQuery(sql);
            return results.affectedRows;
        } catch (error) {
            // console.log('Error deleting record:', error);
            throw new Error(error);
        }
    }
}

module.exports = Database;