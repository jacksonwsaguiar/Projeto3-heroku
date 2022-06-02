const database = require("../database");

async function authenticate(code) {
  const data = await database.query(
    `SELECT * FROM owner WHERE access_code=${code}`
  );

  if (!data) return "user not found";

  return data;
}
async function getLastsBooks(hotel_id) {
  const data = await database.query(
    `SELECT * FROM (
      SELECT * FROM books WHERE hotel_id=? ORDER BY id DESC LIMIT 4
    ) as r ORDER BY id`,
    [hotel_id]
  );

  // if (!data) return "user not found";

  return data;
}

async function getHotels(page = 1) {
  const offset = (page - 1) * 20;

  const data = await database.queryMany(`SELECT * FROM hotel LIMIT ?,?`, [
    offset,
    20,
  ]);
  const bugetTotal = await database.query(
    `SELECT SUM(budget) as totalBudget FROM hotel`
  );

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

  const data = await database.queryMany(`SELECT * FROM owner LIMIT ?,?`, [
    offset,
    20,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOrders(page = 1) {
  const offset = (page - 1) * 20;
  const data = await database.queryMany(`SELECT * FROM orders LIMIT ?,?`, [
    offset,
    20,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOrdersByStatus(status, page = 1) {
  const offset = (page - 1) * 20;
  const data = await database.query(
    `SELECT * FROM orders WHERE status=? LIMIT ?,?`,
    [status, offset, 20]
  );
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
  hotel_id
) {
  database.run(
    `INSERT INTO orders (request_code, category, requested_amount, status, hotel_id) VALUES
     (?,?,?,?,?)`,
    [request_code, category, requested_amount, status, hotel_id]
  );
  const response = {
    status: 200,
    order: {
      request_code: request_code,
      category: category,
      requested_amount: requested_amount,
      status: status,
      hotel_id: hotel_id,
    },
  };
  return response;
}

function changeOrderStatus(id, status) {
  return database.run(
    `UPDATE orders
    SET status=?
    WHERE id=?;`,
    [status, id]
  );
}

module.exports = {
  createOrder,
  getHotels,
  getOrders,
  changeOrderStatus,
  authenticate,
  getOrdersByStatus,
  getOwners,
  getLastsBooks,
};
