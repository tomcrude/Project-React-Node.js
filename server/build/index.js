"use strict";
let express = require("express");
const routes = require("./Routes/routes");
const { midd } = require("./middleware/app.js");
const app = express();
const port = process.env.PORT || 4000;
app.use(midd);
app.use("/", routes);
app.listen(port, () => {
    console.log(`server open in port ${port}`);
});
