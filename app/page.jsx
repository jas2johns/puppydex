"use client";

import React, { useEffect, useState } from "react";
import BreedCard from "./components/Card";
import axios from "axios";
import styles from "./styles/Home.module.scss";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

export default function Index() {
	// use the useState hook to initialize a value for the breeds that
	// the cards will use
	const [breedResults, setBreedResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState();

	const search = (event) => {
		event.preventDefault();
		axios.get(`/api/search?term=${searchTerm}`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	};

	return (
		<div>
			<header className={styles["header"]}>
				{/* will update the state */}
				<div className={styles["searchFormWrapper"]}>
					<form className={"search-box"}>
						<input
							placeholder=" "
							type="text"
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="submit"
							className={styles["invisible"]}
							onClick={search}
						></button>
						<button type="reset"></button>
					</form>
				</div>
			</header>
			{/* Map through the breed search results and 
			render a card for each one */}
			<div className={styles["results-container"]}>
				<Carousel breeds={breedResults} />
			</div>
			<Navbar></Navbar>
		</div>
	);
}
