
import mongoose from 'mongoose';

export const connectDb = async() => {
  await mongoose.connect('mongodb+srv://bollampallyrahul1_db_user:resume123@cluster0.31nycii.mongodb.net/Resume')
    .then(() => console.log("✅ DB connected"))
    .catch((error) => console.error("❌ DB connection failed:", error.message));
};
