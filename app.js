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

const categorySections =
	document.querySelectorAll(".category-section");

let clothes = getClothes();

let currentOutfit = {
	top: null,
	bottom: null,
	shoes: null
};

let selectingType = null;

saveBtn.addEventListener("click", saveClothing);

generateBtn.addEventListener("click", generateOutfit);

closetBtn.addEventListener("click", openCloset);

closeClosetBtn.addEventListener("click", closeCloset);

fileInput.addEventListener("change", () => {

	if (fileInput.files[0]) {

		fileText.textContent =
			fileInput.files[0].name;

	} else {

		fileText.textContent =
			"Seleccionar prenda";
	}
});

function saveClothing() {

	const file = fileInput.files[0];

	if (!file) return;

	const type = typeSelect.value;

	if (!type) return;

	const reader = new FileReader();

	reader.onload = function(e) {

		const item = {
			id: Date.now(),
			image: e.target.result
		};

		clothes[type].push(item);

		saveClothes(clothes);

		fileInput.value = "";

		fileText.textContent =
			"Seleccionar prenda";

		typeSelect.selectedIndex = 0;

		renderCloset();

		generateOutfit();
	};

	reader.readAsDataURL(file);
}

function generateOutfit() {

	currentOutfit.top =
		getRandomItem(clothes.top);

	currentOutfit.bottom =
		getRandomItem(clothes.bottom);

	currentOutfit.shoes =
		getRandomItem(clothes.shoes);

	renderOutfit();
}

function renderOutfit() {

	renderImage(
		topImage,
		currentOutfit.top
	);

	renderImage(
		bottomImage,
		currentOutfit.bottom
	);

	renderImage(
		shoesImage,
		currentOutfit.shoes
	);
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

	selectingType = null;

	categorySections.forEach(section => {

		section.style.display = "block";
	});

	renderCloset();

	closetModal.classList.add("open");
	
	document.body.classList.add("modal-open");
}

function closeCloset() {

	closetModal.classList.remove("open");

	document.body.classList.remove("modal-open");
	
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
			<img
				src="${item.image}"
				onclick="selectClothing('${type}', ${item.id})"
			>

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

	if (
		currentOutfit[type] &&
		currentOutfit[type].id === id
	) {

		currentOutfit[type] =
			getRandomItem(clothes[type]);

		renderOutfit();
	}
}

function openCategorySelector(type) {

	selectingType = type;

	closetModal.classList.add("open");

	categorySections.forEach(section => {

		section.style.display = "none";
	});

	if (type === "top") {

		topGrid.parentElement.style.display =
			"block";
	}

	if (type === "bottom") {

		bottomGrid.parentElement.style.display =
			"block";
	}

	if (type === "shoes") {

		shoesGrid.parentElement.style.display =
			"block";
	}

	renderCloset();
}

function selectClothing(type, id) {

	if (!selectingType) return;

	const item =
		clothes[type].find(
			item => item.id === id
		);

	if (!item) return;

	currentOutfit[type] = item;

	renderOutfit();

	closeCloset();
}

renderCloset();

generateOutfit();
