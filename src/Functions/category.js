//category.js

//เมนูทั้งหมด
export function showallmenu() {
    fetch('http://localhost:3333/noodle')
        .then(response => response.json())
        .then(data => {
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = ''; 

            data.forEach(item => {
                const noodleitem = document.createElement('div');
                noodleitem.className = 'menu-item';           
                
                const pictureElement = document.createElement('img');
                pictureElement.className = 'menu-picture';
                pictureElement.src = `http://localhost:3333/noodleimage/${item.Noodle_menu_id}`;
                pictureElement.alt = item.Noodle_menu_name;
                noodleitem.appendChild(pictureElement);

                const nameElement = document.createElement('div');
                nameElement.className = 'menu-name';
                nameElement.textContent = item.Noodle_menu_name;
                noodleitem.appendChild(nameElement);

                const priceElement = document.createElement('div');
                priceElement.className = 'menu-price'; 
                priceElement.textContent = `${item.Noodle_menu_price}$`;
                noodleitem.appendChild(priceElement);
                noodleContainer.appendChild(noodleitem);        
            });
        })
        .catch(error => console.error('Error:', error));

    fetch('http://localhost:3333/menu')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = ''; 

            data.forEach(item => {
                const menuitem = document.createElement('div');
                menuitem.className = 'menu-item';           
                
                const pictureElement = document.createElement('img');
                pictureElement.className = 'menu-picture';
                pictureElement.src = `http://localhost:3333/menuimage/${item.Menu_id}`;
                pictureElement.alt = item.Menu_name;
                menuitem.appendChild(pictureElement);

                const nameElement = document.createElement('div');
                nameElement.className = 'menu-name';
                nameElement.textContent = item.Menu_name;
                menuitem.appendChild(nameElement);
            
                const priceElement = document.createElement('div');
                priceElement.className = 'menu-price';
                priceElement.textContent = `${item.Menu_price}$`;
                menuitem.appendChild(priceElement);
                menuContainer.appendChild(menuitem);        
            });
        })
        .catch(error => console.error('Error:', error));
}

//น้ำตก

function showNamTok() {
    fetch('http://localhost:3333/namtok')
        .then(response => response.json())
        .then(data => {

            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = ''; 

            const namTokItems = data

            if (namTokItems.length === 0) {
                noodleContainer.textContent = 'ไม่พบเมนู';
            } else {
                namTokItems.forEach(item => {
                    const noodleitem = document.createElement('div');
                    noodleitem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/noodleimage/${item.Noodle_menu_id}`;
                    pictureElement.alt = item.Noodle_menu_name;
                    noodleitem.appendChild(pictureElement);

                    const nameElement = document.createElement('div');
                    nameElement.className = 'menu-name';
                    nameElement.textContent = item.Noodle_menu_name;
                    noodleitem.appendChild(nameElement);

                    const priceElement = document.createElement('div');
                    priceElement.className = 'menu-price';
                    priceElement.textContent = `${item.Noodle_menu_price}$`;
                    noodleitem.appendChild(priceElement);
                    noodleContainer.appendChild(noodleitem);        
                });
            }

            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = '';

        })
        .catch(error => {
            console.error('Error:', error);
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = 'Error loading Nam Tok noodles. Please try again.';
        });
}

function showNamSai() {
    fetch('http://localhost:3333/namsai')
        .then(response => response.json())
        .then(data => {

            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = ''; 

            const namTokItems = data

            if (namTokItems.length === 0) {
                noodleContainer.textContent = 'ไม่พบเมนู';
            } else {
                namTokItems.forEach(item => {
                    const noodleitem = document.createElement('div');
                    noodleitem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/noodleimage/${item.Noodle_menu_id}`;
                    pictureElement.alt = item.Noodle_menu_name;
                    noodleitem.appendChild(pictureElement);

                    const nameElement = document.createElement('div');
                    nameElement.className = 'menu-name';
                    nameElement.textContent = item.Noodle_menu_name;
                    noodleitem.appendChild(nameElement);

                    const priceElement = document.createElement('div');
                    priceElement.className = 'menu-price';
                    priceElement.textContent = `${item.Noodle_menu_price}$`;
                    noodleitem.appendChild(priceElement);
                    noodleContainer.appendChild(noodleitem);        
                });
            }

            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = '';
            
        })
        .catch(error => {
            console.error('Error:', error);
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = 'Error loading Nam Sai noodles. Please try again.';
        });
}

