const dogs = {
	sporting: "#C38E70",
	hound: "#8A5A44",
	working: "#B07D62",
	terrier: "#9D6B53",
	toy: "#E6B8A2",
	noSporting: "#CD9777",
	herding: "#D69F7E",
	miscellaneousServices: "#774936",
	foundationStockService: "#DEAB90",
};

export function getCardColor(dogGroup) {
	switch (dogGroup) {
		case "Toy":
			return dogs.toy;
		case "Hound":
			return dogs.hound;
		case "Terrier":
			return dogs.terrier;
		case "Working":
			return dogs.working;
		case "Mixed":
			return dogs.miscellaneousServices;
		case "Non-Sporting":
			return dogs.noSporting;
		case "Sporting":
			return dogs.sporting;
		case "Herding":
			return dogs.herding;
		default:
			return dogs.foundationStockService;
	}
}
