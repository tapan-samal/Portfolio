import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "PORTFOLIO" })
    .then(() => {
      console.log(`Database is connected!`);
    })
    .catch((error) => {
      console.log(
        `Error occured while connecting to database: ${error.message}`
      );
    });
};

export default dbConnection;
