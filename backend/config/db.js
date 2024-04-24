import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://amrareone:fooddeliveryapp@cluster0.ndqpuoq.mongodb.net/food-app?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("MongoDB Connected...");
    });
};
