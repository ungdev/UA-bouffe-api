/* eslint-disable */

require('dotenv').config();
const mysql = require('mysql2');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const seed = (file) =>
  new Promise((resolve) => {
    try {
      const lineReader = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, file)),
      });

      lineReader.on('line', (query) => {
        connection.query(query);
        console.log(query);
      });

      lineReader.on('close', () => {
        console.log('Finished !');
        resolve();
      });
    } catch (error) {
      console.error('Une erreur est survenue');
    }
  });

(async () => {
  await seed('categories.sql');
  await seed('items.sql');

  connection.end();
})();
