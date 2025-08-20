const express=require("express");

const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;



const app=express();

app.use(cors());
app.use(express.json());

const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});