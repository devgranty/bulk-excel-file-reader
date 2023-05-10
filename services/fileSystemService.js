const fs = require('fs');
const path  = require('path');
const excelFile = require('read-excel-file/node');

/**
 * The filesystem class handles filetype verification,
 * and file content reading as requested.
 * 
 */

class FileSystem {
    // create file path from file name.
    filePath = (fileName) => {
        return path.resolve(path.join('./documents/', fileName));
    }


    // get the file type/ext
    getFileType = (fileName) => {
        return path.extname(this.filePath(fileName));
    }


    // check if file exists
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


    // read csv file contents
    readCSVFile = async (fileName) => {
        try {
            const csv = await fs.promises.readFile(this.filePath(fileName), 'utf8');
            return csv;
        }catch(error){
            return `Error trying to read CSV file: ${error}`;
        }
    }
    

    // read excel file contents
    readExcelFile = async (fileName) => {
        try {
            const excel = await excelFile(this.filePath(fileName));
            return excel.join("\n");
        }catch(error){
            return `Error trying to read Excel file: ${error}`;
        }
    }


    // validate document ensures document is valid for reading
    validateDocument = async (fileName) => {
        if(this.getFileType(fileName) === '.csv' && await this.fileExist(fileName)){
            return await this.readCSVFile(fileName);
        }else if(['.xlsx', '.xls'].includes(this.getFileType(fileName)) && await this.fileExist(fileName)){
            return await this.readExcelFile(fileName);
        }else{
            return false;
        }
    }

}

module.exports = FileSystem;