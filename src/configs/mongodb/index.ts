import mongoose from "mongoose";

export const mongodb = {
  connect() {
    mongoose.set("strictQuery", false);
    mongoose.Promise = Promise;
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.log("Error connecting to MongoDB", err));
  },

  //* pool connected
  // connect() {
  //   const connection = mongoose.createConnection(process.env.MONGO_URL);

  //   connection.on("connected", () => {
  //     console.log("Connected to MongoDB");
  //   });

  //   connection.on("error", (err) => {
  //     console.error("Connection error:", err);
  //   });

  //   connection.on("disconnected", () => {
  //     console.log("Disconnected from MongoDB");
  //   });

  //   process.on("SIGINT", () => {
  //     connection.close(() => {
  //       console.log("MongoDB connection closed due to app termination");
  //       process.exit(0);
  //     });
  //   });
  // },
};
