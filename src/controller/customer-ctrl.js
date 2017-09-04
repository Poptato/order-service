const express = require("express");
const Customer = require("../model/customer");
const Order = require("../model/order");

const CustomerController = express.Router();

CustomerController.get("/", async (req, res) => {
    try {
        let customers = await Customer
            .getJoin({orders: true})
            .run();

        res.send(customers);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

CustomerController.post("/", async (req, res) => {
    try {
        let customer = new Customer(req.body);
        let created = await customer.saveAll();
        res.send(created);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

CustomerController.get("/:customerId", async (req, res) => {
   try {
       let customer = await Customer
           .get(req.params.customerId)
           .getJoin({orders: true})
           .run();

       res.send(customer);
   } catch (e) {
       res.status(500).send({message: e.toString()});
   }
});

CustomerController.delete("/:customerId", async (req, res) => {
    try {
        let deleted = Customer.get(req.params.customerId).delete().run();
        res.send(deleted);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

CustomerController.post("/:customerId/cards", async (req, res) => {
    try {
        let customer = await Customer.get(req.params.customerId).getJoin({cards: true}).run();
        let card = new Card(req.body);

        customer.cards.push(card);

        let updated = await customer.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

CustomerController.delete("/:customerId/cards/:cardNumber", async (req, res) => {
    try {
        let customer = await Customer.get(req.params.customerId).getJoin({cards: true}).run();
        let card = await Card.get(req.params.cardNumber).run();

        customer.cards.splice(customer.cards.find(card), 1);

        let updated = await customer.saveAll();
        res.send(updated);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

module.exports = CustomerController;
