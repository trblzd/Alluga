import client from "./src/firebase";

const query = "SELECT * FROM products";

client.query(query, (err, res) => {
  if (err) throw err;
  const products = res.rows;
  console.log(products);
});
