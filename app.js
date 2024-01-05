let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Chicken',
        image: '3.PNG',
        price: 69
    },
    {
        id: 2,
        name: 'Fajitas',
        image: '2.PNG',
        price: 169
    },
    {
        id: 3,
        name: 'Chicken Masala',
        image: '1.PNG',
        price: 269
    },
    
];
let listCards  = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        let buttonText = isItemInListCards(key) ? 'Added to Cart' : 'Add To Cart';
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">$${value.price.toLocaleString()} / each</div>
            <button onclick="addToCard(${key})" ${isItemInListCards(key) ? 'disabled' : ''}>${buttonText}</button>`;
        list.appendChild(newDiv);
    });
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
    updateAddToCartButton(key);
}

function isItemInListCards(key) {
    return listCards[key] !== undefined;
}



function updateAddToCartButton(key) {
    const addToCartButton = document.querySelector(`.item:nth-child(${key + 1}) button`);
    if (addToCartButton) {
        addToCartButton.innerText = 'Added to Cart'; 
        addToCartButton.disabled = false; 
        addToCartButton.style.backgroundColor = '#808080'; 
    }
}
function removeFromCart(itemId) {
    const itemIndex = listCards.findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        delete listCards[itemIndex];
        renderCart();
        renderFoodItems();
        updateAddToCartButton(itemId); 
    }
}


function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>$${value.price.toLocaleString()}</div>
                <div class="quantity-options">
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                
                    <button class="delete-button" onclick="deleteItem(${key})">
                        <img src="image/delete-icon.png" alt="Delete Icon">
                    </button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    // Add the "Total: " with a space after it
    total.innerHTML = `<strong>Total: </strong>$${totalPrice.toLocaleString()}`;

    quantity.innerText = count;
}


function deleteItem(key) {
    if (listCards[key] !== undefined) {
        delete listCards[key];
        reloadCard();
        updateAddToCartButton(key); 
    }
}



function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}