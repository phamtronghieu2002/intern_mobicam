require('dotenv').config()
const appMiddleware = require("./configs/appMiddleware.js");
const { InitApiRoute } = require("./route/web.js");
const express = require("express");
const path = require("path");


const app = express();
const port = process.env.PORT || 3000;


appMiddleware(express,app);
InitApiRoute(app);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(path.join(__dirname, "public")));


;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
