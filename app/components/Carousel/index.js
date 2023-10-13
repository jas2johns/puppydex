import { useState, useEffect } from "react";
import BreedCard from "../Card";
import styles from "./Carousel.module.scss";
import { motion, frame, useTransform, animate } from "framer-motion";

const Carousel = ({ breeds }) => {
	const [activeItemId, setActiveItemId] = useState();

	const animateInactiveCard = (card) => {
		animate(
			card,
			{
				scale: 0.8,
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
					scale: 1.1,
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
		const allCards = document.querySelectorAll(
			`.${styles["carousel__item"]}`
		);

		allCards.forEach((c) => {
			if (Number(c.id) === activeItemId) {
				animateActiveCard(c);
			} else {
				animateInactiveCard(c);
			}
		});
	}, [activeItemId]);

	return (
		<div className={styles["wrapper"]}>
			<div className={styles["carousel"]}>
				{breeds &&
					breeds.length > 0 &&
					breeds.map((br) => (
						<div
							id={br.id}
							key={br.id}
							className={styles["carousel__item"]}
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
