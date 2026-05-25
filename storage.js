function getClothes() {

	const data = localStorage.getItem("clothes");

	if (!data) {

		return {
			top: [],
			bottom: [],
			shoes: []
		};
	}

	return JSON.parse(data);
}

function saveClothes(clothes) {

	localStorage.setItem(
		"clothes",
		JSON.stringify(clothes)
	);
}
