const fs = require('fs');
const path  = require('path');
const excelFile = require('read-excel-file/node');

/**
 * The filesystem class handles filetype verification,
 * and file content reading as requested.
 * 
 */

class FileSystem {
    // Get the file type/ext
    getFileType = (filename) => {
        return path.extname(filename);
    }


    // Check if file exists
    fileExist = (filepath) => {
        return new Promise((resolve, reject) => {
            fs.access(filepath, fs.constants.F_OK, (error) => {
                if(error){
                    resolve(false);
                }
                resolve(true);
            });
        });
    }

    // Validate document ensures document is valid for reading
    validateDocument = (filename) => {
        const allowFileTypes = ['.xlsx', '.xls'];
        if( allowFileTypes.includes(this.getFileType(filename)) ){
            return true;
        }
        return false;
    }
    

    // Read excel file contents
    readExcelFile = async (file) => {
        if( this.validateDocument(file.originalFilename) ){
            const excel = await excelFile(file.path);
            return excel;
        }
        return false;
    }
}

module.exports = FileSystem;
