const nodemailer = require("nodemailer");

async function sendOrderConfirmation(email, orderDetails) {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: options.from || `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
            to: email,
            subject: "Order Confirmation - SGK Fabrics",
            html: `
                <h2>Thank You for Your Order!</h2>
                <p>Your order has been placed successfully.</p>
                <h3>Order Details:</h3>
                <p>Order ID: ${orderDetails.id}</p>
                <ul>${orderDetails.items.map(item => `<li>${item.name} - ${item.price}</li>`).join("")}</ul>
                <p>Total Price: ${orderDetails.total}</p>
                <p>We will notify you once your order is shipped.</p>
                <br>
                <p>Best Regards,</p>
                <p>SGK Fabrics Team</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Order confirmation email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendOrderConfirmation;
