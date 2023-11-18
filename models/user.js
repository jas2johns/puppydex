import mongoose from "mongoose";

const BreedSchema = new mongoose.Schema({
	id: Number,
	name: String,
	height: {
		imperial: String,
		metric: String,
	},
	weight: {
		imperial: String,
		metric: String,
	},
	bred_for: String,
	breed_group: String,
	life_span: String,
	temperament: String,
	origin: String,
	reference_image_id: String,
	image: {
		id: String,
		width: Number,
		height: Number,
		url: String,
	},
	imageUrl: String,
});

const UserSchema = new mongoose.Schema({
	emailAddress: String,
	favorites: [BreedSchema],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
