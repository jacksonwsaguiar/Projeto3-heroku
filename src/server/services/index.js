const database = require("../database");

async function authenticate(code) {
  const data = await database.query(
    `SELECT * FROM owner WHERE access_code=${code}`
  );

  if (!data) return "user not found";

  return data;
}
async function hurbDashboard() {
  const D2 = await database.query(
    `SELECT SUM(requested_amount) as totalValue,COUNT(*) as totalOrders FROM orders WHERE category='D2' `
  );
  const D2hotel = await database.queryMany(
    `select COUNT(hotel_id) AS MOST_FREQUENT
    from orders WHERE category='D2'
    GROUP BY hotel_id
    ORDER BY COUNT(hotel_id) DESC `
  );
  const D7 = await database.query(
    `SELECT SUM(requested_amount) as totalValue,COUNT(*) as totalOrders FROM orders WHERE category='D7' `
  );
  const D7hotel = await database.queryMany(
    `select hotel_id, COUNT(hotel_id) AS MOST_FREQUENT, SUM(requested_amount) AS TOTAL_VALUE
      from orders WHERE category='D7'
      GROUP BY hotel_id
      ORDER BY COUNT(hotel_id) DESC `
  );
  const D15 = await database.query(
    `SELECT SUM(requested_amount) as totalValue,COUNT(*) as totalOrders FROM orders WHERE category='D15' `
  );
  const D15hotel = await database.queryMany(
    `select hotel_id, COUNT(hotel_id) AS MOST_FREQUENT
        from orders WHERE category='D15'
        GROUP BY hotel_id
        ORDER BY COUNT(hotel_id) DESC `
  );

  const averages = {
    lastMonth: "15000",
    currentMonth: "10000"
  };

  const ranking =   await database.queryMany(
    `select * from hotel LIMIT 6`
  );


  D2.averages = averages;
  // D2.rank = D2hotel;
  D2.rank = ranking;
  D7.averages = averages;
  // D7.rank = D7hotel;
  D7.rank = ranking;
  D15.averages = averages;
  // D15.rank = D15hotel;
  D15.rank = ranking;

  D2.payments = [
    {
      date: "10/08/2022",
      value: "15.000",
    },
    {
      date: "12/08/2022",
      value: "15.000",
    },
    {
      date: "02/09/2022",
      value: "15.000",
    },
    {
      date: "10/09/2022",
      value: "15.000",
    },
    {
      date: "16/09/2022",
      value: "15.000",
    },
    {
      date: "20/09/2022",
      value: "15.000",
    },
  ];
  D7.payments = [
    {
      date: "01/08/2022",
      value: "52.000",
    },
    {
      date: "13/08/2022",
      value: "150.000",
    },
    {
      date: "02/09/2022",
      value: "100.000",
    },
    {
      date: "18/09/2022",
      value: "135.000",
    },
    {
      date: "22/09/2022",
      value: "162.000",
    },
    {
      date: "20/09/2022",
      value: "158.000",
    },
  ];
  D15.payments = [
    {
      date: "01/08/2022",
      value: "22.000",
    },
    {
      date: "05/08/2022",
      value: "28.000",
    },
    {
      date: "22/09/2022",
      value: "17.000",
    },
    {
      date: "26/09/2022",
      value: "11.000",
    },
    {
      date: "29/09/2022",
      value: "12.000",
    },
    {
      date: "30/09/2022",
      value: "32.000",
    },
  ];

  // if (!data) return "user not found";

  return {
    D2,
    D7,
    D15,
  };
}
async function getLastsBooks(hotel_id) {
  const data = await database.queryMany(
    `SELECT * FROM (
      SELECT * FROM book WHERE hotel_id=? ORDER BY id DESC LIMIT 4
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

function updateOwner(id, name, email) {
  return database.run(
    `UPDATE owner
    SET name=?, email=?
    WHERE id=?;`,
    [name, email, id]
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
  hurbDashboard,
  updateOwner,
};
