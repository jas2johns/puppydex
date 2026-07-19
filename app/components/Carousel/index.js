import BreedCard from "../Card";
import styles from "./Carousel.module.scss";

const Carousel = ({ breeds }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.carousel}>
				{breeds &&
					breeds.length > 0 &&
					breeds.map((br) => (
						<article key={br.id} className={styles.carouselItem}>
							<BreedCard breed={br} />
						</article>
					))}
			</div>
		</div>
	);
};

export default Carousel;
