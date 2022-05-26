const services = require("../services");

exports.authenticateUser = async (req, res) => {
  const response = await services.authenticate(req.params.code);
  res.status(200).json(response);
};

exports.createOrder = (req, res) => {
  const { request_code, category, requested_amount, status, owner_id } =
    req.body;
  const response = services.createOrder(
    request_code,
    category,
    requested_amount,
    status,
    owner_id
  );
  res.status(201).json(response);
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
