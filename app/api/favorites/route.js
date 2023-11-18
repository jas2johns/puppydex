import { getSession } from "@auth0/nextjs-auth0";
import { dbConnect } from "data/connection";
import User from "models/user";

export const POST = async function handler(req) {
	const { breed } = await req.json();
	const { user } = await getSession();

	await dbConnect();

	// get user
	const query = User.where({ emailAddress: user.email });

	const userToUpdate = await query.findOne();

	// add to favorites
	if (!userToUpdate?.favorites.some((f) => f.id)) {
		userToUpdate.favorites.push(breed);
	}

	// save user
	await userToUpdate.save();

	return new Response();
};

export const GET = async function handler(req) {
	const { user } = await getSession();
	await dbConnect();

	// get user
	const query = User.where({ emailAddress: user.email });

	const userFromDb = await query.findOne();

	console.log("userfromdb", userFromDb);

	return new Response(JSON.stringify({ favorites: userFromDb.favorites }));
};
