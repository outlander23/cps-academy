import {
  MONGODB_STR,
  DECRYPT_MONGODB_PASSWORD,
  DECRYPT_MONGODB_USERNAME,
} from "../utils/env.js";

import mongoose from "mongoose";

const MONGODB_URI = MONGODB_STR.replace(
  "<password>",
  DECRYPT_MONGODB_PASSWORD
).replace("<username>", DECRYPT_MONGODB_USERNAME);

const connectToMongoDB = () => {
  return mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to the database"))
    .catch((error) => {
      console.log("Failed to connect database");
      console.log(error);
      process.exit(1);
    });
};
export default connectToMongoDB;
