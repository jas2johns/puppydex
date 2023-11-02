import { dbConnect } from "data/connection";
import User from "models/user";

export const GET = async function handler(req, { params }) {
	const userId = params.id;

	await dbConnect();

	const query = User.where({ emailAddress: userId });

	const user = await query.findOne();

	return user
		? new Response(user)
		: new Response(null, {
				status: 404,
		  });
};
