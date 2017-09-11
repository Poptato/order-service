const Express = require("express");
const bodyParser = require("body-parser");

const InfoController = require("./controller/info-ctrl");
const CustomerController = require("./controller/customer-ctrl");
const OrderController = require("./controller/order-ctrl");

let server = new Express();
let port = process.env.PORT || 4000;

server.use(bodyParser.json());

server.use("/info", InfoController);
server.use("/customers", CustomerController);
server.use("/orders", OrderController);

server.listen(port, () => {
   console.log(`Shows service is running on port ${port}`);
});

module.exports = server;