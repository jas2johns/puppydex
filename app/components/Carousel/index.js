import { useState, useEffect } from "react";
import BreedCard from "../Card";
import styles from "./Carousel.module.scss";
import { motion, frame, useTransform, animate, inView } from "framer-motion";

const Carousel = ({ breeds }) => {
	const [activeItemId, setActiveItemId] = useState();

	const animateInactiveCard = (card) => {
		animate(
			card,
			{
				opacity: 0,
				display: "none",
			},
			{
				duration: 0.5,
			}
		);
	};

	const animateActiveCard = (card) => {
		const sequence = [
			[
				card,
				{
					width: "100vw",
					margin: "0 auto",
				},
				{
					duration: 0.5,
				},
			],
			[
				card,
				{
					scale: 1,
				},
				{
					duration: 0.5,
				},
			],
		];

		animate(sequence);
	};

	useEffect(() => {
		if (breeds) {
			const allCards = document.querySelectorAll(
				`.${styles["carousel__item"]}`
			);
			allCards.forEach((c) => {
				inView(
					c,
					(info) => {
						// TODO: set card to active
						info.target.classList.add(styles["active"]);

						return () => {
							info.target.classList.remove(styles["active"]);
						};
					},
					{},
					{
						once: false,
					}
				);
			});
		}
	}, [breeds]);

	return (
		<div className={styles["wrapper"]}>
			<div className={styles["carousel"]}>
				{breeds &&
					breeds.length > 0 &&
					breeds.map((br) => (
						<div
							id={br.id}
							key={br.id}
							className={`${
								activeItemId === br.id ? styles["active"] : ""
							} ${styles["carousel__item"]}`}
							onClick={() => setActiveItemId(br.id)}
						>
							<BreedCard breed={br} />
						</div>
					))}
			</div>
		</div>
	);
};

export default Carousel;
