const FileSystem = require('./fileSystemService');
/**
 * The product class is used to perform
 * CRUD (Create, Read, Update and Delete) 
 * operations on records from db.
 * 
 */
 
class Product {
    constructor(connection) {
        this.db = connection;
    }

    // create new product
    createProduct = async (req, res) => {
        try {
            // let document;
            const { name, price, description, filename } = req.body;
            const currentDatetime = new Date();
            const filesystem = new FileSystem();
            
            if(!name || !price || !description || !filename){
                return res.status(400).json({
                    message: 'Missing required data',
                    success: false
                });
            }

            // lets check the filetype and know the method we'll use
            // and get file content. We'll return status code 415 if unsupported.
            const document = await filesystem.validateDocument(filename);
            if(!document){
                return res.status(415).json({
                    message: 'Unsupported file type in field filename or file does not exist.',
                    success: false
                });
            }

            const query = 'INSERT INTO _products (name, price, description, document, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [name, price, description, document, currentDatetime, currentDatetime];

            this.db.query(query, values, (error, results) => {
                if(error){
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                }else{
                    const product = {
                        id: results.insertId,
                        name,
                        price,
                        description,
                        document,
                        createdAt: currentDatetime,
                        updateAt: currentDatetime
                    };
                    res.status(200).json({
                        message: `Product created successfully`,
                        success: true,
                        data: product
                    });
                }
            });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // find one product
    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'SELECT * FROM _products WHERE id = ?';
            const values = [id];

            this.db.query(query, values, (error, results) => {
                if(error){
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                }else if(results.length === 0){
                    res.status(404).json({
                        message: `Product ${id} was not found`,
                        success: false,
                        data: null
                    });
                }else{
                    res.status(200).json({
                        message: `Product ${id} retrieved successfully`,
                        success: true,
                        data: results[0]
                    });
                }
            });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // Retrieve all product
    getAllProducts = async (req, res) => {
        try {
            const query = 'SELECT * FROM _products ORDER BY id DESC';

            this.db.query(query, (error, results) => {
                if(error){
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                }else{
                    res.status(200).json({
                        message: `All products retrieved successfully`,
                        success: true,
                        data: results
                    });
                }
            });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // update product
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price, description, filename } = req.body;
            const currentDatetime = new Date();
            const filesystem = new FileSystem();

            if(!name || !price || !description || !filename){
                return res.status(400).json({
                    message: 'Missing required data',
                    success: false
                });
            }

            // lets check the filetype and know the method we'll use
            // and get file content. We'll return status code 415 if unsupported.
            const document = await filesystem.validateDocument(filename);
            if(!document){
                return res.status(415).json({
                    message: 'Unsupported file type in field filename or file does not exist.',
                    success: false
                });
            }

            const query = 'UPDATE _products SET name = ?, price = ?, description = ?, document = ?, updatedAt = ? WHERE id = ?';
            const values = [name, price, description, document, currentDatetime, id];

            this.db.query(query, values, (error, results) => {
                if(error){
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                }else if(results.affectedRows === 0){
                    res.status(404).json({
                        message: `Product ${id} was not found`,
                        success: false,
                        data: null
                    });
                }else{
                    const product = {
                        name,
                        price,
                        description,
                        document,
                        updateAt: currentDatetime
                    };
                    res.status(200).json({
                        message: `Product ${id} updated successfully`,
                        success: true,
                        data: product
                    });
                }
            });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // delete product
    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM _products WHERE id = ?';
            const values = [id];

            this.db.query(query, values, (error, results) => {
                if(error){
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                }else if(results.affectedRows === 0){
                    res.status(404).json({
                        message: `Product ${id} was not found`,
                        success: false
                    });
                }else{
                    res.status(200).json({
                        message: `Product ${id} deleted successfully`,
                        success: true
                    });
                }
            });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }
}


module.exports = Product;