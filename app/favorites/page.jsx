"use client";

import homeStyles from "../styles/Home.module.scss";
import styles from "./Favorites.module.scss";
import BreedCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Favorites = () => {
	const [breeds, setBreeds] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [isSignedOut, setIsSignedOut] = useState(false);

	useEffect(() => {
		const getFavorites = async () => {
			try {
				const response = await fetch("/api/favorites");

				if (response.status === 401) {
					setIsSignedOut(true);
					return;
				}

				if (!response.ok) {
					throw new Error("Unable to load favorites");
				}

				const { favorites } = await response.json();
				setBreeds(favorites || []);
			} catch (err) {
				console.error(err);
				setError("Unable to load favorites.");
			} finally {
				setIsLoading(false);
			}
		};

		getFavorites();
	}, []);

	const handleFavoriteChange = (breed, isFavorite) => {
		if (!isFavorite) {
			setBreeds((currentBreeds) =>
				currentBreeds.filter(
					(currentBreed) => String(currentBreed.id) !== String(breed.id)
				)
			);
		}
	};

	return (
		<div className={styles.page}>
			<header className={homeStyles.header}></header>
			<main className={styles.container}>
				<section className={styles.section} aria-labelledby="favorites-heading">
					<div className={styles.sectionHeader}>
						<h1 id="favorites-heading">Favorites</h1>
					</div>

					{isLoading && (
						<p className={styles.status}>Loading favorites...</p>
					)}

					{error && <p className={styles.status}>{error}</p>}

					{isSignedOut && !isLoading && (
						<div className={styles.emptyState}>
							<h2>Sign in to view favorites.</h2>
							<p>Save breeds and revisit them from your account.</p>
							<a href="/api/auth/login?returnTo=/favorites">Sign in</a>
						</div>
					)}

					{!isSignedOut && !isLoading && !error && breeds.length === 0 && (
						<div className={styles.emptyState}>
							<h2>Your favorites are waiting.</h2>
							<p>Browse breeds and save the ones you want to revisit.</p>
							<a href="/">Back to explorer</a>
						</div>
					)}

					{breeds.length > 0 && (
						<div className={styles.favoritesContainer}>
							{breeds.map((breed) => (
								<article key={breed.id} className={styles.favoriteItem}>
									<BreedCard
										breed={breed}
										initialFavorite
										onFavoriteChange={handleFavoriteChange}
									/>
								</article>
							))}
						</div>
					)}
				</section>
			</main>
			<Navbar />
		</div>
	);
};

export default Favorites;
