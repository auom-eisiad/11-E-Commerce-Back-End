# E-Commerce Back-End

![Screenshot](images/backend.png)

## Description

I wanted to created a backend database that stores the products based on what catergory it falls under and the tags relating to the product. Through this project, I was able to understand how tables work. I also was able to learn how to get the items, post new items, put the updated item in the table and delete it from the table. 

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Only installations needed is `npm install` for the node modules.

## Usage

To use, you will need Insomnia or any application related to it to view how this project works.

[Connect DB and Product](https://drive.google.com/file/d/1u5_dpxlBH_mal1__E7-BoEXQCwWlV76n/view): Here I demostrate how to connect into the database and how to GET all products, GET one product, POST a new product, PUT the updated product, and DELETE the new product.

[Catergory](https://drive.google.com/file/d/1YfK0CO4-f65rk1iDXO_OtXtNoWjqOgqo/view): Here I demostrate how to GET all categories, GET one category, POST a new category, PUT the updated category, and DELETE the new category.

[Tag](https://drive.google.com/file/d/1HbJYDobmKw3f8qvxSw0XVuvg-1iJ3eZB/view): Here I demostrate how to GET all tags, GET one tag, POST a new tag, PUT the updated tag, and DELETE the new tag.

## Credits

N/A

## License

N/A

## Badges

N/A

## Features

N/A

## How to Contribute

N/A

## Tests

To test, create a dotenv file with these info inputted:
```
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='your password here'
```

Then create the database by directing into the db file in the command line: `cd db` then type `mysql -u root -p` and input your password.

In mysql, type `source schema.sql` and you should be connected!

After that, direct out of the db file by `cd ..` and type `node server.js` and you can see the site in `localhost:3001`