const thinky = require("../../src/thinky");
const Customer = require("../../src/model/customer");
const Card = require("../../src/model/card");
const Order = require("../../src/model/order");

class DbInitializer {
    async init() {
        try {
            // Drop existing tables.
            await Promise.all([
                thinky.r.db("test").table("Customer").delete().run(),
                thinky.r.db("test").table("Card").delete().run(),
                thinky.r.db("test").table("Order").delete().run()
            ]);
        } finally {
            // Re-create & populate tables.
            this.customers = await this.createCustomers();
            this.cards = await this.createCards();
            this.orders = await this.createOrders();
        }

        console.info("Populated database...");
    }

    async createCustomers() {
        let mockCustomers = require("./mock-customers.json");
        return await Promise.all(mockCustomers.map(c => Customer(c).save()));
    }

    async createCards() {
        let mockCards = require("./mock-cards.json");
        return await Promise.all(mockCards.map(c => Card(c).save()));
    }

    async createOrders() {
        let mockOrders = require("./mock-orders.json");
        return await Promise.all(mockOrders.map(o => Order(o).save()));
    }
}

module.exports.go = async function() {
    const initializer = new DbInitializer();
    await initializer.init();
    process.exit();
};

module.exports.default = DbInitializer;
