import mongoose from "mongoose";

export async function dbConnect() {
	await mongoose.connect(
		"mongodb+srv://jas2johns:BobBelcher1@burgercornercluster.unlzmtl.mongodb.net/puppdex?retryWrites=true&w=majority"
	);
}
