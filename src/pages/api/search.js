// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios';

const baseUrl = 'https://api.thedogapi.com/';

export default async function handler(req, res) {
  // read the query from the request
  const response = await axios
			.get(baseUrl + `v1/breeds/search?limit=10&page=0&q=terrier`, {
				headers: {
					'x-api-key': 'live_gPOoAfRbgovE80W0XvqyidYXNAhOaM0brZAye65mJ4nHiiMwk2bBedxS7UxZA5m1'
				}
			});
			const firstBreed = response.data[0];
      const imageId = firstBreed.reference_image_id;
      const imageResponse = await axios.get(baseUrl + `v1/images/${imageId}`);
      const imageUrl = imageResponse.data.url;
      const breedInfo = {...firstBreed, imageUrl};

				console.log(response.data);
			// map over the array of breeds and get the images and some stats
      
        res.status(200).json(breedInfo);
}

//for the search return
// response.data.slice(0,2)

// make sure for the puppy card that you use the image tag to render the URL