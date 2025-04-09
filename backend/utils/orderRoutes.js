const express = require("express");
const sendOrderConfirmation = require("../utils/sendOrderConfirmation");

const router = express.Router();

// Example order placement API
router.post("/place-order", async (req, res) => {
    try {
        const { email, orderDetails } = req.body;

        // Call email function after order is placed
        await sendOrderConfirmation(email, orderDetails);

        res.status(200).json({ message: "Order placed successfully, email sent!" });
    } catch (error) {
        res.status(500).json({ error: "Order failed" });
    }
});

module.exports = router;
