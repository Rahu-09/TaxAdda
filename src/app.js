const express = require("express");
require("./db/conn")
const invoice = require("./models/invoice")
const invoiceRouter=require("./router/invoice")
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(invoiceRouter);


app.listen(port, () => {
    console.log(`port running on ${port}`);
})