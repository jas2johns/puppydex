import mongoose from "mongoose";

export async function dbConnect() {
	await mongoose.connect(
		"mongodb+srv://jas2johns:BobBelcher1@burgercornercluster.unlzmtl.mongodb.net/puppydex?retryWrites=true&w=majority"
	);
}
