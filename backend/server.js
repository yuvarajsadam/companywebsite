const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer=require("nodemailer")
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
const  transporter=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.emailuser,
    pass:process.env.password
  }
})

const mailOptions = {
      from: process.env.EMAIL_USER,
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

    // 4️⃣ Send Email
    await transporter.sendMail(mailOptions);
  

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes); // API route prefix

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
