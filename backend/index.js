// library imports
const express = require("express");
const cors = require("cors");

// local imports
const { rootRouter } = require("./routes/index.js")

// global variables
const PORT = 3000;
const app = express();

/*
 *
 * Routes:
 *
 * /api/v1/user/signup post   pass
 * /api/v1/user/signin post   pass
 * /api/v1/user/ put  pass
 * /api/v1/user/bulk get  pass
 * /api/v1/account/balance get   pass 
 * /api/v1/account/transfer post
 *
 * */

app.use(cors());
app.use(express.json());
app.use('/api/v1/', rootRouter);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on port", PORT);
});

