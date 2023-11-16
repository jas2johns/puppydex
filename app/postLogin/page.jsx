import { getSession } from "@auth0/nextjs-auth0";
import { dbConnect } from "data/connection";
import User from "../../models/user";
import { redirect } from "next/navigation";

const PostLogin = async () => {
	const { user } = await getSession();

	console.log("user from auth0", user);

	const doUserCheck = async () => {
		try {
			await dbConnect();

			// get the user from the db
			const existingUser = await User.find({
				emailAddress: user.email,
			});

			console.log("user result", existingUser);

			// if user exists, direct to index
			if (existingUser.length === 0) {
				const userToAdd = new User({
					emailAddress: user.email,
					favorites: [],
				});

				await userToAdd.save();

				console.log("saved user");
			}

			redirect("/");
		} catch (err) {
			console.error(err);
		}
	};

	await doUserCheck();

	return <>redirecting...</>;
};

export default PostLogin;
