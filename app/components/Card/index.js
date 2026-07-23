"use client";

import { getCardColor } from "../../dogGroups";
import styles from "./Card.module.scss";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

export default function BreedCard(props) {
	const { breed, initialFavorite = false, onFavoriteChange } = props;
	const { user, isLoading } = useUser();
	const [isBookmarked, setIsBookmarked] = useState(initialFavorite);
	const [isSaving, setIsSaving] = useState(false);
	const [favoriteError, setFavoriteError] = useState("");
	const [loginHref, setLoginHref] = useState("/api/auth/login");

	useEffect(() => {
		setIsBookmarked(initialFavorite);
	}, [initialFavorite]);

	useEffect(() => {
		const returnTo = `${window.location.pathname}${window.location.search}`;
		setLoginHref(
			`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`
		);
	}, []);

	useEffect(() => {
		if (!user) {
			return;
		}

		let isMounted = true;

		const loadFavoriteState = async () => {
			try {
				const response = await fetch("/api/favorites");

				if (!response.ok) {
					return;
				}

				const { favorites } = await response.json();
				const isFavorite = favorites?.some(
					(favorite) => String(favorite.id) === String(breed.id)
				);

				if (isMounted) {
					setIsBookmarked(Boolean(isFavorite));
				}
			} catch (err) {
				console.error("Unable to load favorite state", err);
			}
		};

		loadFavoriteState();

		return () => {
			isMounted = false;
		};
	}, [breed.id, user]);

	const addFavorite = async (breed) => {
		return fetch("/api/favorites", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ breed }),
		});
	};

	const removeFavorite = async (breed) => {
		return fetch("/api/favorites", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ breedId: breed.id }),
		});
	};

	useEffect(() => {
		const handleFavoritesChanged = (event) => {
			if (String(event.detail?.breedId) === String(breed.id)) {
				setIsBookmarked(Boolean(event.detail.isBookmarked));
			}
		};

		window.addEventListener(
			"puppydex:favorites-changed",
			handleFavoritesChanged
		);

		return () => {
			window.removeEventListener(
				"puppydex:favorites-changed",
				handleFavoritesChanged
			);
		};
	}, [breed.id]);

	const toggleFavorite = async () => {
		if (isSaving || isLoading) {
			return;
		}

		if (!user) {
			setFavoriteError("Sign in to save favorites.");
			return;
		}

		const nextState = !isBookmarked;
		setIsSaving(true);
		setFavoriteError("");
		setIsBookmarked(nextState);

		try {
			const response = nextState
				? await addFavorite(breed)
				: await removeFavorite(breed);

			if (!response.ok) {
				throw new Error("Favorite request failed");
			}

			onFavoriteChange?.(breed, nextState);
			window.dispatchEvent(
				new CustomEvent("puppydex:favorites-changed", {
					detail: {
						breedId: breed.id,
						isBookmarked: nextState,
					},
				})
			);
		} catch (err) {
			console.error(err);
			setIsBookmarked(!nextState);
			setFavoriteError("Favorite update failed.");
		} finally {
			setIsSaving(false);
		}
	};

	const breedGroupColor = getCardColor(breed.breed_group);
	return (
		<div
			style={{
				background: `radial-gradient(circle at 50% 0%, ${breedGroupColor} 36%, #ffffff 36%)`,
			}}
			className={styles.card}
		>
			<button
				type="button"
				className={`${styles.favoriteButton} ${
					isBookmarked ? styles.favoriteButtonActive : ""
				}`}
				aria-label={`${
					isBookmarked ? "Remove" : "Add"
				} ${breed.name} ${
					isBookmarked ? "from" : "to"
				} favorites`}
				aria-pressed={isBookmarked}
				disabled={isSaving || isLoading}
				onClick={toggleFavorite}
			>
				{isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
				<span>{isBookmarked ? "Saved" : "Save"}</span>
			</button>
			{favoriteError && (
				<div className={styles.favoriteMessage}>
					{favoriteError}{" "}
					{!user && <a href={loginHref}>Sign in</a>}
				</div>
			)}

			{breed.origin && (
				<div className={styles.origin}>{breed.origin}</div>
			)}
			<img src={breed.imageUrl} alt={`${breed.name} dog`} />
			<div className={styles.identity}>
				<h2 className={styles.name}>{breed.name}</h2>
				<div className={styles.breedGroup}>
					<span
						style={{
							backgroundColor: breedGroupColor,
						}}
					>
						{breed.breed_group || "unknown"}
					</span>
				</div>
				{breed.description && (
					<p className={styles.description}>{breed.description}</p>
				)}
			</div>
			<div className={styles.statsContainer}>
				<div className={styles.stats}>
					<div className={styles.bredFor}>
						<h3>Purpose</h3>
						<p>{breed.bred_for || "-"}</p>
					</div>
					<div className={styles.temperament}>
						<h3>Temperament</h3>
						<p>{breed.temperament || "-"}</p>
					</div>
					<div className={styles.lifeSpan}>
						<h3>Life Span</h3>
						<p>{breed.life_span || "-"}</p>
					</div>
				</div>
				<div className={`${styles.stats} ${styles.row2}`}>
					<div className={styles.height}>
						<h3>Height</h3>
						<p>{breed.height.imperial}</p>
					</div>
					<div className={styles.weight}>
						<h3>Weight</h3>
						<p>{breed.weight.imperial}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
