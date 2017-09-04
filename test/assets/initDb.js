const server = require("../../src/server");

// Models
const Customer = require("../../src/model/customer");
const Card = require("../../src/model/card");
const Order = require("../../src/model/order");

// External refs
const Show1 = "c95d1fce-58a8-4046-9b46-57ccdf064461";
const Show2 = "eb0c6d1b-ada3-4666-bb07-3f31a43567da";
const Show3 = "22b62a56-8392-44fb-90b3-2d05b4a29e19";

async function initDb() {
    /*
    * Customer
    */
    const Nati = await Customer({
        id: "313247512",
        firstName: "Nati",
        lastName: "Oren",
        gender: "male",
        birthday: new Date(4, 2, 95)
    }).save();

    const Idan = await Customer({
        id: "313292781",
        firstName: "Idan",
        lastName: "Ashraf",
        gender: "male",
        birthday: new Date(12, 5, 95)
    }).save();

    const Adi = await Customer({
        id: "312336534",
        firstName: "Adi",
        lastName: "Oren",
        gender: "female",
        birthday: new Date( 21, 3, 95)
    }).save();


    /*
    * Card
    */
    const Card1 = await Card({
        number: "1234-4312-5678-5678",
        cvc: 123,
        expiration: new Date(1, 12, 18),
        ownerId: Nati.id
    }).save();

    const Card2 = await Card({
        number: "1234-4457-5678-4568",
        cvc: 123,
        expiration: new Date(1, 4, 18),
        ownerId: Idan.id
    }).save();

    const Card3 = await Card({
        number: "1213-4232-5128-1238",
        cvc: 123,
        expiration: new Date(1, 12, 18),
        ownerId: Adi.id
    }).save();


    /*
    * Order
    */
    const Order1 = await Order({
        tickets: 2,
        showId: Show1,
        customerId: Nati.id,
        cardNumber: Card1.number
    }).save();

    const Order2 = await Order({
        tickets: 5,
        showId: Show1,
        customerId: Idan.id,
        cardNumber: Card2.number
    }).save();

    const Order3 = await Order({
        tickets: 4,
        showId: Show2,
        customerId: Nati.id,
        cardNumber: Card1.number
    }).save();

    const Order4 = await Order({
        tickets: 2,
        showId: Show3,
        customerId: Adi.id,
        cardNumber: Card3.number
    }).save();
}

initDb();
