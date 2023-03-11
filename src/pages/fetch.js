import BreedCard from "@/components/Card";
import axios from "axios";
import React, { useEffect, useState } from "react";

// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function App() {
	// use the useState hook to initialize a value for the breeds that
	// the cards will use
	const [breedResults, setBreedResults] = useState([]);

	useEffect(() => {
		// search for the breeds and set the results
		axios.get(`/api/search`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	}, []);

	return (
		<div>
			{/* Map through the breed search results and 
			render a card for each one */}
			{breedResults.map((br) => (
				<BreedCard key={br.id} breed={br} />
			))}
		</div>
	);
}

// template !!!

// const fetchData = async searchTerm => {
//     const response = await axios.get('https://thedogapi.com/', {
//       params: {
//         // apikey: 'd9835cc5',
//         // dogAPI Key
//         apikey: 'live_gPOoAfRbgovE80W0XvqyidYXNAhOaM0brZAye65mJ4nHiiMwk2bBedxS7UxZA5m1',
//         s: searchTerm
//       }
//     });

//     if (response.data.Error) {
//       return [];
//     }

//     return response.data.Search;
//   };

//   const input = document.querySelector('input');

//   const onInput = async event => {
//     const movies = await fetchData(event.target.value);

//     for (let movie of movies) {
//       const div = document.createElement('div');

//       div.innerHTML = `
//         <img src="${movie.Poster}" />
//         <h1>${movie.Title}</h1>
//       `;

//       document.querySelector('#target').appendChild(div);
//     }
//   };
//   input.addEventListener('input', debounce(onInput, 500));
