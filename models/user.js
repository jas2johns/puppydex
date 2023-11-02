import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	emailAddress: String,
	favorites: [
		{
			breedId: Number,
		},
	],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
