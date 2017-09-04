const thinky = require("../thinky");
const type = thinky.type;

const Card = thinky.createModel("Card", {
    number: type.string().regex(/^\d{4}(-\d{4}){3}$/),
    cvc: type.number().integer().min(100).max(999),
    expiration: type.date(),
    ownerId: type.string()
});

module.exports = Card;

const Customer = require("./customer");
const Order = require("./order");

Card.hasOne(Customer, "owner", "ownerId", "id");
Card.hasMany(Order, "orders", "id", "cardNumber");