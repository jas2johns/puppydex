import { getCardColor } from "../pages/dogGroups";

export default function BreedCard(props) {
	const { breed } = props;
	return (
		<div
			style={{
				backgroundColor: getCardColor(breed.breed_group),
			}}
		>
			<h1>A Breed Card</h1>
			<img src={breed.imageUrl} width={200} />
			<h3>{breed.height.imperial}</h3>
		</div>
	);
}
