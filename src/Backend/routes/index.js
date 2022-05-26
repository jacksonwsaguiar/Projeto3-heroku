const Controller = require('../controllers');
module.exports = (app) => {
   app.get('/authenticate/:code', Controller.authenticateUser);
   app.get('/hotels', Controller.getHotels);
   app.get('/owners', Controller.getOwners);

   app.put('/orders', Controller.updateOrderStatus);
   app.post('/orders', Controller.createOrder);
   app.get('/orders', Controller.getOrders);
   app.get('/orders/:status', Controller.getOrdersByStatus);
   
}