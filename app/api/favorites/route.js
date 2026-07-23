import { getSession } from "@auth0/nextjs-auth0";
import { dbConnect } from "data/connection";
import User from "models/user";

const getCurrentUser = async () => {
	const session = await getSession();

	if (!session?.user?.sub) {
		return null;
	}

	await dbConnect();

	const query = {
		$or: [
			{ auth0Id: session.user.sub },
			{ emailAddress: session.user.email },
		],
	};

	let user = await User.findOne(query);

	if (!user) {
		user = await User.create({
			auth0Id: session.user.sub,
			emailAddress: session.user.email,
			favorites: [],
		});
	} else if (!user.auth0Id || user.emailAddress !== session.user.email) {
		user.auth0Id = session.user.sub;
		user.emailAddress = session.user.email;
		await user.save();
	}

	return user;
};

const toSafeBreed = (breed) => {
	if (!breed?.id || !breed?.name) {
		return null;
	}

	return {
		id: breed.id,
		name: breed.name,
		height: breed.height,
		weight: breed.weight,
		bred_for: breed.bred_for,
		breed_group: breed.breed_group,
		life_span: breed.life_span,
		temperament: breed.temperament,
		origin: breed.origin,
		description: breed.description,
		reference_image_id: breed.reference_image_id,
		image: breed.image,
		imageUrl: breed.imageUrl || breed.image?.url,
	};
};

const errorResponse = (message, status) =>
	Response.json({ error: message }, { status });

export const GET = async function handler() {
	try {
		const user = await getCurrentUser();

		if (!user) {
			return errorResponse("Sign in to view favorites.", 401);
		}

		return Response.json({ favorites: user.favorites || [] });
	} catch (err) {
		console.error("Unable to load favorites", err);
		return errorResponse("Unable to load favorites.", 500);
	}
};

export const POST = async function handler(req) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			return errorResponse("Sign in to save favorites.", 401);
		}

		const { breed } = await req.json();
		const safeBreed = toSafeBreed(breed);

		if (!safeBreed) {
			return errorResponse("Breed data is required.", 400);
		}

		const alreadySaved = user.favorites.some(
			(favorite) => String(favorite.id) === String(safeBreed.id)
		);

		if (!alreadySaved) {
			user.favorites.push(safeBreed);
			await user.save();
		}

		return Response.json({ favorite: safeBreed, favorites: user.favorites });
	} catch (err) {
		console.error("Unable to save favorite", err);
		return errorResponse("Unable to save favorite.", 500);
	}
};

export const DELETE = async function handler(req) {
	try {
		const user = await getCurrentUser();

		if (!user) {
			return errorResponse("Sign in to remove favorites.", 401);
		}

		const { breedId } = await req.json();

		if (!breedId) {
			return errorResponse("Breed id is required.", 400);
		}

		user.favorites = user.favorites.filter(
			(favorite) => String(favorite.id) !== String(breedId)
		);
		await user.save();

		return Response.json({ favorites: user.favorites });
	} catch (err) {
		console.error("Unable to remove favorite", err);
		return errorResponse("Unable to remove favorite.", 500);
	}
};
