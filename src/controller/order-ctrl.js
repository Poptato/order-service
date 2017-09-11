const express = require("express");
const Order = require("../model/order");
const ShowService = require("../service/show-srv");

const OrderController = express.Router();

OrderController.get("/", async (req, res) => {
    try {
        let orders = await Order
            .getJoin({customer: true})
            .run();

        if (req.query.include_show === "true") {
            for (order of orders) {
                order.show = await ShowService.getShowById(order.showId);
            }
        }

        res.send(orders);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

OrderController.post("/", async (req, res) => {
    try {
        let order = new Order(req.body);
        let show = await ShowService.updateShowSalesById(order.showId, -order.tickets);
        let created = await order.saveAll();
        created.show = show;
        res.send(created);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

OrderController.get("/:orderId", async (req, res) => {
   try {
       let order = await Order
           .get(req.params.orderId)
           .getJoin({customer: true})
           .run();

       res.send(order);
   } catch (e) {
       res.status(500).send({message: e.toString()});
   }
});

OrderController.delete("/:orderId", async (req, res) => {
    try {
        let deleted = await Order.get(req.params.orderId).delete().run();
        let show = await ShowService.updateShowSalesById(order.showId, order.tickets);
        res.send(deleted);
    } catch (e) {
        res.status(500).send({message: e.toString()});
    }
});

OrderController.get("/:orderId/receipt", async (req, res) => {
    try {
        let order = await Order.get(req.params.orderId).getJoin({customer: true}).run();
        let show = await ShowService.getShowById(order.showId, true);
        order.show = show;
        res.send(order);
    } catch (e) {
        res.status(500).send({message: e.toString()})
    }
});

module.exports = OrderController;
