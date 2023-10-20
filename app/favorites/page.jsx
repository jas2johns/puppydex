import homeStyles from "../styles/Home.module.scss";
import styles from "./Favorites.module.scss";
import BreedCard from "@/components/Card";
import Navbar from "@/components/Navbar";

const breeds = [
	{
		weight: { imperial: "40 - 65", metric: "18 - 29" },
		height: { imperial: "21 - 23", metric: "53 - 58" },
		id: 4,
		name: "Airedale Terrier",
		bred_for: "Badger, otter hunting",
		breed_group: "Terrier",
		life_span: "10 - 13 years",
		temperament:
			"Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
		origin: "United Kingdom, England",
		reference_image_id: "1-7cgoZSh",
		image: {
			id: "1-7cgoZSh",
			width: 645,
			height: 430,
			url: "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
		},
	},
	{
		weight: { imperial: "30 - 60", metric: "14 - 27" },
		height: { imperial: "17 - 21", metric: "43 - 53" },
		id: 15,
		name: "American Pit Bull Terrier",
		country_code: "US",
		bred_for: "Fighting",
		breed_group: "Terrier",
		life_span: "10 - 15 years",
		temperament:
			"Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous",
		reference_image_id: "HkC31gcNm",
		image: {
			id: "HkC31gcNm",
			width: 300,
			height: 244,
			url: "https://cdn2.thedogapi.com/images/HkC31gcNm.png",
		},
	},
	{
		weight: { imperial: "50 - 60", metric: "23 - 27" },
		height: { imperial: "17 - 19", metric: "43 - 48" },
		id: 16,
		name: "American Staffordshire Terrier",
		country_code: "US",
		bred_for: "",
		breed_group: "Terrier",
		life_span: "12 - 15 years",
		temperament:
			"Tenacious, Friendly, Devoted, Loyal, Attentive, Courageous",
		reference_image_id: "rJIakgc4m",
		image: {
			id: "rJIakgc4m",
			width: 357,
			height: 500,
			url: "https://cdn2.thedogapi.com/images/rJIakgc4m.jpg",
		},
	},
	{
		weight: { imperial: "40 - 65", metric: "18 - 29" },
		height: { imperial: "21 - 23", metric: "53 - 58" },
		id: 4,
		name: "Airedale Terrier",
		bred_for: "Badger, otter hunting",
		breed_group: "Terrier",
		life_span: "10 - 13 years",
		temperament:
			"Outgoing, Friendly, Alert, Confident, Intelligent, Courageous",
		origin: "United Kingdom, England",
		reference_image_id: "1-7cgoZSh",
		image: {
			id: "1-7cgoZSh",
			width: 645,
			height: 430,
			url: "https://cdn2.thedogapi.com/images/1-7cgoZSh.jpg",
		},
	},
	{
		weight: { imperial: "30 - 60", metric: "14 - 27" },
		height: { imperial: "17 - 21", metric: "43 - 53" },
		id: 15,
		name: "American Pit Bull Terrier",
		country_code: "US",
		bred_for: "Fighting",
		breed_group: "Terrier",
		life_span: "10 - 15 years",
		temperament:
			"Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous",
		reference_image_id: "HkC31gcNm",
		image: {
			id: "HkC31gcNm",
			width: 300,
			height: 244,
			url: "https://cdn2.thedogapi.com/images/HkC31gcNm.png",
		},
	},
	{
		weight: { imperial: "50 - 60", metric: "23 - 27" },
		height: { imperial: "17 - 19", metric: "43 - 48" },
		id: 16,
		name: "American Staffordshire Terrier",
		country_code: "US",
		bred_for: "",
		breed_group: "Terrier",
		life_span: "12 - 15 years",
		temperament:
			"Tenacious, Friendly, Devoted, Loyal, Attentive, Courageous",
		reference_image_id: "rJIakgc4m",
		image: {
			id: "rJIakgc4m",
			width: 357,
			height: 500,
			url: "https://cdn2.thedogapi.com/images/rJIakgc4m.jpg",
		},
	},
];

const Favorites = () => {
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
