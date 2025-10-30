const gallery = document.getElementById("gallery");
const statusText = document.getElementById("status");

const loadMoreBtn = document.getElementById("loadMore");
const clearGalleryBtn = document.getElementById("clearGallery");
const removeLastBtn = document.getElementById("removeLast");
const reverseGalleryBtn = document.getElementById("reverseGallery");

let currentPage = 1;
let allImages = [];


async function fetchImages(page = 1, limit = 4) {
    try {
        statusText.textContent = "Завантаження...";
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        const data = await response.json();
        statusText.textContent = "";
        return data;
    } catch (error) {
        statusText.textContent = "Помилка завантаження зображень!";
        console.error(error);
        return [];
    }
}

function renderGallery(images) {
    gallery.innerHTML = "";
    images.forEach(img => {
        const image = document.createElement("img");
        image.src = img.download_url;
        image.alt = img.author;
        image.title = `Автор: ${img.author}`;
        gallery.appendChild(image);
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    const images = await fetchImages(currentPage);
    allImages = images;
    renderGallery(allImages);
});

loadMoreBtn.addEventListener("click", async () => {
    currentPage++;
    const newImages = await fetchImages(currentPage);
    allImages = [...allImages, ...newImages];
    renderGallery(allImages);
});

clearGalleryBtn.addEventListener("click", () => {
    allImages = [];
    gallery.innerHTML = "";
    statusText.textContent = "Галерею очищено.";
});

removeLastBtn.addEventListener("click", () => {
    if (allImages.length === 0) {
        statusText.textContent = "Немає що видаляти!";
        return;
    }
    allImages.pop();
    renderGallery(allImages);
});


reverseGalleryBtn.addEventListener("click", () => {
    if (allImages.length === 0) {
        statusText.textContent = "Галерея порожня.";
        return;
    }
    allImages.reverse();
    renderGallery(allImages);
});
