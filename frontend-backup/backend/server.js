require("dotenv").config();

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// Frontend
app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);


// Home page
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});


// Gmail transporter
const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

});


// Contact form
app.post("/api/contact", async (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;


    console.log("Contact message:", {
        name,
        email,
        subject,
        message
    });


    try {

        const info = await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            replyTo: email,

            subject: `Gori Business: ${subject}`,

            text: `
New Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
            `

        });


        console.log("EMAIL SENT!");
        console.log("Message ID:", info.messageId);
        console.log("Accepted:", info.accepted);
        console.log("Rejected:", info.rejected);
        console.log("Response:", info.response);


        res.json({

            success: true,

            message: "Message sent successfully"

        });


    } catch (error) {

        console.error("EMAIL ERROR:", error);


        res.status(500).json({

            success: false,

            message: "Unable to send email"

        });

    }

});


// Start server
app.listen(PORT, () => {

    console.log(
        `Gori Business server running on port ${PORT}`
    );

});