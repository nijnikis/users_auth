import bcrypt from 'bcryptjs';
import User from '../models/User';

async function seed() {
	const userInitial = new User({
    email: 'example@example.com',
    password: bcrypt.hashSync('example1', 7),
  });
	userInitial.save();
}

seed();
