const services = require("../services");

exports.authenticateUser = async (req, res) => {
  const response = await services.authenticate(req.params.code);
  res.status(200).json(response);
};

exports.getLastsBooks = async (req, res) => {
  const response = await services.getLastsBooks(req.params.id);
  res.status(200).json(response);
};

exports.getHurbDashboard = async (req, res) => {
  const response = await services.hurbDashboard();
  res.status(200).json(response);
};

exports.createOrder = (req, res) => {
  const { request_code, category, requested_amount, status, hotel_id } =
    req.body;
  console.log;
  const response = services.createOrder(
    request_code,
    category,
    requested_amount,
    status,
    hotel_id
  );
  res.status(201).json(response);
};

exports.updateOwner = (req, res) => {
  const { id, name, email } = req.body;

  const response = services.updateOwner(id, name, email);

  res.status(203).json(response);
};

exports.updateOrderStatus = (req, res) => {
  const { id, status } = req.body;

  if (!status) res.status(400).json({ message: "Missing order status" });

  const response = services.changeOrderStatus(id, status);

  res.status(203).json(response);
};

exports.getOrders = async (req, res) => {
  const response = await services.getOrders();
  res.status(200).json(response);
};

exports.getOrdersByStatus = async (req, res) => {
  const status = req.params.status;
  const response = await services.getOrdersByStatus(status);

  res.status(200).json(response);
};

exports.getHotels = async (req, res) => {
  console.log(req.query);
  const response = await services.getHotels();
  console.log(response);
  res.status(200).json(response);
};

exports.getOwners = async (req, res) => {
  const response = await services.getOwners();
  console.log(response);
  res.status(200).json(response);
};

// exports.delete = (req, res) => {
//   let id = req.params.id;
//   res.status(200).send(`delete by id! --> ${id}`);
// };
// exports.getById = (req, res) => {
//   let id = req.params.id;
//   res.status(200).send(`get by ID! ${id}`);
// };
