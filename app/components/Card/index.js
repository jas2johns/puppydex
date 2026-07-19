"use client";

import { getCardColor } from "../../dogGroups";
import styles from "./Card.module.scss";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useState } from "react";

export default function BreedCard(props) {
	const { breed } = props;
	const [isBookmarked, setIsBookmarked] = useState(false);
	// TODO: use the above hook when you're reading from the database to display the correct icon
	// setIsBookmarked(true) if the card has been bookmarked in the db

	const addFavorite = async (breed) => {
		try {
			console.log("adding favorite");
			const response = await fetch("/api/favorites", {
				method: "POST",
				body: JSON.stringify({ breed }),
			});
		} catch (err) {
			console.error(err);
		}
	};

	const removeFavorite = async (breed) => {
		try {
			const response = await fetch({
				method: "DELETE",
				url: "/api/favorites/" + breed.id,
			});
		} catch (err) {
			console.error(err);
		}
	};

	const breedGroupColor = getCardColor(breed.breed_group);
	const handleFavoriteKeyDown = (event, action) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			action(breed);
		}
	};
	return (
		<div
			style={{
				background: `radial-gradient(circle at 50% 0%, ${breedGroupColor} 36%, #ffffff 36%)`,
			}}
			className={styles.card}
		>
			{isBookmarked ? (
				<BookmarkIcon
					role="button"
					tabIndex={0}
					aria-label={`Remove ${breed.name} from favorites`}
					className={styles["filled-green"]}
					onClick={() => removeFavorite(breed)}
					onKeyDown={(event) =>
						handleFavoriteKeyDown(event, removeFavorite)
					}
				/>
			) : (
				<BookmarkBorderIcon
					role="button"
					tabIndex={0}
					aria-label={`Add ${breed.name} to favorites`}
					className={styles["filled-green"]}
					onClick={() => addFavorite(breed)}
					onKeyDown={(event) =>
						handleFavoriteKeyDown(event, addFavorite)
					}
				/>
			)}

			{breed.origin && (
				<div className={styles.origin}>{breed.origin}</div>
			)}
			<img src={breed.imageUrl} alt={`${breed.name} dog`} />
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
			<div className={styles.statsContainer}>
				<div className={styles.stats}>
					<div className={styles.bredFor}>
						<h3>Bred For</h3>
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
