const thinky = require("../thinky");
const type = thinky.type;

const Order = thinky.createModel("Order", {
    id: type.string().optional(),
    tickets: type.number().integer().min(0),
    showId: type.string(),
    customerId: type.string(),
    cardNumber: type.string()
});

module.exports = Order;

const Customer = require("./customer");
const Card = require("./card");

Order.hasOne(Customer, "customer", "customerId", "id");
Order.hasOne(Card, "card", "cardNumber", "number");