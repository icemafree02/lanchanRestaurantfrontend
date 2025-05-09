let quantity = 1;
const quantityElement = document.getElementById('quantity');
const decreaseButton = document.getElementById('decrease');
const increaseButton = document.getElementById('increase');
const addToCartButton = document.getElementById('addToCart');

decreaseButton.addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }
});

increaseButton.addEventListener('click', () => {
    quantity++;
    quantityElement.textContent = quantity;
});

document.addEventListener("DOMContentLoaded", () => {
    const noodleDetailContainer = document.getElementById('noodle-detail-container');
    noodleDetailContainer.innerHTML = "";

    fetch('http://localhost:3000/api/get-selected-noodle')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const noodle = data.Noodle;
            if (noodle) {
                const pictureElement = document.createElement('img');
                pictureElement.className = 'picture-detail';
                pictureElement.src = `http://localhost:3000/api/noodleimage/${noodle.Noodle_menu_id}`;
                pictureElement.alt = noodle.Noodle_menu_name;
                noodleDetailContainer.appendChild(pictureElement);

                const nameElement = document.createElement('h2');
                nameElement.className = 'title';
                nameElement.textContent = noodle.Noodle_menu_name;
                noodleDetailContainer.appendChild(nameElement);

                const priceElement = document.createElement('p');
                priceElement.className = 'price';
                priceElement.textContent = `${noodle.Noodle_menu_price} บาท`;
                noodleDetailContainer.appendChild(priceElement);

            } else {
                noodleDetailContainer.innerHTML = "<p>No noodle selected. Please go back and choose a noodle.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching noodle details:', error);
            noodleDetailContainer.innerHTML = "<p>Error loading noodle details. Please try again later.</p>";
        });
});
