import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: false },
    profilePic: { type: String, required: false },
    bio: { type: String, required: false },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  mongoose.deleteModel("users");
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
