const express = require("express");
const Contact = require("../model/contact");
const router = express.Router();
const nodemailer=require("nodemailer")

router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      service,
      message
    });

    await contact.save();
    const  transporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.emailuser,
        pass:process.env.password
      }
    })
    
    const mailOptions = {
          from: process.env.emailuser,
          to: email,
          subject: "We received your message!",
          html: `
            <h3>Hello ${name},</h3>
            <p>Thanks for contacting us regarding: <b>${service}</b>.</p>
            <p>Your message:</p>
            <blockquote>${message}</blockquote>
            <p>Our team will get back to you soon.</p>
          `
        };
        await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Message stored successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router;