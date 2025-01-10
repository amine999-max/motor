
function factory(id, name, price, image) {
    return {
        id: id,
        name: name,
        price: price,
        image: image,  
    }
}
var motors = [
    factory(1,"NINJA H2R", 290000, "https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190256_960_720.jpg"),
    factory(2,"R1M", 1900000, "https://www.motoplanete.com/yamaha/zoom-700px/10123-R1M-1000-2024-1000px.webp"),
    factory(3,"GSX-R1000", 390000, "https://lh5.googleusercontent.com/proxy/Bv4G3RC8PCEaJzAU17iuCaJD-LGfTNyFeaUG0JQFPOJf3PxGPOhMYzL08ylm-RXa2tEkEcVaw8rBA2xgRvwM3IXw9dzJNiSskKNcV-kBayXKAtfYl-QlCOLodOM8bi7tEm1WELowU6rx4bqtuEZbt5xjvFo"),
    factory(4,"HP4", 150000, "https://www.motoplanete.com/bmw/zoom-700px/BMW-S-1000-RR-HP4-Race-2020-700px.webp"),
    factory(5,"APRILIA RS ", 150000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBV7NdRYvc7Z-WVw6-BouUaFCralSJejkpA&s"),
    factory(6,"PULSAR RS", 180000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUIvFPFYgSBQGq-jIWlvPu3iIDEq9niGT8w&s")
]
var cart = JSON.parse(localStorage.getItem('cart')) || []  // stock cart in local storge

// Function display motors list
function displayMotors() {
    var productsList = document.getElementById("products-list")
    productsList.innerHTML = ''
    for (var i = 0; i < motors.length; i++) {
        var motor = motors[i]
        var motorDiv = document.createElement('div')
        motorDiv.className = 'motor'
        motorDiv.innerHTML = `
            <img src="${motor.image}" alt="${motor.name}" class="motor-image">
            <h3>${motor.name}</h3>
            <p>Price: $${motor.price}</p>
            <button onclick="addToCart(${motor.id})">Add to Cart</button>
            <button onclick="deleteMotor(${motor.id})">Delete Motor</button>
        `
        productsList.appendChild(motorDiv)
    }
}
// Function addto cart
function addToCart(id) {
    var motor = null
    for (var i = 0; i < motors.length; i++) {
        if (motors[i].id === id) {
            motor = motors[i]
        }
    }
    if (motor) {
        cart.push(motor)
        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartCount()
    }
    displayCartItems()
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length
}

// Function toggle cart 
function toggleCart() {
    var cartContainer = document.getElementById('cart-container')
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none'
    } else {
        cartContainer.style.display = 'block'
        displayCartItems();
    }
}

// Function display items 
function displayCartItems() {
    var cartItemsList = document.getElementById('cart-items')
    cartItemsList.innerHTML = ""
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty</p>'
    } else {
        for (var i = 0; i < cart.length; i++) {
            var motor = cart[i];
            var cartItemDiv = document.createElement('li')
            cartItemDiv.className = 'cart-item'
            cartItemDiv.innerHTML = `
                <img src="${motor.image}" alt="${motor.name}" style="width: 50px; height: auto; margin-right: 10px;">
                <div class="info">
                    <h3>${motor.name}</h3>
                    <p>Price: $${motor.price}</p>
                </div>
                <button onclick="removeFromCart(${motor.id})">Remove</button>
            `
            cartItemsList.appendChild(cartItemDiv)
        }
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!")   // ken cart fergha afficher msg
    } else {
        alert("Thank you for your purchase!") // ken lcart fiha affichi msg w faragh l cart 
        cart.length = 0
        updateCartCount()
        toggleCart()
    }
}

// Function remove item 
function removeFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1)
            i--
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))//Convert the cart array to a text string so it can be stored in localStorage.
    updateCartCount()
    displayCartItems()
}

// Login function
function login() {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if (username && password) {
        localStorage.setItem('username', username) //tsajjel fl localStorage.ta7t username
        alert('Logged in successfully!')
        document.getElementById('login-section').style.display = 'none'
        displayMotors()
    } else {
        alert('Please enter valid credentials!')
    }
}
if (!localStorage.getItem('username')) {
    document.getElementById('login-section').style.display = 'block'  
} else {
    document.getElementById('login-section').style.display = 'block'  
    displayMotors() 
}
// add motor
function addMotor() {
    var name = prompt("Enter motor name:")   //Afficher une fenêtre contextuelle
    var price = parseFloat(prompt("Enter motor price:")) //parseFloat est utilisé pour convertir le texte saisi par l’utilisateur en une valeur décimale (float),
    var image = prompt("Enter image URL:")

    if (name && price && image) {
        var newMotor = factory(motors.length + 1, name, price, image)
        motors.push(newMotor)
        displayMotors()
    } else {
        alert("Invalid motor details")
    }
}
// delete motor 
function deleteMotor(id) {
    for (let i = 0; i < motors.length; i++) {
        if (motors[i].id === id) {
            motors.splice(i, 1)
            i--
        }
    }
    displayMotors()
    alert("Motor deleted successfully")
}

// Search 
function searchFunction() {
    var query = document.querySelector('input[type="text"]').value.toLowerCase();
    var filteredMotors = [];
    
    for (var i = 0; i < motors.length; i++) {
        if (motors[i].name.toLowerCase().includes(query)) {
            filteredMotors.push(motors[i]);
        }
    }

    var productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    for (var i = 0; i < filteredMotors.length; i++) {
        var motorDiv = document.createElement('div');
        motorDiv.className = 'motor';
        motorDiv.innerHTML = `
            <img src="${arr[i].image}" alt="${arr[i].name}">
            <h3>${arr[i].name}</h3>
            <p>Price: $${arr[i].price}</p>
            <button onclick="addToCart(${arr[i].id})">Add to Cart</button>
        `;
        productsList.appendChild(motorDiv)
    }

    updateCartCount()
}

