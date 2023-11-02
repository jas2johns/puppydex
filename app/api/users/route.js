import { dbConnect } from "data/connection";
import User from "models/user";

export const POST = async function handler(req) {
	const user = req.body.user;

	await dbConnect();

	const userToAdd = new User({
		emailAddress: user.emailAddress,
		favorites: [],
	});

	await userToAdd.save();

	return new Response();
};
