import mongoose from 'mongoose';

let dbUrl;

if (process.env.NODE_ENV !== 'production') {
  dbUrl = process.env.DB_URL_DEV;
} else {
  dbUrl = process.env.DB_URL_PROD;
}

export const connectDB = () => {
  mongoose.connect(dbUrl).then(() => console.log('Database connected'));
};
