# Bulk Excel File Reader

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

This a simple nodejs app that reads an excel file and stores its contents in a Database.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```console
git clone https://github.com/devgranty/bulk-excel-file-reader.git
```

To clone this repository


### Prerequisites

```console
npm install
```

To install dependencies

```console
npm start
```
To start app


## Usage <a name = "usage"></a>

- Create database "ecr_excel_reader_db" and import the file in root dir "ecr_excel_reader_db.sql" in your database.
- Create .env variables to your database credentials.

### Endpoints

- POST /v1/products       : create new product      :   fields [ filename ]
- GET /v1/products        : get all products
- GET /v1/product/:id     : find product with ID
- PATCH /v1/product/:id   : update product with ID  :   fields [ name, price, description ]
- DELETE /v1/product/:id  : delete product with ID

### Fields

- name        : Name of product
- price       : Price of product
- description : Description of product
- filename    : This is the name of the excel/csv file to be read. E.g "sample.csv"
