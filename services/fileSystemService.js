const fs = require('fs');
const path  = require('path');
const excelFile = require('read-excel-file/node');

/**
 * The filesystem class handles filetype verification,
 * and file content reading as requested.
 * 
 */

class FileSystem {
    // Create file path from file name.
    filePath = (fileName) => {
        return path.resolve(path.join('./documents/', fileName));
    }


    // Get the file type/ext
    getFileType = (fileName) => {
        return path.extname(this.filePath(fileName));
    }


    // Check if file exists
    fileExist = (fileName) => {
        return new Promise((resolve, reject) => {
            fs.access(this.filePath(fileName), fs.constants.F_OK, (error) => {
                if(error){
                    resolve(false);
                }
                resolve(true);
            });
        });
    }


    // Read csv file contents
    // readCSVFile = async (fileName) => {
    //     try {
    //         const csv = await fs.promises.readFile(this.filePath(fileName), 'utf8');
    //         return csv;
    //     }catch(error){
    //         console.log('Error trying to read CSV file:', error);
    //         throw error;
    //     }
    // }
    

    // Read excel file contents
    readExcelFile = async (fileName) => {
        try {
            const excel = await excelFile(this.filePath(fileName));
            return excel;
        }catch(error){
            console.log('Error trying to read Excel file:', error);
            throw error;
        }
    }


    // Validate document ensures document is valid for reading
    validateDocument = async (fileName) => {
        if(['.xlsx', '.xls'].includes(this.getFileType(fileName)) && await this.fileExist(fileName)){
            return await this.readExcelFile(fileName);
        }else{
            return false;
        }
    }

}

module.exports = FileSystem;