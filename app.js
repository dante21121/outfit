const fileInput = document.getElementById("fileInput");

const fileText = document.getElementById("fileText");

const typeSelect = document.getElementById("typeSelect");

const saveBtn = document.getElementById("saveBtn");

const generateBtn = document.getElementById("generateBtn");

const topImage = document.getElementById("topImage");

const bottomImage = document.getElementById("bottomImage");

const shoesImage = document.getElementById("shoesImage");

const closetBtn = document.getElementById("closetBtn");

const closeClosetBtn = document.getElementById("closeClosetBtn");

const closetModal = document.getElementById("closetModal");

const topGrid = document.getElementById("topGrid");

const bottomGrid = document.getElementById("bottomGrid");

const shoesGrid = document.getElementById("shoesGrid");

let clothes = getClothes();

saveBtn.addEventListener("click", saveClothing);

generateBtn.addEventListener("click", generateOutfit);

closetBtn.addEventListener("click", openCloset);

closeClosetBtn.addEventListener("click", closeCloset);

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

		if (!type) return;

		clothes[type].push(item);

		saveClothes(clothes);

		fileInput.value = "";

		renderCloset();

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

function openCloset() {

	renderCloset();

	closetModal.classList.add("open");
}

function closeCloset() {

	closetModal.classList.remove("open");
}

function renderCloset() {

	renderCategory(topGrid, clothes.top, "top");

	renderCategory(bottomGrid, clothes.bottom, "bottom");

	renderCategory(shoesGrid, clothes.shoes, "shoes");
}

function renderCategory(container, items, type) {

	container.innerHTML = "";

	items.forEach(item => {

		const card = document.createElement("div");

		card.className = "clothing-card";

		card.innerHTML = `
			<img src="${item.image}">

			<button
				class="delete-btn"
				onclick="deleteClothing(${item.id}, '${type}')"
			>
				×
			</button>
		`;

		container.appendChild(card);
	});
}

function deleteClothing(id, type) {

	clothes[type] =
		clothes[type].filter(
			item => item.id !== id
		);

	saveClothes(clothes);

	renderCloset();

	generateOutfit();
}

renderCloset();

generateOutfit();
