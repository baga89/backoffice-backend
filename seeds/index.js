import mongoose from 'mongoose';
import offices from './offices.js';
import Office from '../models/office.js';

mongoose.connect('mongodb://localhost:27017/favbetBackofficeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Office.deleteMany({});
  for (let i = 0; i < offices.length; i++) {
    const office = new Office(offices[i]);
    await office.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
