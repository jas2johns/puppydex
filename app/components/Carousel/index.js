import { useState } from "react";
import BreedCard from "../Card";
import styles from "./Carousel.module.scss";

const Carousel = ({ breeds }) => {
	const [activeItemId, setActiveItemId] = useState();
	return (
		<div className={styles["wrapper"]}>
			<div className={styles["carousel"]}>
				{breeds &&
					breeds.length > 0 &&
					breeds.map((br) => (
						<div
							key={br.id}
							className={`${styles["carousel__item"]} ${
								activeItemId == br.id
									? styles["carousel__item--active"]
									: ""
							} `}
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
