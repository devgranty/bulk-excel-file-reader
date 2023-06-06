const FileSystem = require('./fileSystemService');
const Database = require('./databaseService');
/**
 * The product class is used to perform
 * CRUD (Create, Read, Update and Delete) 
 * operations on records from db.
 * 
 */
 
class Product extends Database {
    // Create a product from an excel file and store in DB
    createProduct = async (req, res) => {
        try {
            const { filename } = req.files;
            const currentDatetime = new Date();
            const filesystem = new FileSystem();
            let dataCount = 0;

            // Check for missing field values
            if(!filename.originalFilename){
                return res.status(400).json({
                    message: 'Missing required data',
                    success: false
                });
            }

            // Perform validation on excel file
            const document = await filesystem.readExcelFile(filename);
            if(!document){
                return res.status(415).json({
                    message: 'Unsupported file type in field filename or file does not exist.',
                    success: false
                });
            }

            // Loop through excel file data array and add each iteration to DB
            document.forEach(async (dataRow) => {
                dataCount++;
                if(dataCount === 1){
                    return;
                }

                const id = dataCount - 1;
                const name = dataRow[0];
                const price = dataRow[1];
                const description = dataRow[2];

                let data = {
                    id,
                    name,
                    price,
                    description,
                    createdAt: currentDatetime,
                    updatedAt: currentDatetime
                };

                await this.insertRecord('_products', data);
            });

            res.status(200).json({
                message: `${(dataCount - 1)} products created successfully`,
                success: true
            });

        }catch(error) {
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }
    

    // Find a single product in DB
    getProductById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const condition = `id = ${id}`;

            await this.findRecordById('_products', condition)
                .then((result) => {
                    if(result.length === 0){
                        res.status(404).json({
                            message: `Product ${id} was not found`,
                            success: false,
                            data: null
                        });
                    }else{
                        res.status(200).json({
                            message: `Product ${id} retrieved successfully`,
                            success: true,
                            data: result[0]
                        });
                    }
                }).catch((error) => {
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // Retrieve all products from DB
    getAllProducts = async (req, res) => {
        try {
            await this.getAllRecords('_products')
                .then((results) => {
                    res.status(200).json({
                        message: `All products retrieved successfully`,
                        success: true,
                        data: results
                    });
                }).catch((error) => {
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // Update a product in DB
    updateProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name, price, description } = req.body;
            const condition = `id = ${id}`;
            const currentDatetime = new Date();
            const filesystem = new FileSystem();

            // Check for missing field values
            if(!name || !price || !description){
                return res.status(400).json({
                    message: 'Missing required data',
                    success: false
                });
            }

            let data = {
                name,
                price,
                description,
                updatedAt: currentDatetime
            };

            await this.updateRecord('_products', data, condition)
                .then((result) => {
                    if(result === 0){
                        res.status(404).json({
                            message: `Product ${id} was not found`,
                            success: false,
                            data: null
                        });
                    }else{
                        res.status(200).json({
                            message: `Product ${id} updated successfully`,
                            success: true,
                            data
                        });
                    }
                }).catch((error) => {
                    res.status(500).json({
                        message: error,
                        success: false
                    });
                });
        }catch(error){
            res.status(500).json({
                message: error,
                success: false
            });
        }
    }


    // Delete a product from DB
    deleteProduct = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const condition = `id = ${id}`;

            await this.deleteRecord('_products', condition)
                .then((result) => {
                    if(result === 0){
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
                }).catch((error) => {
                    res.status(500).json({
                        message: error,
                        success: false
                    });
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