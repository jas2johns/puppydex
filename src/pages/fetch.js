import BreedCard from '@/components/Card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// const baseURL = "https://jsonplaceholder.typicode.com/posts/1";

export default function App() {
	// use the useState hook to initialize a value for the breeds that
	// the cards will use
	const [ breedResults, setBreedResults ] = useState([]);
	const [searchTerm, setSearchTerm] = useState();


	const search = ()=> {
		axios.get(`/api/search?term=${searchTerm}`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	};

	return (
		<div>
			{/* will update the state */}
			<input type="text" onChange={(e)=> setSearchTerm(e.target.value)} />
			<button onClick={search}>search</button>
			{/* Map through the breed search results and 
			render a card for each one */}
			{breedResults.length>0 && breedResults.map((br) => <BreedCard key={br.id} breed={br} />)}
		</div>
	);
}
