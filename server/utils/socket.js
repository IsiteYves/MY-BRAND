let io;
const cors = require("cors");

module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "https://keystore.netlify.app",
        methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [""],
        credentials: true,
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};