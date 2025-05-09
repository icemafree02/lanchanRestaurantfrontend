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
    const menuDetailContainer = document.getElementById('menu-detail-container');
    menuDetailContainer.innerHTML = "";

    fetch('http://localhost:3000/api/get-selected-menu')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const menu = data.Menu;
            if (menu) {
                const pictureElement = document.createElement('img');
                pictureElement.className = 'picture-detail';
                pictureElement.src = `http://localhost:3000/api/menuimage/${menu.Menu_id}`;
                pictureElement.alt = menu.Menu_name;
                menuDetailContainer.appendChild(pictureElement);

                const nameElement = document.createElement('h2');
                nameElement.className = 'title';
                nameElement.textContent = menu.Menu_name;
                menuDetailContainer.appendChild(nameElement);

                const priceElement = document.createElement('p');
                priceElement.className = 'price';
                priceElement.textContent = `${menu.Menu_price} บาท`;
                menuDetailContainer.appendChild(priceElement);

            } else {
                menuDetailContainer.innerHTML = "<p>No menu selected. Please go back and choose a menu.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching menu details:', error);
            menuDetailContainer.innerHTML = "<p>Error loading menu details. Please try again later.</p>";
        });
});
