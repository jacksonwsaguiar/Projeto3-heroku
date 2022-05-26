const database = require("../database");

async function authenticate(code) {
  const data = await database.query(`SELECT * FROM owner WHERE access_code=${code}`);

  if (!data) return "user not found";

  return data;
}

async function getHotels(page = 1) {
  const offset = (page - 1) * 20;

  const data = await database.queryMany(`SELECT * FROM hotel LIMIT ?,?`, [offset, 20]);
  const bugetTotal = await database.query(`SELECT SUM(budget) as totalBudget FROM hotel`);
  
  const details = { bugetTotal };
  const meta = { page };

  return {
    data,
    details,
    meta,
  };
}
async function getOwners(page = 1) {
  const offset = (page - 1) * 20;

  const data = await database.queryMany(`SELECT * FROM owner LIMIT ?,?`, [offset, 20]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOrders(page = 1) {
  const offset = (page - 1) * 20;
  const data = await database.query(`SELECT * FROM orders LIMIT ?,?`, [offset, 20]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOrdersByStatus(status, page = 1) {
  const offset = (page - 1) * 20;
  const data = await database.query(`SELECT * FROM orders WHERE status=? LIMIT ?,?`, [
    status,
    offset,
    20,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function createOrder(
  request_code,
  category,
  requested_amount,
  status,
  owner_id
) {
  return database.run(
    `INSERT INTO orders (request_code, category, requested_amount, status, owner_id) values VALUES
     (${request_code}, ${category}, ${requested_amount}, ${status}, ${owner_id}})`
  );
}

function changeOrderStatus(id, status) {
  return database.run(
    `UPDATE orders
    SET status=${status}
    WHERE id=${id};`
  );
}

module.exports = {
  createOrder,
  getHotels,
  getOrders,
  changeOrderStatus,
  authenticate,
  getOrdersByStatus,
  getOwners
};
