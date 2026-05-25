const fileInput = document.getElementById("fileInput");
const typeSelect = document.getElementById("typeSelect");

const saveBtn = document.getElementById("saveBtn");
const generateBtn = document.getElementById("generateBtn");

const topImage = document.getElementById("topImage");
const bottomImage = document.getElementById("bottomImage");
const shoesImage = document.getElementById("shoesImage");

let clothes = getClothes();

saveBtn.addEventListener("click", saveClothing);

generateBtn.addEventListener("click", generateOutfit);

function saveClothing() {

	const file = fileInput.files[0];

	if (!file) return;

	const reader = new FileReader();

	reader.onload = function(e) {

		const item = {
			id: Date.now(),
			image: e.target.result
		};

		const type = typeSelect.value;

		clothes[type].push(item);

		saveClothes(clothes);

		fileInput.value = "";

		generateOutfit();
	};

	reader.readAsDataURL(file);
}

function generateOutfit() {

	const top = getRandomItem(clothes.top);
	const bottom = getRandomItem(clothes.bottom);
	const shoes = getRandomItem(clothes.shoes);

	renderImage(topImage, top);
	renderImage(bottomImage, bottom);
	renderImage(shoesImage, shoes);
}

function getRandomItem(array) {

	if (array.length === 0) return null;

	return array[
		Math.floor(Math.random() * array.length)
	];
}

function renderImage(element, item) {

	if (!item) {

		element.style.display = "none";
		return;
	}

	element.src = item.image;

	element.style.display = "block";
}

generateOutfit();
