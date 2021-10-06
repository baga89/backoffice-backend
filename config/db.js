import mongoose from 'mongoose';

let dbUrl;

if (process.env.NODE_ENV !== 'production') {
  // dbUrl = 'mongodb://localhost:27017/favbetBackofficeDB';
  dbUrl = process.env.DB_URL;
} else {
  dbUrl = process.env.DB_URL;
}

export const connectDB = () => {
  mongoose.connect(dbUrl).then(() => console.log('Database connected'));
};