function showdrynoodle() {
    fetch('http://localhost:3333/drynoodle')
        .then(response => response.json())
        .then(data => {

            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = ''; 

            const namTokItems = data

            if (namTokItems.length === 0) {
                noodleContainer.textContent = 'ไม่พบเมนู';
            } else {
                namTokItems.forEach(item => {
                    const noodleitem = document.createElement('div');
                    noodleitem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/noodleimage/${item.Noodle_menu_id}`;
                    pictureElement.alt = item.Noodle_menu_name;
                    noodleitem.appendChild(pictureElement);

                    const nameElement = document.createElement('div');
                    nameElement.className = 'menu-name';
                    nameElement.textContent = item.Noodle_menu_name;
                    noodleitem.appendChild(nameElement);

                    const priceElement = document.createElement('div');
                    priceElement.className = 'menu-price';
                    priceElement.textContent = `${item.Noodle_menu_price}$`;
                    noodleitem.appendChild(priceElement);
                    noodleContainer.appendChild(noodleitem);        
                });
            }

            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = '';
            
        })
        .catch(error => {
            console.error('Error:', error);
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = 'Error loading Nam Sai noodles. Please try again.';
        });
}

function showBeverage() {
    fetch('http://localhost:3333/menu')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = ''; 

            const beverageItems = data.filter(item => item.Menu_category === "เครื่องดื่ม");

            if (beverageItems.length === 0) {
                menuContainer.textContent = 'ไม่พบเมนู';
            } else {
                beverageItems.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/menuimage/${item.Menu_id}`;
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
            }
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = '';
            
        })
        .catch(error => {
            console.error('Error:', error);
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = 'Error loading Beverage. Please try again.';
        });
}


function showappetizer() {
    fetch('http://localhost:3333/menu')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = ''; 

            const beverageItems = data.filter(item => item.Menu_category === "เครื่องเคียง");

            if (beverageItems.length === 0) {
                menuContainer.textContent = 'ไม่พบเมนู';
            } else {
                beverageItems.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/menuimage/${item.Menu_id}`;
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
            }
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = '';
            
        })
        .catch(error => {
            console.error('Error:', error);
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = 'Error loading Beverage. Please try again.';
        });
}

function showOthermenu() {
    fetch('http://localhost:3333/menu')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = ''; 

            const beverageItems = data.filter(item => item.Menu_category === "เมนูอื่น");

            if (beverageItems.length === 0) {
                menuContainer.textContent = 'ไม่พบเมนู';
            } else {
                beverageItems.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.className = 'menu-item';           
                    
                    const pictureElement = document.createElement('img');
                    pictureElement.className = 'menu-picture';
                    pictureElement.src = `http://localhost:3333/menuimage/${item.Menu_id}`;
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
            }
            const noodleContainer = document.getElementById('noodle-container');
            noodleContainer.textContent = '';
            
        })
        .catch(error => {
            console.error('Error:', error);
            const menuContainer = document.getElementById('menu-container');
            menuContainer.textContent = 'Error loading Beverage. Please try again.';
        });
}



document.addEventListener("DOMContentLoaded", () => {
    const allmenu = document.getElementById("allmenu");
    allmenu.addEventListener('click', showallmenu);

    const namTokBtn = document.getElementById("namtokbtn");
    namTokBtn.addEventListener('click', showNamTok);

    const namsaibtn = document.getElementById("namsaibtn");
    namsaibtn.addEventListener('click', showNamSai);

    const drynoodlebtn = document.getElementById("drynoodlebtn");
    drynoodlebtn.addEventListener('click', showdrynoodle);

    const beveragebtn = document.getElementById("beveragebtn");
    beveragebtn.addEventListener('click', showBeverage);

    const appetizerbtn = document.getElementById("appetizerbtn");
    appetizerbtn.addEventListener('click', showappetizer);

    const othermenubtn = document.getElementById("othermenubtn");
    othermenubtn.addEventListener('click', showOthermenu);
});








