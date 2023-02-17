import axios from 'axios';
import React from 'react';

// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function App() {
	React.useEffect(() => {
		axios.get(`/api/search`).then(response => console.log(response.data))
	}, []);

	return <div />;
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
