const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const User = require('../models/UserModel');

const connectDB = require('../db');

connectDB();

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await User.insertMany(users);
    console.log('Data successfully loaded!.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deletData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted!.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deletData();
}
