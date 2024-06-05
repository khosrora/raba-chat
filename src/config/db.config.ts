import mongoose from "mongoose";

export const connectToMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log(`mongo db is connected`);
  } catch (error) {
    console.log(error);
  }
};
