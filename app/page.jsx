"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles/Home.module.scss";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";

const featuredSearchTerms = [
	"labrador retriever",
	"golden retriever",
	"german shepherd",
];

const breedGroups = [
	"Sporting",
	"Working",
	"Terrier",
	"Herding",
	"Toy",
	"Hound",
	"Non-Sporting",
];

const groupSearchTerms = {
	Sporting: "retriever",
	Working: "boxer",
	Terrier: "terrier",
	Herding: "shepherd",
	Toy: "chihuahua",
	Hound: "hound",
	"Non-Sporting": "bulldog",
};

export default function Index() {
	// use the useState hook to initialize a value for the breeds that
	// the cards will use
	const [breedResults, setBreedResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [featuredBreeds, setFeaturedBreeds] = useState([]);

	useEffect(() => {
		let isMounted = true;

		Promise.all(
			featuredSearchTerms.map((term) =>
				axios.get(`/api/search?term=${term}`)
			)
		)
			.then((responses) => {
				if (!isMounted) {
					return;
				}

				const breeds = responses
					.map((response) => response.data?.[0])
					.filter(Boolean);

				setFeaturedBreeds(breeds);
			})
			.catch((err) => {
				console.error("Unable to load featured breeds", err);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const search = (event) => {
		event.preventDefault();
		axios.get(`/api/search?term=${searchTerm}`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	};

	const runBreedSearch = (term, queryTerm = term) => {
		setSearchTerm(term);
		axios.get(`/api/search?term=${queryTerm}`).then((response) => {
			console.log(response.data);
			setBreedResults(response.data);
		});
	};

	const selectFeaturedBreed = (breed) => {
		setSearchTerm(breed.name);
		setBreedResults([breed]);
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
				{featuredBreeds.length > 0 && (
					<section
						className={styles.featuredBreeds}
						aria-labelledby="featured-breeds-heading"
					>
						<div className={styles.sectionHeader}>
							<h1 id="featured-breeds-heading">Featured Breeds</h1>
						</div>
						<div className={styles.featuredGrid}>
							{featuredBreeds.map((breed) => (
								<button
									key={breed.id}
									type="button"
									className={styles.featuredCard}
									onClick={() => selectFeaturedBreed(breed)}
								>
									<img
										src={breed.imageUrl}
										alt={`${breed.name} dog`}
									/>
									<span>{breed.name}</span>
								</button>
							))}
						</div>
					</section>
				)}
				<section
					className={styles.browseGroups}
					aria-labelledby="browse-groups-heading"
				>
					<div className={styles.sectionHeader}>
						<h1 id="browse-groups-heading">Browse by Group</h1>
					</div>
					<div className={styles.groupList}>
						{breedGroups.map((group) => (
							<button
								key={group}
								type="button"
								className={styles.groupButton}
								onClick={() =>
									runBreedSearch(group, groupSearchTerms[group])
								}
							>
								{group}
							</button>
						))}
					</div>
				</section>
				{breedResults.length > 0 && (
					<section
						className={styles.breedExplorer}
						aria-labelledby="breed-explorer-heading"
					>
						<div className={styles.sectionHeader}>
							<h1 id="breed-explorer-heading">Breed Explorer</h1>
						</div>
						<Carousel breeds={breedResults} />
					</section>
				)}
			</main>
			<Navbar></Navbar>
		</div>
	);
}
