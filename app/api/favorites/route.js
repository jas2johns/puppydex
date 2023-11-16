export const POST = async function handler(req) {
	const breed = req.body.breed;

	await dbConnect();

	// get user

	// TODO: get the user from the session
	const query = User.where({ emailAddress: userId });

	const user = await query.findOne();

	// add to favorites
	user.favorites.push(breed);

	// save user
	await user.save();

	return new Response();
};
