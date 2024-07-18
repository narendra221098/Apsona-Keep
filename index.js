require("dotenv").config(); // config env file
require("./config/database").connect();
const app = require("./app");

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running at PORT : ${process.env.PORT}`)
);
