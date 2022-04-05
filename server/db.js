const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://EveryOne:newpswd@pjs.qz9je.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MY-BRAND DB!!");
  })
  .catch((err) => console.log(err));