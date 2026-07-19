import BreedCard from "../Card";
import styles from "./Carousel.module.scss";

const Carousel = ({ breeds }) => {
	const hasSingleResult = breeds?.length === 1;

	return (
		<div className={styles.wrapper}>
			<div
				className={`${styles.carousel} ${
					hasSingleResult ? styles.singleResult : ""
				}`}
			>
				{breeds &&
					breeds.length > 0 &&
					breeds.map((br) => (
						<article
							key={br.id}
							className={styles.carouselItem}
							data-layout={hasSingleResult ? "featured" : undefined}
						>
							<BreedCard breed={br} />
						</article>
					))}
			</div>
		</div>
	);
};

export default Carousel;
