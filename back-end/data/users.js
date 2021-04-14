import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Ryan Dhal',
		email: 'ryan@example.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		name: 'Jimmy Smith',
		email: 'jimmy@example.com',
		password: bcrypt.hashSync('123456', 10)
	}
];

export default users;
