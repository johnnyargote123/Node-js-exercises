import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  rol: String,
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: String
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
