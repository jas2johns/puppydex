export default function BreedCard(props) {
	const { breed } = props;
	return (
		<>
			<h1>A Breed Card</h1>
			<img src={breed.imageUrl} width={200} />
			<h3>{breed.height.imperial}</h3>
		</>
	);
}
