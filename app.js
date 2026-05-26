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

const confirmModal =
	document.getElementById("confirmModal");

const cancelDeleteBtn =
	document.getElementById("cancelDeleteBtn");

const confirmDeleteBtn =
	document.getElementById("confirmDeleteBtn");

let clothes = getClothes();

let currentOutfit = {
	top: null,
	bottom: null,
	shoes: null
};

let selectingType = null;

let deleteData = null;

saveBtn.addEventListener(
	"click",
	saveClothing
);

generateBtn.addEventListener(
	"click",
	generateOutfit
);

closetBtn.addEventListener(
	"click",
	openCloset
);

closeClosetBtn.addEventListener(
	"click",
	closeCloset
);

cancelDeleteBtn.addEventListener(
	"click",
	closeDeleteModal
);

confirmDeleteBtn.addEventListener(
	"click",
	confirmDelete
);

document.addEventListener(
	"visibilitychange",
	() => {

		if (!document.hidden) {

			generateOutfit();
		}
	}
);

fileInput.addEventListener(
	"change",
	() => {

		const file = fileInput.files[0];

		if (!file) {

			fileText.textContent =
				"Seleccionar prenda";

			return;
		}

		fileText.textContent =
			file.name;
	}
);

function resetUploadInputs() {

	fileInput.value = "";

	fileText.textContent =
		"Seleccionar prenda";

	typeSelect.selectedIndex = 0;
}

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

		resetUploadInputs();

		renderCloset();
	};

	reader.readAsDataURL(file);
}

async function generateOutfit() {

	const duration = 500;

	const interval = 80;

	const loops =
		Math.floor(duration / interval);

	for (let i = 0; i < loops; i++) {

		const randomTop =
			getRandomItem(clothes.top);

		const randomBottom =
			getRandomItem(clothes.bottom);

		const randomShoes =
			getRandomItem(clothes.shoes);

		renderImage(
			topImage,
			randomTop
		);

		renderImage(
			bottomImage,
			randomBottom
		);

		renderImage(
			shoesImage,
			randomShoes
		);

		await wait(interval);
	}

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
		Math.floor(
			Math.random() * array.length
		)
	];
}

function wait(ms) {

	return new Promise(resolve => {

		setTimeout(resolve, ms);
	});
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

	document.body.classList.add(
		"modal-open"
	);
}

function closeCloset() {

	closetModal.classList.remove("open");

	document.body.classList.remove(
		"modal-open"
	);
}

function renderCloset() {

	renderCategory(
		topGrid,
		clothes.top,
		"top"
	);

	renderCategory(
		bottomGrid,
		clothes.bottom,
		"bottom"
	);

	renderCategory(
		shoesGrid,
		clothes.shoes,
		"shoes"
	);
}

function renderCategory(
	container,
	items,
	type
) {

	container.innerHTML = "";

	items.forEach(item => {

		const card =
			document.createElement("div");

		card.className =
			"clothing-card";

		card.innerHTML = `
			<img
				src="${item.image}"
				class="closet-image"
			>

			<button
				class="delete-btn"
			>
				×
			</button>
		`;

		const image =
			card.querySelector(
				".closet-image"
			);

		image.onclick = () => {

			selectClothing(
				type,
				item.id
			);
		};

		const deleteBtn =
			card.querySelector(
				".delete-btn"
			);

		deleteBtn.onclick = (e) => {

			e.stopPropagation();

			openDeleteModal(
				item.id,
				type
			);
		};

		container.appendChild(card);
	});
}

function openDeleteModal(id, type) {

	deleteData = {
		id,
		type
	};

	confirmModal.classList.add(
		"open"
	);
}

function closeDeleteModal() {

	confirmModal.classList.remove(
		"open"
	);

	deleteData = null;
}

function confirmDelete() {

	if (!deleteData) return;

	const { id, type } = deleteData;

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
			getRandomItem(
				clothes[type]
			);

		renderOutfit();
	}

	closeDeleteModal();
}

function openCategorySelector(type) {

	selectingType = type;

	closetModal.classList.add(
		"open"
	);

	document.body.classList.add(
		"modal-open"
	);

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
