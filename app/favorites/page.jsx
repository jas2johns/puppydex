"use client";

import homeStyles from "../styles/Home.module.scss";
import styles from "./Favorites.module.scss";
import BreedCard from "@/components/Card";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const Favorites = () => {
	const [breeds, setBreeds] = useState([]);

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch("/api/favorites");
			const { favorites } = await response.json();

			setBreeds(favorites);
		};

		getUser();
	}, []);
	return (
		<>
			<header className={homeStyles["header"]}></header>
			<main>
				<h1>Favorites</h1>
				<div className={styles["favorites-container"]}>
					{breeds &&
						breeds.length > 0 &&
						breeds.map((br) => (
							<div id={br.id} key={br.id} className={``}>
								<BreedCard breed={br} />
							</div>
						))}
				</div>
			</main>
			<footer>
				<Navbar></Navbar>
			</footer>
		</>
	);
};

export default Favorites;
