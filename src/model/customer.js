const thinky = require("../thinky");
const type = thinky.type;

const Customer = thinky.createModel("Customer", {
    id: type.string(),
    firstName: type.string().regex(/^[A-Z][a-z]+(-[A-Z][a-z]+)*$/).max(18),
    lastName: type.string().regex(/^[A-Z][a-z]+(-[A-Z][a-z]+)*$/).max(18),
    gender: type.string().enum(["male", "female"]),
    birthday: type.date()
});

module.exports = Customer;

const Order = require("./order");
const Card = require("./card");

Customer.hasMany(Order, "orders", "id", "customerId");
Customer.hasMany(Card, "cards", "id", "ownerId");