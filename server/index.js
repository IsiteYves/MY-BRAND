require("./db");
const express = require("express"),
  app = express(),
  cors = require("cors"),
  { swaggerJsdoc, swaggerUi } = require("./utils/swagger"),
  { corsFunction } = require("./utils/cors"),
  dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

app.use(cors());
app.use(corsFunction());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/queries", require("./routes/query.routes"));

const port = process.env.PORT,
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
