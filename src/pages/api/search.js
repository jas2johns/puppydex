// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const baseUrl = "https://api.thedogapi.com/";

export default async function handler(req, res) {
	// read the query from the request
	const response = await axios.get(
		baseUrl + `v1/breeds/search?limit=10&page=0&q=terrier`,
		{
			headers: {
				"x-api-key":
					"live_gPOoAfRbgovE80W0XvqyidYXNAhOaM0brZAye65mJ4nHiiMwk2bBedxS7UxZA5m1",
			},
		}
	);

	// get the first 3 breeds from the response
	const firstThreeBreeds = response.data.slice(0, 3);

	// create a function that takes an array of Ids and returns
	// promises that will get the image for each of the image Ids
	const getImagesForBreeds = (breedImageIds) => {
		console.log(breedImageIds);
		return breedImageIds.map((imageId) =>
			axios.get(baseUrl + `v1/images/${imageId}`)
		);
	};

	// get only the image Ids
	const imageIds = firstThreeBreeds.map((b) => b.reference_image_id);

	// get the result of the call to getImagesForBreeds
	const imageResults = await Promise.all(getImagesForBreeds(imageIds));
	// get only the image urls from the responses
	const images = imageResults.map((r) => r.data.url);

	// assign the imageUrls to the breeds
	for (let i = 0; i < firstThreeBreeds.length; i++) {
		firstThreeBreeds[i].imageUrl = images[i];
	}

	console.log(firstThreeBreeds);

	res.status(200).json(firstThreeBreeds);
}

//for the search return
// response.data.slice(0,2)

// make sure for the puppy card that you use the image tag to render the URL
