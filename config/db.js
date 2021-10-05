import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/favbetBackofficeDB';

export const connectDB = () => {
  mongoose.connect(dbUrl).then(() => console.log('Database connected'));
};
