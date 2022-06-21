const Controller = require('../controllers');
module.exports = (app) => {
   app.get('/authenticate/:code', Controller.authenticateUser);
   app.get('/hotels', Controller.getHotels);
   app.get('/owners', Controller.getOwners);
   app.put('/owners', Controller.updateOwner);

   app.get('/books/lasts/:id', Controller.getLastsBooks);
   app.get('/hurb-analytics', Controller.getHurbDashboard);

   app.put('/orders', Controller.updateOrderStatus);
   app.post('/orders', Controller.createOrder);
   app.get('/orders', Controller.getOrders);
   app.get('/orders/:status', Controller.getOrdersByStatus);
   
}



