"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./styles/Home.module.scss";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

export default function Index() {
	// use the useState hook to initialize a value for the breeds that
	// the cards will use
	const [breedResults, setBreedResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const search = (event) => {
		event.preventDefault();
		axios.get(`/api/search?term=${searchTerm}`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div className={styles.searchFormWrapper}>
					<form className="search-box" onSubmit={search}>
						<label className={styles.srOnly} htmlFor="breed-search">
							Search dog breeds
						</label>
						<input
							id="breed-search"
							placeholder="Search breeds"
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button
							type="submit"
							className={styles.invisible}
							aria-label="Search"
						/>
						<button
							type="reset"
							aria-label="Clear search"
							onClick={() => setSearchTerm("")}
						/>
					</form>
				</div>
			</header>
			{/* Map through the breed search results and 
			render a card for each one */}
			<main className={styles.resultsContainer}>
				<Carousel breeds={breedResults} />
			</main>
			<Navbar></Navbar>
		</div>
	);
}
