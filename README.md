# ECR-EXCEL-READER
__________________________________

Create  an API based application that reads an xlsx/CSV or excel document and;
uploads the content of this document to the database;
the database should also contain the following columns (name, price, description, document, createdAt, updateAt);

<!-- requirements;
1. Node.Js
2. Express.Js
3. MySQL

Note;
1. Review would be on code structure and everything OOP. -->

# Usage:
__________________________________
1. npm install
2. create database "ecr_excel_reader_db" and import the file in root dir "ecr_excel_reader_db.sql"
3. run "npm run serve" to start application


# Note:
__________________________________
1. All excel/csv files must be in documents directory
2. Change .env variables to your db credentials


# Endpoints:
__________________________________
* POST /v1/products       : create new product
* GET /v1/products        : get all products
* GET /v1/product/:id     : find product with ID
* PATCH /v1/product/:id   : update product with ID
* DELETE /v1/product/:id  : delete product with ID


# Fields:
__________________________________
* name        : Name of product
* price       : Price of product
* description : Description of product
* filename    : This is the name of the excel/csv file to be read. E.g "Sample-Spreadsheet-100-rows.csv"