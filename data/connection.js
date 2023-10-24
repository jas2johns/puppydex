export async function initDB() {
	await mongoose.connect(
		"mongodb+srv://jas2johns:BobBelcher1@burgercornercluster.unlzmtl.mongodb.net/puppdex?retryWrites=true&w=majority"
	);

	const UserSchema = new mongoose.Schema({
		emailAddress: String,
		favorites: [
			{
				breedId: Number,
			},
		],
	});

	const User = mongoose.model("User", UserSchema);
}
