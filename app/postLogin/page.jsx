import { getSession } from "@auth0/nextjs-auth0";
import { dbConnect } from "data/connection";
import User from "../../models/user";
import { redirect } from "next/navigation";

const PostLogin = async () => {
	const { user } = await getSession();

	const doUserCheck = async () => {
		await dbConnect();

		// get the user from the db
		const existingUser = await User.find({
			emailAddress: user.emailAddress,
		});

		// if user exists, direct to index
		if (!existingUser) {
			const userToAdd = new User({
				emailAddress: user.emailAddress,
				favorites: [],
			});

			await userToAdd.save();
		}

		redirect("/");
	};

	await doUserCheck();

	return <>redirecting...</>;
};

export default PostLogin;
