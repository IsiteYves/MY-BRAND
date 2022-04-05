require("./db");
const app = require("express")(),
  cors = require("cors");

app.use(cors());

const port = process.env.PORT || 8000,
  server = require("http")
    .createServer(app)
    .listen(port, () => console.log(`Server started at port ${port}`)),
  io = require("./utils/socket").init(server);
io.on("connection", (socket) => {
  socket.on("signedIn", ({ name, message }) => {
    io.emit("signedIn", { name, message });
  });
  socket.on("signedOut", async ({ email }) => {
    await User.find({ email }).then(async (users) => {
      let user = users[0];
      user.extra.signedIn = false;
      await User.findOneAndUpdate({ email }, user);
    });
    io.emit("signedOut", {});
  });
});
