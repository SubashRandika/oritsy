import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/database.js';
import users from './data/users.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const insertData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		const insertedUsers = await User.insertMany(users);
		const adminUser = insertedUsers[0]._id;
		const productsToInsert = products.map((product) => {
			return {
				...product,
				user: adminUser
			};
		});

		await Product.insertMany(productsToInsert);

		console.log(`Data Inserted Successfully`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`Data Insertion Failed: ${error}`.brightRed.inverse);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		console.log(`Data Deleted Successfully`.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`Data Deletion Failed: ${error}`.brightRed.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	deleteData();
} else {
	insertData();
}
