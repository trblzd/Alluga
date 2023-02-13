const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 3002,
  user: "postgres",
  password: "1234",
  database: "Alluga",
});

client.connect();

module.exports = client;
