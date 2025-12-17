const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
 
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
 

    // 4️⃣ Send Email
     
  

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
