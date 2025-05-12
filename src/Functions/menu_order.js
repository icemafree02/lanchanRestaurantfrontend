// menu_order.js
export function fetchNoodlesAndMenu() {
  const menuContainer = document.getElementById('menu-container');

  if (menuContainer) {
    fetch('https://lanchangbackend-production.up.railway.app/menu')
      .then(response => response.json())
      .then(data => {
        menuContainer.innerHTML = '';

        data.forEach(item => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';

          const pictureElement = document.createElement('img');
          pictureElement.className = 'menu-picture';
          pictureElement.src = `https://lanchangbackend-production.up.railway.app/menuimage/${item.Menu_id}`;
          pictureElement.alt = item.Menu_name;
          menuItem.appendChild(pictureElement);

          const nameElement = document.createElement('div');
          nameElement.className = 'menu-name';
          nameElement.textContent = item.Menu_name;
          menuItem.appendChild(nameElement);

          const priceElement = document.createElement('div');
          priceElement.className = 'menu-price';
          priceElement.textContent = `${item.Menu_price}$`;
          menuItem.appendChild(priceElement);

          menuContainer.appendChild(menuItem);
        });
      })
      .catch(error => console.error('Error fetching menu:', error));
  }
}
