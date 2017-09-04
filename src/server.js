const Express = require("express");
const bodyParser = require("body-parser");

const InfoController = require("./controller/info-ctrl");
const CustomerController = require("./controller/customer-ctrl");
const OrderController = require("./controller/order-ctrl");

let app = new Express();
let port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/info", InfoController);
app.use("/customers", CustomerController);
app.use("/orders", OrderController);

app.listen(port, () => {
   console.log(`Shows service is running on port ${port}`);
});

module.exports = app;