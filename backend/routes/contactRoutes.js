const express = require("express");
const Contact = require("../model/contact");
const router = express.Router();

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

    res.status(201).json({ success: true, message: "Message stored successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
});

module.exports = router;